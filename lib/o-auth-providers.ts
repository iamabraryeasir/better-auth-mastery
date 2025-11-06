import googleIcon from "@/public/google.svg";
import githubIcon from "@/public/github.svg";

export const SUPPORTED_OAUTH_PROVIDERS = ["google", "github"] as const;

export type SupportedOAuthProviders =
  (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SupportedOAuthProviders,
  { name: string; icon: string }
> = {
  google: { name: "Google", icon: googleIcon },
  github: { name: "GitHub", icon: githubIcon },
};
