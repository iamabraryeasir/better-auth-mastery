"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "./_components/login-tab";
import SignupTab from "./_components/signup-tab";
import { Separator } from "@/components/ui/separator";
import SocialAuthButtons from "./_components/social-auth-buttons";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data !== null) {
        router.push("/");
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        {/* List of Tabs */}
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card>
            <CardHeader className="text-xl font-semibold">
              <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginTab />
            </CardContent>
            <Separator />
            <CardFooter className="grid gap-5">
              <SocialAuthButtons />
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader className="text-xl font-semibold">
              <CardTitle>Let’s Get Started</CardTitle>
            </CardHeader>
            <CardContent>
              <SignupTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
