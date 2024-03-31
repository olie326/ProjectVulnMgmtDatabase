import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  HomeIcon,
  GearIcon,
  BarChartIcon,
  FileTextIcon,
  NotionLogoIcon,
} from "@radix-ui/react-icons";

export default function SideNav() {
  return (
    <div className="hidden h-full lg:block">
      <div className="flex h-full w-64 flex-none flex-col justify-between border-e border-stone-100">
        <NavigationMenu.Root className="px-3 py-5">
          <div className="mb-6 mt-1 flex items-center justify-start gap-3 px-3 text-stone-900">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Internal Tool</span>
              <NotionLogoIcon height={30} width={30} />
            </a>
            <h2 className="text-2xl font-bold ">Internal Tool</h2>
          </div>
          <NavigationMenu.List className="text-greenwhite-300 flex flex-col gap-1 text-sm text-stone-600">
            <NavigationMenu.Item className="">
              <NavigationMenu.Trigger className="flex w-full items-center justify-start gap-5 rounded-xl px-3 py-2 hover:bg-stone-100 hover:text-stone-900">
                <HomeIcon width={15} height={15} viewBox="0 -0.5 15 15" />
                Home
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="">
              <NavigationMenu.Trigger className="flex w-full items-center justify-start gap-5 rounded-xl px-3 py-2 hover:bg-stone-100 hover:text-stone-900">
                <GearIcon width={15} height={15} />
                Settings
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="">
              <NavigationMenu.Trigger className="flex w-full items-center justify-start gap-5 rounded-xl px-3 py-2 hover:bg-stone-100 hover:text-stone-900">
                <BarChartIcon width={15} height={15} />
                Graphs
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link />
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item className="">
              <NavigationMenu.Trigger className="flex w-full items-center justify-start gap-5 rounded-xl px-3 py-2 hover:bg-stone-100 hover:text-stone-900">
                <FileTextIcon width={15} height={15} />
                Reports
              </NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Link />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
        <button className="bg-seagreen-600 m-3 rounded-xl p-3">
          Upload/Update Data
        </button>
      </div>
    </div>
  );
}
