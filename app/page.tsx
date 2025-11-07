"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import BetterAuthActionButton from "@/components/auth/better-auth-action-button";

export default function HomePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-center min-h-screen w-full flex items-center justify-center flex-col gap-5">
      {!session ? (
        <>
          <h1 className="text-4xl font-medium">Welcome to Better App</h1>
          <Link href="/auth/login">
            <Button
              variant="default"
              size="lg"
              className="font-semibold text-lg"
            >
              Signup / Login
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-medium">Welcome {session.user.name}</h1>
          <div>
            <BetterAuthActionButton
              variant="destructive"
              successMessage="Signout Successful"
              action={() => authClient.signOut()}
            >
              Signout
            </BetterAuthActionButton>
          </div>
        </>
      )}
    </div>
  );
}
