
import { useContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { UserContext } from "@/pages/HomePage";


export default function Navbar() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  return (
    <>
      <div
        className="border-border flex h-16 items-center justify-between border-y bg-white p-4"
        aria-label="Global"
      >
        <div>
        </div>

        <div className="mx-2 flex flex-row items-center justify-end gap-4">
          <p className="text-sm font-normal leading-none">{`${currentUser.first_name} ${currentUser.last_name}`}</p>
          <Avatar className="shadow">
            <AvatarImage />
            <AvatarFallback>OL</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
