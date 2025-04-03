import { EventIndicatorType } from "@/@types/event-indicator-type";

export function HoverBackgroundIndicator({
  eventIndicator,
}: {
  eventIndicator: EventIndicatorType;
}) {
  return (
    <div
      className="absolute rounded-full bg-blue-300/90 transition-all duration-300 ease-in-out"
      style={{
        width: `${eventIndicator.width}px`,
        height: `${eventIndicator.height}px`,
        transform: `translate(${eventIndicator.left}px, ${eventIndicator.top}px)`,
      }}
    />
  );
}
