import "@/assets/styles/components/input-header-container.css";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  eventIndicatorVisible: boolean;
  scrolled: boolean;
}

export function InputHeader({ eventIndicatorVisible, scrolled }: Props) {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleCleanInput = () => {
    setInputValue("");
  };

  const handleSearchOnMap = () => {
    router.push(`/map-city?q=${inputValue}`);
  };

  return (
    <div
      data-value={eventIndicatorVisible}
      data-scroll={scrolled}
      className="input-header-container group max-md:mx-5/100 focus-within:!mx-auto focus-within:!w-full data-[scroll=true]:border-black data-[value=true]:border-black data-[scroll=true]:max-md:mx-4 data-[scroll=true]:max-md:w-9 data-[scroll=true]:max-md:justify-center"
    >
      <button
        type="button"
        className="min-h-3 min-w-3 border-none duration-300 max-md:group-focus-within:h-8 max-md:group-focus-within:w-8 max-md:group-focus-within:text-black"
      >
        <Search className="h-4 w-4 md:group-focus-within:text-white md:group-hover:text-white" />
      </button>
      <input
        type="text"
        placeholder="Encontre um Comerciante"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => setInputValue("")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchOnMap();
          }
        }}
        className="w-full border-none bg-transparent focus:outline-none md:focus:text-white"
      />
      <button
        type="button"
        onClick={() => handleCleanInput()}
        className="hidden h-full border-none duration-300 group-focus-within:block"
      >
        <X className="h-8 w-8 max-md:group-focus-within:text-black md:h-6 md:w-6 md:text-white" />
      </button>
    </div>
  );
}
