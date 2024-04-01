import NavAvatar from "./Avatar";
import SelectData from "./SelectData";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function Navbar() {
  return (
    <>
      <div
        className="flex h-16 items-baseline justify-between bg-stone-50 p-4"
        aria-label="Global"
      >
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
          Database
        </h1>
        <div className="mx-2 flex flex-row items-baseline justify-end gap-2">
          <p>Oliver Lee</p>
          <Avatar>
            <AvatarImage />
            <AvatarFallback>OL</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
