import Link from "next/link";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CopyButton } from "./copy-button";
import React from "react";

export type Rule = {
  libs?: string[];
  content: string;
  title?: string;
  slug: string;
  author: {
    name: string;
    url: string;
    avatar: string;
  };
};

export function RuleCard({ rule, isPage }: { rule: Rule; isPage?: boolean }) {
  return (
    <Card className="flex aspect-square max-h-[calc(100vh-8rem)] flex-col bg-background p-4">
      <CardContent
        className={cn(
          "group relative mb-2 grow overflow-hidden bg-card p-4 font-mono text-sm opacity-50 transition-opacity hover:opacity-100",
          isPage && "opacity-100",
        )}
      >
        <CopyButton content={rule.content} />
        <Link href={`/cursor/${rule.slug}`} className="h-full">
          <ScrollArea className="h-full">
            <pre className="whitespace-pre-wrap break-words">
              <code className="text-sm">
                {rule.content.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < rule.content.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </code>
            </pre>
          </ScrollArea>
        </Link>
      </CardContent>

      <CardHeader className="mt-auto space-y-1 p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">{rule.author.name}</CardTitle>
          <Avatar className="size-6">
            <a href={rule.author.url} target="_blank" rel="noopener noreferrer">
              <AvatarImage src={rule.author.avatar} alt={rule.author.name} />
            </a>
          </Avatar>
        </div>

        <div className="flex h-5 gap-2 overflow-x-auto whitespace-nowrap">
          {rule?.libs?.slice(0, 2).map((lib) => (
            <span
              key={lib}
              className="shrink-0 font-mono text-xs text-[#878787]"
            >
              {lib}
            </span>
          ))}
          {rule?.libs && rule.libs.length > 2 && (
            <span className="shrink-0 font-mono text-xs text-[#878787]">
              +{rule.libs.length - 2} more
            </span>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
