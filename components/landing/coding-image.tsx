import Image from "next/image"

export function CodingImage() {
  return (
    <section className="relative w-full bg-[#050505] overflow-hidden">
      <div className="relative w-full h-[480px]">
        <Image
          src="/images/coding.jpg"
          alt="Développement web"
          width={1920}
          height={1280}
          priority
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      </div>
    </section>
  )
}
