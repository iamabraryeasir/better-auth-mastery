"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const signinSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SigninFormType = z.infer<typeof signinSchema>;

export default function SigninTab() {
  const router = useRouter();

  const form = useForm<SigninFormType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSignin = async (data: SigninFormType) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    await authClient.signIn.email(
      {
        ...data,
        rememberMe: true,
        callbackURL: "/",
      },
      {
        onError: (e) => {
          toast.error(e.error.message);
        },
        onSuccess: () => {
          toast.success("User signin successful");
          router.push("/");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignin)}>
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="example@gmail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password  */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Super Secret Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} placeholder="**********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-3" disabled={isSubmitting}>
          <LoadingSwap isLoading={isSubmitting}>Signin</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
