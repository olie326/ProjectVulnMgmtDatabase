import { useEffect, useState } from "react";
import LoginForm from "./authentication/LoginForm";
import SignUpForm from "./authentication/SignUpForm";
import { ScrollArea } from "./ui/scroll-area";
import { userContext } from "@/App";
import { getUser } from "@/api_calls/APIcalls";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [currentForm, setCurrentForm] = useState("signIn");
  const [authenticated, setAuthenticated] = useState(userContext);

  return (
    <>
      <div className="flex h-svh flex-row">
        <div
          className="m-3 me-0 flex w-7/12 flex-col justify-center rounded-lg bg-stone-300"
          id="Hero"
        >
          <div className="mx-10">
            <h1 className="text-center text-5xl font-bold tracking-tight">
              Vulnerability Management <br /> Web Tool
            </h1>
          </div>
        </div>
        <div className="flex w-5/12 flex-col items-center justify-center">
          <ScrollArea className="h-full w-full">
            <div className="my-3 flex min-h-screen w-full flex-col items-center justify-center">
              {currentForm === "signIn" ? (
                <LoginForm setCurrentForm={setCurrentForm} />
              ) : (
                <SignUpForm setCurrentForm={setCurrentForm} />
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
