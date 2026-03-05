export function Logo({ className }: { className?: string }) {
  return (
    <>
      <img
        src="/images/Zequent_logo_black.svg"
        alt="Zequent"
        className={`${className ?? ''} dark:hidden`}
      />
      <img
        src="/images/Zequent_logo_white.svg"
        alt="Zequent"
        className={`${className ?? ''} hidden dark:block`}
      />
    </>
  )
}
