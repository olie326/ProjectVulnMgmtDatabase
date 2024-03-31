import LoginForm from "./LoginForm";

export default function Hero() {
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
        <div className="w-5/12">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
