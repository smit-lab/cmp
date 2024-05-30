"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal } from "lucide-react";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import { ProjectsData, clientPageColumn } from "@/lib/definitions";
import Link from "next/link";

export const columns: ColumnDef<clientPageColumn>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => (
      <Link href={`/projects/${row.original._id}`} className="font-medium">
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge variant={"outline"} className="capitalize">
          {row.getValue("status")}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      console.log({ filterValue, columnId, row });

      if (Array.isArray(filterValue) && filterValue.length !== 0) {
        console.log(row.getValue(columnId));

        return filterValue.includes(row.getValue(columnId));
      } else {
        return true;
      }
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = formatCurrency(price);
      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "payment_status",
    header: "Payment status",
    cell: ({ row }) => (
      <Badge variant={"outline"} className="capitalize">
        {row.getValue("payment_status")}
      </Badge>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last updated",
    cell: ({ row }) => {
      const formatted = formatDate(row.getValue("updatedAt"));
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "completed_on",
    header: "Completed on",
    cell: ({ row }) => {
      const formatted = formatDate(row.getValue("completed_on"));
      return <span>{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const projectId = row.original._id;
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
              onClick={() => navigator.clipboard.writeText(projectId)}
            >
              Copy project id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View client</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
