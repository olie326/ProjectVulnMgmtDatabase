import { useState } from "react";
import LoginForm from "./authentication/LoginForm";
import SignUpForm from "./authentication/SignUpForm";

export default function Hero() {
  const [currentForm, setCurrentForm] = useState("signIn");

  return (
    <>
      <div className="flex h-svh flex-row">
        <div
          className="m-3 flex w-7/12 flex-col justify-center rounded-lg bg-stone-300"
          id="Hero"
        >
          <div className="mx-10">
            <h1 className="text-center text-5xl font-bold tracking-tight">
              Vulnerability Management <br /> Web Tool
            </h1>
          </div>
        </div>
        <div className="flex w-5/12 flex-col items-center justify-center">
          {currentForm === "signIn" ? (
            <LoginForm setCurrentForm={setCurrentForm} />
          ) : (
            <SignUpForm setCurrentForm={setCurrentForm} />
          )}
        </div>
      </div>
    </>
  );
}
