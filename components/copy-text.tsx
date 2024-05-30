"use client";
import { cn } from "@/lib/utils";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  isTruncate: boolean;
  text: string;
};

const CopyText = ({ isTruncate = false, text }: Props) => {
  return (
    <>
      <span className={cn({ "truncate w-28": isTruncate })}>{text}</span>
      <Button
        size="icon"
        variant="outline"
        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => navigator.clipboard.writeText(text)}
      >
        <Copy className="h-3 w-3" />
        <span className="sr-only">Copy Order ID</span>
      </Button>
    </>
  );
};

export default CopyText;
