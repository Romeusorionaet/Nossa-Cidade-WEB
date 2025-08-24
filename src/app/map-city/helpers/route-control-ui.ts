import { useEffect, useState } from "react";

export const routeControlUI = (pointRoute: number[]) => {
  const [togglePointType, setTogglePointType] = useState("start");
  const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
  const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);

  const handleChangeArea = (value: string) => {
    if (value === "start") {
      setTogglePointType("start");
    } else {
      setTogglePointType("end");
    }
  };

  useEffect(() => {
    if (togglePointType === "start") {
      setStartPoint([pointRoute[0], pointRoute[1]]);
    } else {
      setEndPoint([pointRoute[0], pointRoute[1]]);
    }
  }, [pointRoute]);

  return {
    togglePointType,
    setTogglePointType,
    startPoint,
    setStartPoint,
    endPoint,
    setEndPoint,
    handleChangeArea,
  };
};
