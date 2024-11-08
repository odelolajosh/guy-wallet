import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { registerCredentialsSchema } from "@/data/auth";
import { useRegister } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      navigate('/create-profile');
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
                <Input autoComplete="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="name" placeholder="Alas you" {...field} />
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
                <PasswordInput autoComplete="current-password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" aria-disabled={registerMutation.status === "pending"} disabled={registerMutation.status === "pending"}>
          {registerMutation.status === "pending" && <Spinner className="w-4 h-4 mr-2 text-primary-foreground" />}
          Sign in with email
        </Button>
      </form>
    </Form>
  )
}