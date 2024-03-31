import * as Form from "@radix-ui/react-form";

export default function LoginForm() {
  return (
    <>
      <div className="me-3 h-full w-full flex-none">
        <div className="grid h-full w-full grid-rows-12 lg:justify-items-center">
          <div className="row-start-4 row-end-auto w-full lg:max-w-screen-sm">
            <h3 className="mt-10 px-10 text-center text-3xl font-bold">
              Login
            </h3>
            <Form.Root className="mx-7 flex flex-col gap-6 p-10">
              <Form.Field name="Username" className="text-sm">
                <Form.Label className="mb-2">Username</Form.Label>
                <Form.Control
                  asChild
                  className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <input type="text" />
                </Form.Control>
              </Form.Field>

              <Form.Field name="Password" className="text-sm">
                <Form.Label className="">Password</Form.Label>
                <Form.Control
                  asChild
                  className="mt-1 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <input type="text" />
                </Form.Control>
                <div className="flex justify-end">
                  <button className="mt-1 w-fit text-xs text-stone-500">
                    Forgot password?
                  </button>
                </div>
              </Form.Field>
              <Form.Submit asChild>
                <button className="mt-5 rounded-full bg-stone-200 px-5 py-3 font-semibold hover:bg-stone-300 active:bg-stone-400">
                  Login
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
        </div>
      </div>
    </>
  );
}
