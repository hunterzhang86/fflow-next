"use client";

import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import { useSignInModal } from "@/components/modals//sign-in-modal";
import { get } from "http";

export const ModalContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowSignInModal: () => {},
});

export default function ModalProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const t = useTranslations("SignIn");
  return (
    <ModalContext.Provider
      value={{
        setShowSignInModal,
      }}
    >
      <SignInModal />
      {children}
    </ModalContext.Provider>
  );
}
