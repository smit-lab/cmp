"use client";

import React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { changeProjectStatus } from "@/lib/action";
import { Status } from "@/lib/definitions";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

const SetStatus = ({
  currentStatus,
  _id,
  client,
  amount,
}: {
  currentStatus: Status;
  _id: string;
  client?: {
    fullname: { firstname: string; lastname?: string | undefined };
    email: string;
  };
  amount: number;
}) => {
  const labels: Status[] = ["draft", "in-progress", "complete"];
  const [label, setLabel] = React.useState<Status>(currentStatus);
  const [open, setOpen] = React.useState(false);
  console.log(label);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <MoreVertical className="h-3.5 w-3.5" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Set Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Command>
              <CommandInput
                placeholder="Filter label..."
                autoFocus={true}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No label found.</CommandEmpty>
                <CommandGroup>
                  {labels.map((label) => (
                    <CommandItem
                      // disabled={currentStatus === "complete"}
                      className="capitalize"
                      key={label}
                      value={label}
                      onSelect={async (value) => {
                        setLabel(value as Status);
                        setOpen(false);
                        await changeProjectStatus(
                          value as Status,
                          _id,
                          amount,
                          client?.fullname,
                          client?.email
                        );
                      }}
                    >
                      {label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Trash</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SetStatus;
