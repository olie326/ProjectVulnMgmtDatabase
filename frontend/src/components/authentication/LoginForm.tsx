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

export const userSchema = z.object({
  username: z.string().email(),
  password: z.string(),
});

export default function LoginForm({
  setCurrentForm,
}: {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof userSchema>) {
    console.log(values);
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
          />{" "}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
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
