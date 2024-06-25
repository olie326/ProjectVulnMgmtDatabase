import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logIn } from "@/api_calls/APIcalls";
import { userAuthenticatedContext } from "@/App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const loginUserSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();

export default function LoginForm({
  setCurrentForm,
}: {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [authenticated, setAuthenticated] = useContext(userAuthenticatedContext);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
  });

  async function onSubmit(values: z.infer<typeof loginUserSchema>) {
    console.log(values);
    const response = await logIn(values);
    if (response.status == 200) {
      setAuthenticated(true);
      navigate("/dashboard");
    }
  }

  return (
    <div className="w-10/12 max-w-sm">
      <Form {...form}>
        <h1 className="scroll-m-20 self-start text-2xl font-semibold tracking-tight">
          Log In
        </h1>
        <p className="text-baseline mb-3 align-baseline leading-7">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="px-0 py-4 text-base text-blue-700"
            onClick={() => setCurrentForm("signUp")}
          >
            Sign up
          </Button>
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>This is your username.</FormDescription>
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
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit self-end">
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
}
