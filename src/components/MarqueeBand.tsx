const items = [
  'Deglet Nour Dates',
  'Premium Quality',
  'Since 1985',
  'Tozeur · Tunisia',
  'Certified Export',
  'Natural Products',
  '25+ Countries',
  'Custom Packaging',
];

export default function MarqueeBand() {
  const repeated = [...items, ...items];

  return (
    <div className="bg-[#C9820C] py-3.5 overflow-hidden select-none">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-5 text-[11px] font-bold text-[#2D1206] tracking-[0.25em] uppercase"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-[#2D1206]/35 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
