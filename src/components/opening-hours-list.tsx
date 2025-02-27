type OpeningHoursProps = {
  openingHours: Record<string, { abertura: string; fechamento: string }>;
  orderDays: string[];
  weekDays: Record<string, string>;
};

export function OpeningHoursList({
  openingHours,
  orderDays,
  weekDays,
}: OpeningHoursProps) {
  return (
    <ul className="mt-2">
      {Object.entries(openingHours)
        .sort(([a], [b]) => orderDays.indexOf(a) - orderDays.indexOf(b))
        .map(([day, hours]) => {
          const { abertura, fechamento } = hours;
          return (
            <li
              key={day}
              className="flex justify-between border-b border-black"
            >
              <span className="text-sm font-medium">
                {weekDays[day] || day}:
              </span>
              {abertura ? (
                <span className="text-sm">
                  {abertura} - {fechamento}
                </span>
              ) : (
                <span className="text-sm">Fechado</span>
              )}
            </li>
          );
        })}
    </ul>
  );
}
