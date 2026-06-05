type PrideFlagProps = {
  className?: string;
  /** When provided, the flag is exposed to assistive tech with this label;
      otherwise it is treated as decorative. */
  title?: string;
};

const stripes = [
  { y: 0, fill: "#E40303" },
  { y: 2.5, fill: "#FF8C00" },
  { y: 5, fill: "#FFED00" },
  { y: 7.5, fill: "#008026" },
  { y: 10, fill: "#004DFF" },
  { y: 12.5, fill: "#750787" },
];

// Progress chevron, drawn back (hoist) to front (tip) so the white point sits on top.
const chevrons = [
  { apexX: 1.2, fill: "#000000" },
  { apexX: 3.4, fill: "#613915" },
  { apexX: 5.6, fill: "#74D7EE" },
  { apexX: 7.8, fill: "#FFAFC7" },
  { apexX: 10, fill: "#FFFFFF" },
];

export default function PrideFlag({ className, title }: PrideFlagProps) {
  return (
    <svg
      viewBox="0 0 24 15"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {stripes.map(({ y, fill }) => (
        <rect key={y} x="0" y={y} width="24" height="2.5" fill={fill} />
      ))}
      <g fill="none" strokeWidth="2.2" strokeLinecap="butt">
        {chevrons.map(({ apexX, fill }) => (
          <polyline
            key={fill}
            stroke={fill}
            points={`${apexX - 7.5},0 ${apexX},7.5 ${apexX - 7.5},15`}
          />
        ))}
      </g>
    </svg>
  );
}
