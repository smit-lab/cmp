"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ClientData } from "@/lib/definitions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export const columns: ColumnDef<ClientData>[] = [
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      const client = row.original;
      const firstname = client.name;
      const email = client.email;

      return (
        <div className="grid gap-0.5">
          <Link href={`/clients/${row.original._id}`} className="font-medium">
            {firstname}
          </Link>
          <span className="text-muted-foreground">{email}</span>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const client = row.original.email;
      const email = client.toLowerCase();
      return email.includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className="capitalize">{status ? "Active" : "In-active"}</Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      if (Array.isArray(filterValue) && filterValue.length !== 0) {
        const cellValue = row.getValue(columnId);
        const valueString =
          typeof cellValue === "boolean" ? cellValue.toString() : cellValue;
        return filterValue.includes(valueString);
      } else {
        return true;
      }
    },
  },
  {
    accessorKey: "last_updated",
    header: "Last updated",
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("last_updated"));
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "totalSpend",
    header: "Total Spend",
    cell: ({ row }) => {
      const totalSpend = parseFloat(row.getValue("totalSpend"));
      const formatted = formatCurrency(totalSpend);

      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const clientId = row.original._id.toString();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(clientId)}
            >
              Copy client id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
