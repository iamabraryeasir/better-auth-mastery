import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center min-h-screen w-full flex items-center justify-center flex-col gap-5">
      <h1 className="text-5xl font-medium">Welcome to Better App</h1>

      <Link href="/auth/login">
        <Button variant="default" size="lg" className="font-semibold text-lg">
          Signup / Login
        </Button>
      </Link>
    </div>
  );
}
