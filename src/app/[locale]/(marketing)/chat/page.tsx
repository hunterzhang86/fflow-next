"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Message as MessageProps, useChat } from "ai/react";

import { INITIAL_QUESTIONS } from "@/lib/const";
import cx from "@/lib/cx";
import Form from "@/components/chat/form";
import Message from "@/components/chat/message";
import MessageLoading from "@/components/chat/message-loading";

export default function Home() {
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
          content: `**Welcome to FFlow Next**

Your ultimate companion in navigating the academic landscape of Stanford.`,
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
    <main className="relative mx-auto flex min-h-svh max-w-screen-md overflow-y-auto p-4 !pb-32 md:p-6 md:!pb-40">
      <div className="w-full">
        {messages.map((message: MessageProps) => {
          return <Message key={message.id} {...message} />;
        })}

        {/* loading */}
        {streaming && <MessageLoading />}

        {/* initial question */}
        {messages.length === 1 && (
          <div className="mt-4 grid gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
            {INITIAL_QUESTIONS.map((message) => {
              return (
                <button
                  key={message.content}
                  type="button"
                  className="cursor-pointer select-none rounded-xl border border-gray-200 bg-white p-3 text-left font-normal hover:border-zinc-400 hover:bg-zinc-50 md:px-4 md:py-3"
                  onClick={() => onClickQuestion(message.content)}
                >
                  {message.content}
                </button>
              );
            })}
          </div>
        )}

        {/* bottom ref */}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={cx(
          "fixed inset-x-0 bottom-0 z-10",
          "flex items-center justify-center",
          "bg-white",
        )}
      >
        <span className="pointer-events-none absolute inset-x-0 bottom-full h-10 bg-gradient-to-b from-white/0 to-white" />

        <div className="w-full max-w-screen-md rounded-xl px-4 py-6 md:px-5">
          <Form
            ref={formRef}
            onSubmit={onSubmit}
            inputProps={{
              disabled: streaming,
              value: input,
              onChange: handleInputChange,
            }}
            buttonProps={{
              disabled: streaming,
            }}
          />
        </div>
      </div>
    </main>
  );
}
