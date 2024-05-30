import CopyText from "@/components/copy-text";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "./ui/separator";

import {
  CalendarCheck,
  CalendarCheck2,
  CreditCard,
  Link2,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Project, fetchProjectWithClient } from "@/lib/definitions";
import { formatDate } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatCurrency";
import SetStatus from "./set-status";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProjectDetailCard = ({
  project_id,
  data,
}: {
  project_id: string;
  data: fetchProjectWithClient;
}) => {
  return (
    <Card className="overflow-hidden col-span-1 col-start-3">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order <CopyText isTruncate text={project_id} />
          </CardTitle>
          <CardDescription>
            Created: {formatDate(data.createdAt, false)}
          </CardDescription>
        </div>
        <div className="ml-auto">
          <SetStatus
            currentStatus={data.status}
            _id={project_id}
            client={data.client}
            amount={data.price}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Project Status</span>
              <span className="capitalize">{data.status}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Completed on</span>
              <span>
                {data.completed_on
                  ? formatDate(data.completed_on)
                  : "Yet to complete"}
              </span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(data.price)}</span>
            </li>

            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>$53.82</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(data.price)}</span>
            </li>
          </ul>
        </div>

        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>
                <span>{data.client.fullname.firstname}</span>
                {data.client.fullname.lastname && (
                  <span className="ml-1">{data.client.fullname.lastname}</span>
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href={`mailto:${data.client.email}`}>{data.client.email}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarCheck2 className="h-4 w-4" />
                Paid on
              </dt>
              <dd>{data.paid_on ? formatDate(data.paid_on) : "Not paid"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Link2 className="h-4 w-4" />
                Payment Link
              </dt>
              <dd>
                <Link
                  href={data.payment_link ? data.payment_link : ""}
                  target="_blank"
                  className={cn({
                    "font-medium underline underline-offset-2":
                      data.payment_link,
                  })}
                >
                  {data.payment_link ? data.payment_link : "Not generated"}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          <time dateTime="2023-11-23">{formatDate(data.updatedAt, false)}</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectDetailCard;
