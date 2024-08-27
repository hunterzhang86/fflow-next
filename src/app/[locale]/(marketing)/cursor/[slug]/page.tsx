import { rules } from "@/data/cursor";

import { RuleCard } from "@/components/cursor/rule-card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const rule = rules.find((rule) => rule.slug === params.slug);

  return {
    title: `${rule?.title} rule by ${rule?.author.name}`,
    description: rule?.content,
  };
}

export async function generateStaticParams() {
  return rules.map((rule) => ({
    slug: rule.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const rule = rules.find((rule) => rule.slug === params.slug);

  return (
    <>
      <main className="flex-1 p-6 pt-16">
        {rule && <RuleCard rule={rule} isPage={true} />}
      </main>
    </>
  );
}
