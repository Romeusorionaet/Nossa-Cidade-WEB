import Image from "next/image";

export function OurCityLogo() {
  return (
    <div
      style={{
        width: "clamp(2rem, 6vw, 4rem)",
        height: "clamp(2rem, 6vw, 4rem)",
      }}
    >
      <Image
        src="/imgs/logos/our-city-logo.png"
        alt="logo nossa cidade"
        width={500}
        height={500}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
