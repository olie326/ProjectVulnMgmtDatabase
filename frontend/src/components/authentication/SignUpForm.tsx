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
import { signUp } from "@/api_calls/APIcalls";

export const newUserSchema = z
  .object({
    username: z.string().refine((val) => val.length > 4, {
      message: "Username must be longer than 4 characters",
    }),
    password1: z.string().min(8),
    password2: z.string().min(8),
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
  })
  .required()
  .refine(
    (data) => {
      return data.password1 === data.password2;
    },
    { message: "Passwords doesn't match", path: ["password2"] }
  );

export default function SignUpForm({
  setCurrentForm,
}: {
  setCurrentForm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      password1: "",
      password2: "",
      email: "",
      first_name: "",
      last_name: "",
    },
  });

  function onSubmit(values: z.infer<typeof newUserSchema>) {
    console.log(values);
    signUp(values).then((response) => {
      console.log(response);
      console.log("created acocunt successfully!");
    });
  }

  return (
    <div className=" w-10/12 max-w-sm">
      <Form {...form}>
        <h1 className="scroll-m-20 self-start text-2xl font-semibold tracking-tight">
          Sign Up
        </h1>
        <p className="text-baseline mb-3 align-baseline leading-7">
          Already have an account?{" "}
          <Button
            variant="link"
            className="px-0 py-4 text-base text-blue-700"
            onClick={() => setCurrentForm("signIn")}
          >
            Log In
          </Button>
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col space-y-4"
        >
          <div className="inline-flex justify-between gap-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jon" {...field} />
                  </FormControl>
                  <FormDescription>First</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription>Last</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="create a clever username" {...field} />
                </FormControl>
                <FormDescription>This is your username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password1"
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
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-fit self-end">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
