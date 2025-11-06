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

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupFormType = z.infer<typeof signupSchema>;

export default function SignupTab() {
  const router = useRouter();

  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSignup = async (data: SignupFormType) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    await authClient.signUp.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onError: (e) => {
          toast.error(e.error.message);
        },
        onSuccess: () => {
          toast.success("User signup successful");
          router.push("/");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignup)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <Button type="submit" className="w-full mt-1" disabled={isSubmitting}>
          <LoadingSwap isLoading={isSubmitting}>Signup</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
}
