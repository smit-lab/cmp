"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FileStack, Home, PanelLeft, Settings, Users2 } from "lucide-react";

import AccountDropdownAction from "./account-dropdown-action";
import { ThemeToggle } from "./theme-toggle";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Clients", href: "/clients", icon: Users2 },
  { name: "Projects", href: "/projects", icon: FileStack },
  { name: "Settings", href: "/settings", icon: Settings },
];

const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="z-50">
      {/*Desktop, tablet nav*/}
      <aside className="fixed inset-y-0 left-0 border-r py-6 px-3 bg-background hidden md:flex">
        <nav className="flex flex-col items-center justify-between">
          <div className="flex flex-col gap-4 items-center">
            <TooltipProvider>
              {links.map((link, index) => {
                const LinkIcon = link.icon;
                return (
                  <Tooltip delayDuration={0} key={index}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:text-foreground ${
                          pathname.includes(link.href)
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        <LinkIcon className="h-5 w-5" />
                        <span className="sr-only">{link.name}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{link.name}</TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
          <ThemeToggle />
        </nav>
      </aside>
      {/* Mobile nav */}
      <header className="sticky flex top-0 z-30 p-5 items-center justify-between border-b h-15 bg-background sm:static sm:h-auto sm:px-6 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <PanelLeft className="w-5 h-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="pt-16">
            <nav className="h-full flex flex-col justify-between text-lg font-medium">
              <ul className="grid gap-6">
                {links.map((link, index) => {
                  const LinkIcon = link.icon;
                  return (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-4 hover:text-foreground ${
                          pathname === link.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        <LinkIcon className="h-5 w-5" />
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
        <AccountDropdownAction />
      </header>
    </div>
  );
};

export default MainNav;
