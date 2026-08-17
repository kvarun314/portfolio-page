import { Reveal } from "@/components/animations/Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        <p className="font-mono text-xs tracking-[0.25em] text-accent mb-3">
          <span className="text-fg-dim mr-3">{index}</span>
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-fg-mid leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
