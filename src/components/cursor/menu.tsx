"use client";

import { useRouter } from "next/navigation";
import { getSections } from "@/data/cursor";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const sections = getSections();

export function Menu() {
  const router = useRouter();
  const handleClick = (tag: string) => {
    router.push("/cursor", { scroll: false });

    const element = document.getElementById(tag);
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <ScrollArea
      className="h-full flex-grow pr-3"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="space-y-1">
        {sections.map((section) => (
          <Button
            onClick={() => handleClick(section.tag)}
            key={section.tag}
            variant="ghost"
            className="w-full justify-start"
          >
            {section.tag}
            <span className="ml-auto text-[#878787]">
              {section.rules.length}
            </span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
