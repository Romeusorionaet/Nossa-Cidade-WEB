"use client";

import { ListItemsForBusinessPointDetailsType } from "@/@types/list-items-for-business-point-details-type";
import { getSharedItemsAssociatedBusinessPoint } from "@/actions/get/business-point/get-business-point-details";
import { getListItemsForBusinessPointDetails } from "@/actions/get/business-point/get-list-items-for-business-point-details";
import { UserContext } from "@/contexts/user.context";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { filterAssociateItems } from "../helpers/filter-associate-items";
import { CheckboxListAssociateItems } from "./checkbox-list-associate-items";
import { categories } from "@/constants/list-of-association-items";
import { updateBusinessPointDetails } from "@/actions/put/business-point/register-business-point-details";
import { useRouter } from "next/navigation";

interface Props {
  businessPointId: string;
}

export function PickListDetails({ businessPointId }: Props) {
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
    {},
  );
  const [removedItems, setRemovedItems] = useState<Record<string, string[]>>(
    {},
  );
  const { profile } = useContext(UserContext);

  const router = useRouter();

  const {
    data: listItems,
    isLoading,
    error,
  } = useQuery<ListItemsForBusinessPointDetailsType>({
    queryKey: ["listItemsForBusinessPointDetails"],
    queryFn: () => getListItemsForBusinessPointDetails(),
    staleTime: 1000 * 60 * 60,
    enabled: !!profile.publicId,
  });

  const {
    data: listItemsAssociated,
    isLoading: isLoadingAssociatedData,
    error: errAssociatedData,
  } = useQuery<ListItemsForBusinessPointDetailsType>({
    queryKey: ["sharedItemsAssociatedBusinessPoint"],
    queryFn: () => getSharedItemsAssociatedBusinessPoint(businessPointId),
    staleTime: 1000 * 60 * 60,
    enabled: !!profile.publicId,
  });

  if (!profile.publicId) return <p>Faça login</p>;
  if (isLoading || isLoadingAssociatedData) return <p>Carregando...</p>;
  if (error || errAssociatedData || !listItems || !listItemsAssociated)
    return <p>Erro ao carregar os dados.</p>;

  const handleSelectItem = (
    category: string,
    itemId: string,
    isChecked: boolean,
  ) => {
    setSelectedItems((prevSelected) => {
      const prevCategoryItems = prevSelected[category] || [];
      const updatedSelectedItems = isChecked
        ? [...prevCategoryItems, itemId]
        : prevCategoryItems.filter((id) => id !== itemId);

      return {
        ...prevSelected,
        [category]: updatedSelectedItems,
      };
    });

    setRemovedItems((prevRemoved) => {
      const prevRemovedItems = prevRemoved[category] || [];

      if (isChecked) {
        return {
          ...prevRemoved,
          [category]: prevRemovedItems.filter((id) => id !== itemId),
        };
      }

      if (!prevRemovedItems.includes(itemId)) {
        return {
          ...prevRemoved,
          [category]: [...prevRemovedItems, itemId],
        };
      }

      return prevRemoved;
    });
  };

  const handleSaveDetails = async () => {
    const filteredSelectedItems = filterAssociateItems(
      selectedItems,
      listItemsAssociated,
      (itemId, associatedItems) =>
        !associatedItems.some((associatedItem) => associatedItem.id === itemId),
    );

    const filteredRemovedItems = filterAssociateItems(
      removedItems,
      listItemsAssociated,
      (itemId, associatedItems) =>
        associatedItems.some((associatedItem) => associatedItem.id === itemId),
    );

    if (filteredRemovedItems && filteredSelectedItems) {
      alert("Nada a ser alterado.");
      router.push("/my-business-points");
      return;
    }

    const { messageError, messageSuccess } = await updateBusinessPointDetails({
      removedListItems: filteredRemovedItems,
      newListItems: filteredSelectedItems,
      businessPointId,
    });

    if (messageSuccess) {
      alert(messageSuccess);
      router.push("/my-business-points");
    }
    if (messageError) {
      alert(messageError);
      router.push("/my-business-points");
    }
  };

  return (
    <section className="border border-black p-1">
      {categories.map(({ key, title }) => (
        <CheckboxListAssociateItems
          key={key}
          title={title}
          items={listItems[key] || []}
          selectedItems={listItemsAssociated[key] || []}
          category={key}
          onSelect={handleSelectItem}
        />
      ))}

      <button type="button" onClick={() => handleSaveDetails()}>
        Adicionar
      </button>
    </section>
  );
}
