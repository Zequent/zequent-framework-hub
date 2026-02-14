import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/zequent_technologies_logo.jpeg"
      alt="Zequent"
      width={120}
      height={24}
      className={className}
      style={{ objectFit: 'contain' }}
      priority
    />
  )
}
