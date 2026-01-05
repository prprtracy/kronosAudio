// components/section/Section.tsx
import clsx from "clsx";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={clsx(
        // Section Gap（大节奏）
        "py-16 md:py-24 lg:py-28",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {children}
      </div>
    </section>
  );
}
