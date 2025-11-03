import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTab from "./_components/login-tab";
import SignupTab from "./_components/signup-tab";

export default function LoginPage() {
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
