import react, { forwardRef } from "react";
import { ReactNode } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

//custom styling for all side tabs
const SideTabsContent = forwardRef<
  React.ElementRef<typeof TabsContent>,
  React.ComponentPropsWithoutRef<typeof TabsContent>
>(({ className, children, ...props }, ref) => (
  <TabsContent
    ref={ref}
    className={cn(
      "bg-muted/40 mt-0 flex-1 overflow-hidden object-contain",
      className
    )}
    {...props}
  >
    <Navbar />
    {children}
  </TabsContent>
));

const SideTabsHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 flex justify-between", className)}
    {...props}
  />
));

const SideTabsTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}
    {...props}
  />
));

export { SideTabsContent, SideTabsHeader, SideTabsTitle };
