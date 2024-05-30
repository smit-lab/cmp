import React from "react";
import AccountDropdownAction from "./account-dropdown-action";
import { cn } from "@/lib/utils";

type Props = {
  pageTitle: string;
  pageDescription?: string;
  className?: string;
};

const PageHeader = ({ pageTitle, pageDescription, className }: Props) => {
  return (
    <div className={cn("flex justify-between pt-2 mb-6", className)}>
      <div className="grid gap-0.5">
        <h1 className="text-2xl font-semibold">{pageTitle}</h1>
        <p className="text-md text-muted-foreground">{pageDescription}</p>
      </div>
      <AccountDropdownAction />
    </div>
  );
};

export default PageHeader;
