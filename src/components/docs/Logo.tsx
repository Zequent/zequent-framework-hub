import Image from 'next/image'

export function Logo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/images/Zequent_Typografie_black.svg"
        alt="Zequent"
        width={120}
        height={36}
        className={`${className ?? ''} dark:hidden`}
        style={{ objectFit: 'contain' }}
        priority
      />
      <Image
        src="/images/Zequent_Typografie_white.svg"
        alt="Zequent"
        width={120}
        height={36}
        className={`${className ?? ''} hidden dark:block`}
        style={{ objectFit: 'contain' }}
        priority
      />
    </>
  )
}
