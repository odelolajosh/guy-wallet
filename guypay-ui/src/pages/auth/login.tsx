import { Center } from "@/components/layout/center";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <Center>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="space-y">
          <h1 className="text-3xl font-semibold tracking-tighter">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your vault.
          </p>
        </div>
        <div className="grid gap-6">
          <Button variant="outline" className="w-full">Sign in with Google</Button>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground"></div>
            </div>
            <div className="relative flex justify-center text-muted-foreground bg-background px-4 uppercase text-sm">
              or
            </div>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm">
            New to us? {" "}
            <Link className="underline underline-offset-4 hover:text-primary" to="/create-account">Sign up</Link>.
          </p>
        </div>
      </div>
    </Center>
  );
};
