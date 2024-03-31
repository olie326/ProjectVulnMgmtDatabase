import * as Avatar from "@radix-ui/react-avatar";

export default function NavAvatar() {
  return (
    <div className="flex justify-center items-center gap-4">
      <a className="text-sm" href="">
        Oliver Lee
      </a>
      <Avatar.Root className="inline-flex justify-center items-center h-8 w-8 rounded-full bg-slate-300">
        <Avatar.Image />
        <Avatar.Fallback className="text-xs">OL</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
