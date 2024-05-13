import { getUser, updateUser } from "@/api_calls/APIcalls";
import { userSchema } from "@/components/authentication/SignUpForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

type userData = {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export const editUserSchema = z.object({
  username: z.string().refine((val) => val.length > 4, {
    message: "Username must be longer than 4 characters",
  }),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
});

export default function profile() {
  const [userData, setUserData] = useState<userData>({
    pk: -1,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [dataChanged, setDataChanged] = useState(true);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
    },
  });

  useEffect(() => {
    getUser().then((response) => {
      console.log(response.data);
      setUserData({
        ...response.data,
      });
      form.reset({
        username: response.data.username,
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      });
    });
  }, [form]);

  function updateUserProps(values: z.infer<typeof editUserSchema>) {
    console.log(values);
    updateUser(values).then((response) => {
      console.log(response);
      setDataChanged(false);
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateUserProps)}
        className="flex w-full flex-col space-y-4"
      >
        <div className="inline-flex gap-2">
          <FormField
            control={form.control}
            {...form.register("first_name", {
              onChange: () => setDataChanged(true),
            })}
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
            {...form.register("last_name", {
              onChange: () => setDataChanged(true),
            })}
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
          {...form.register("username", {
            onChange: () => setDataChanged(true),
          })}
          render={({ field }) => (
            <FormItem className="max-w-xl">
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
          name="email"
          render={({ field }) => (
            <FormItem className="max-w-xl">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} readOnly />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          {!dataChanged && (
            <small className="inline-flex items-center text-green-400">
              profile updated
              <CheckIcon className="ml-2" />{" "}
            </small>
          )}
          <Button type="submit" className="w-fit self-end">
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
