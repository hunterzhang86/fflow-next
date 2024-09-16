"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Message as MessageProps, useChat } from "ai/react";
import { useTranslations } from "next-intl";

import Form from "@/components/chat/form";
import Message from "@/components/chat/message";
import MessageLoading from "@/components/chat/message-loading";
import { DashboardHeader } from "@/components/dashboard/header";

const INITIAL_QUESTIONS = [
  {
    content: "initialQuestions1",
  },
  {
    content: "initialQuestions2",
  },
  {
    content: "initialQuestions3",
  },
  {
    content: "initialQuestions4",
  },
];

export default function ChatPageClient({ locale }: { locale: string }) {
  const t = useTranslations("Chat");
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [streaming, setStreaming] = useState<boolean>(false);

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "0",
          role: "system",
          content: t("welcomeMessage"),
        },
      ],
      onResponse: () => {
        setStreaming(false);
      },
    });

  const onClickQuestion = (value: string) => {
    setInput(value);
    setTimeout(() => {
      formRef.current?.dispatchEvent(
        new Event("submit", {
          cancelable: true,
          bubbles: true,
        }),
      );
    }, 1);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e);
      setStreaming(true);
    },
    [handleSubmit],
  );

  return (
    <>
      <DashboardHeader heading={t("chatBot")} text={t("chatWithAI")} />
      <main className="w-auto place-content-center items-center justify-center">
        <div className="w-full">
          {messages.map((message: MessageProps) => {
            return <Message key={message.id} {...message} />;
          })}

          {streaming && <MessageLoading />}
          {messages.length > 1 && <div className="mb-20 mt-auto w-full" />}

          {messages.length === 1 && (
            <div className="mt-4 grid gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
              {INITIAL_QUESTIONS.map((message) => (
                <button
                  key={message.content}
                  type="button"
                  className="cursor-pointer select-none rounded-xl border border-gray-200 bg-white p-3 text-left font-normal hover:border-zinc-400 hover:bg-zinc-50 dark:bg-emerald-950 md:px-4 md:py-3"
                  onClick={() => onClickQuestion(t(message.content))}
                >
                  {t(message.content)}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-0 left-0 w-full md:inset-x-auto md:max-w-[calc(100%-520px)]">
          <div className="rounded-xl p-4 md:px-1">
            <Form
              ref={formRef}
              onSubmit={onSubmit}
              inputProps={{
                disabled: streaming,
                value: input,
                onChange: handleInputChange,
                placeholder: t("inputPlaceholder"),
              }}
              buttonProps={{
                disabled: streaming,
                children: t("sendButton"),
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
