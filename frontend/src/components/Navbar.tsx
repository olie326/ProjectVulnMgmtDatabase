import NavAvatar from "./Avatar";
import SelectData from "./SelectData";

export default function Navbar() {
  return (
    <>
      <nav
        className="flex h-16 items-center justify-between bg-stone-50 p-4"
        aria-label="Global"
      >
        <SelectData />
        <div className="flex items-center justify-center gap-3"></div>
        <div className="mx-2 flex flex-1 justify-end">
          <NavAvatar />
        </div>
      </nav>
    </>
  );
}
