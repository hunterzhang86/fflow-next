import { getSections } from "@/data/cursor";
import { RuleCard } from "@/components/cursor/rule-card";

const sections = getSections();

export default function Page() {
  return (
    <main className="p-6">
      {sections.map((section, idx) => (
        <section key={section.tag} id={section.tag}>
          <h3 className="mb-4 text-lg font-semibold">{section.tag}</h3>
          <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {section.rules.map((rule, idx2) => (
              <RuleCard key={`${idx}-${idx2.toString()}`} rule={rule} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
