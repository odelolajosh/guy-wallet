import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { loginCredentialsSchema } from "@/data/auth";
import { useLogin } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate('/');
    } catch (error) {
      form.setError('email', { message: (error as AxiosError).message });
    }
  });

  return (
    <Form {...form}>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" aria-disabled={loginMutation.status === "pending"} disabled={loginMutation.status === "pending"}>
          {loginMutation.status === "pending" && <Spinner className="w-4 h-4 mr-2 text-primary-foreground" />}
          Sign in with email
        </Button>
      </form>
    </Form>
  )
}