import { Center } from "@/components/layout/center";
import { RegisterForm } from "@/components/register-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <Center>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="space-y">
          <h1 className="text-3xl font-semibold tracking-tighter">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Your cue to a secured financial life.
          </p>
        </div>
        <div className="grid gap-6">
          <Button variant="outline" className="w-full">Sign up with Google</Button>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground"></div>
            </div>
            <div className="relative flex justify-center text-muted-foreground bg-background px-4 uppercase text-sm">
              or
            </div>
          </div>
          <RegisterForm />
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our {" "}
          <a className="underline underline-offset-4 hover:text-primary" href="/terms">Terms of Service</a> and {" "}
          <a className="underline underline-offset-4 hover:text-primary" href="/privacy">Privacy Policy</a>.
        </p> */}
          <p className="px-8 text-center text-sm">
            Already have an account? {" "}
            <Link className="underline underline-offset-4 hover:text-primary" to="/login">Login</Link>.
          </p>
        </div>
      </div>
    </Center>
  );
};

