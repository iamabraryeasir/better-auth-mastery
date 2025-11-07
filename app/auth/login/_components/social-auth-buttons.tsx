"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
} from "@/lib/o-auth-providers";
import { authClient } from "@/lib/auth-client";
import BetterAuthActionButton from "@/components/auth/better-auth-action-button";

export default function SocialAuthButtons() {
  return (
    <>
      {SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
        const { icon, name } = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider];

        return (
          <BetterAuthActionButton
            key={provider}
            variant="outline"
            className="w-full flex items-center justify-center"
            action={() => {
              return authClient.signIn.social({ provider, callbackURL: "/" });
            }}
          >
            <Image
              src={icon}
              alt={`${name} Icon`}
              width={16}
              height={16}
              className="mr-2"
            />
            {name}
          </BetterAuthActionButton>
        );
      })}
    </>
  );
}
