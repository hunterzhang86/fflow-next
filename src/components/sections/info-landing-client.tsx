"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { InfoLdg } from "@/types";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface InfoLandingClientProps {
  data: InfoLdg[];
}

export default function InfoLandingClient({ data }: InfoLandingClientProps) {
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const rsp = await fetch("/api/user/count");
        const rspJson = await rsp.json();
        console.log(data);
        setUserCount(rsp ? parseInt(rspJson.data) : 0);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    }

    fetchUserCount();
  });

  return (
    <>
      {data.map((info, index) => (
        <div key={index} className="py-10 sm:py-20">
          <MaxWidthWrapper className="grid gap-10 px-2.5 lg:grid-cols-2 lg:items-center lg:px-7">
            <div className={cn(index % 2 !== 0 ? "lg:order-2" : "lg:order-1")}>
              <h2 className="font-heading text-2xl text-foreground md:text-4xl lg:text-[40px]">
                {info.title}
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                {info.description}
              </p>
              <dl className="mt-6 space-y-4 leading-7">
                {info.list.map((item, itemIndex) => {
                  const Icon = Icons[item.icon || "arrowRight"];
                  return (
                    <div className="relative pl-8" key={itemIndex}>
                      <dt className="font-semibold">
                        <Icon className="absolute left-0 top-1 size-5 stroke-purple-700" />
                        <span>{item.title}</span>
                      </dt>
                      <dd className="text-sm text-muted-foreground">
                        {item.description}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
            <div
              className={cn(
                "overflow-hidden rounded-xl border lg:-m-4",
                index % 2 !== 0 ? "order-1" : "order-2",
              )}
            >
              <div className="aspect-video">
                <Image
                  className="size-full object-cover object-center"
                  src={info.image}
                  alt={info.title}
                  width={1000}
                  height={500}
                  priority={true}
                />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      ))}
    </>
  );
}
