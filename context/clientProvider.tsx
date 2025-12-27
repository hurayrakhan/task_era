"use client"; 

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export function ClientProvider({ children, session }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
