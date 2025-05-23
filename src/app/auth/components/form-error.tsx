interface Props {
  errors?: string;
}

export function FormError({ errors }: Props) {
  return (
    <div className="h-1">
      {errors && <p className="text-xs text-red-700">{errors}</p>}
    </div>
  );
}
