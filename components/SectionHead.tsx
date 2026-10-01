export default function SectionHead({
  id,
  title,
}: {
  id: string;
  title: React.ReactNode;
}) {
  return (
    <header className="sec-head reveal">
      <h2 id={`${id}-heading`}>{title}</h2>
    </header>
  );
}
