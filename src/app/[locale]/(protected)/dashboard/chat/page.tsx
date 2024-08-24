"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Message as MessageProps, useChat } from "ai/react";

import { INITIAL_QUESTIONS } from "@/lib/const";
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
          content: `**Welcome to FFlow Next**`,
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
      <main className="w-auto place-content-center items-center justify-center">
        <div className="w-full">
          {messages.map((message: MessageProps) => {
            return <Message key={message.id} {...message} />;
          })}

          {/* loading */}
          {streaming && <MessageLoading />}
          {messages.length > 1 && <div className="mb-20 mt-auto w-full" />}

          {/* initial question */}
          {messages.length === 1 && (
            <div className="mt-4 grid gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
              {INITIAL_QUESTIONS.map((message) => {
                return (
                  <button
                    key={message.content}
                    type="button"
                    className="cursor-pointer select-none rounded-xl border border-gray-200 bg-white p-3 text-left font-normal hover:border-zinc-400 hover:bg-zinc-50 dark:bg-emerald-950 md:px-4 md:py-3"
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

        <div className="w-full">
          <div className="fixed bottom-0 left-1/2 w-full max-w-screen-md -translate-x-1/2 place-content-center items-center justify-center rounded-xl p-6 md:px-5">
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
    </>
  );
}
