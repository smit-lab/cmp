"use client";

import { CirclePlus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Table } from "@tanstack/react-table";

const client_status = [
  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "In-active",
  },
];
const project_status = [
  {
    value: "draft",
    label: "Draft",
  },
  {
    value: "in-progress",
    label: "In-progress",
  },
  { value: "complete", label: "Complete" },
];

export default function StatusFilter({
  table,
  pageType,
}: {
  table: Table<any>;
  pageType: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<string[]>([]);

  const handleSelect = (currentValue: string) => {
    const newValue = values.includes(currentValue)
      ? values.filter((value) => value !== currentValue)
      : [...values, currentValue];
    setValues(newValue);
    table.getColumn("status")?.setFilterValue(newValue);
  };
  const statusOptions =
    pageType === "projectsPage" ? project_status : client_status;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between gap-2 border-dashed text-xs h-8"
        >
          <CirclePlus className="h-4 w-4 shrink-0" />
          Status
          {values.length !== 0 && (
            <div className="h-full w-full flex gap-2">
              <Separator orientation="vertical" />
              {values.map((value) => (
                <Badge
                  variant={"secondary"}
                  className="font-medium capitalize"
                  key={value}
                >
                  {statusOptions === client_status
                    ? value === "true"
                      ? "Active"
                      : "In-active"
                    : value}
                </Badge>
              ))}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full h-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Status" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {statusOptions.map((status) => (
                <CommandItem key={status.value} value={status.value}>
                  <Checkbox
                    checked={values.includes(status.value)}
                    className="mr-2"
                    onCheckedChange={() => {
                      handleSelect(status.value);
                    }}
                  />
                  {status.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
