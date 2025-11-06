import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, {
  BotOptions,
  detectBot,
  EmailOptions,
  protectSignup,
  shield,
  slidingWindow,
  SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { findIp } from "@arcjet/ip";

const authHandlers = toNextJsHandler(auth);

// configuring arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ["userIdOrIp"],
  rules: [shield({ mode: "LIVE" })],
});

// arcjet security settings
const botSettings = { mode: "LIVE", allow: [] } satisfies BotOptions;
const restrictiveRateLimitSettings = {
  mode: "LIVE",
  max: 10,
  interval: "10m",
} as SlidingWindowRateLimitOptions<[]>;
const laxRateLimitSettings = {
  mode: "LIVE",
  max: 60,
  interval: "1m",
} as SlidingWindowRateLimitOptions<[]>;
const emailSettings = {
  mode: "LIVE",
  block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

// exporting `GET` as it is because we won't be checking get requests
export const { GET } = authHandlers;

// overriding the `POST` for adding arcjet checks
export async function POST(request: Request) {
  const clonedRequest = request.clone(); // for resolving package conflicts
  const decision = await checkArcjet(request); // checking the arcjet security rules

  // checking if the request is denied by arcjet
  if (decision.isDenied()) {
    // if the deny is because of `RateLimit`
    if (decision.reason.isRateLimit()) {
      return new Response(null, { status: 429 });
    }

    // if the deny is because of `InvalidEmail`
    else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Invalid email formate";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email not allowed";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain is not valid";
      } else {
        message = "Invalid email address";
      }

      return Response.json({ message }, { status: 400 });
    }

    // for all other denies like `bot`, `hacking attacks`, etc.
    else {
      return new Response(null, { status: 403 });
    }
  }

  return authHandlers.POST(clonedRequest); // default response
}

// arcjet rules checker
async function checkArcjet(request: Request) {
  const body = (await request.json()) as unknown;
  const session = await auth.api.getSession({ headers: request.headers });

  // try rate limiting based on user id if not found the ip .
  // "127.0.0.1" for development
  const userIdOrIp = (session?.user.id ?? findIp(request)) || "127.0.0.1";

  // checking for signup specific rules
  if (request.url.endsWith("/auth/sign-up")) {
    if (
      body &&
      typeof body === "object" &&
      "email" in body &&
      typeof body.email === "string"
    ) {
      return aj
        .withRule(
          protectSignup({
            email: emailSettings,
            bots: botSettings,
            rateLimit: restrictiveRateLimitSettings,
          })
        )
        .protect(request, { email: body.email, userIdOrIp });
    } else {
      return aj
        .withRule(detectBot(botSettings))
        .withRule(slidingWindow(restrictiveRateLimitSettings))
        .protect(request, { userIdOrIp });
    }
  }

  // default check result
  return aj
    .withRule(detectBot(botSettings))
    .withRule(slidingWindow(laxRateLimitSettings))
    .protect(request, { userIdOrIp });
}
