import ProjectModel from "@/models/Project";
import { formateDateWithMilliseconds } from "@/utils/formatDate";
import { createHmac, timingSafeEqual } from "crypto";
import { unstable_noStore as noStore } from "next/cache";

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  try {
    noStore();
    const clonedBody = req.clone();

    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      console.error("Missing signature");
      return Response.json({ error: "Missing signature" }, { status: 400 });
    }

    const body = await req.json();

    const expectedSignature = createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(await clonedBody.text())
      .digest("hex");

    if (
      !timingSafeEqual(
        Buffer.from(expectedSignature, "utf8"),
        Buffer.from(signature, "utf8")
      )
    ) {
      console.error("Invalid signature");
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (signature !== expectedSignature) {
      console.error("Invalid signature");
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }
    const db_res = await ProjectModel.findOne({
      payment_link: body.payload.payment_link.entity.short_url,
    });
    if (!db_res) {
      console.error("Project with payment link not found");
      throw new Error("Project with payment link not found");
    }
    if (body.payload.payment.entity.status === "captured") {
      db_res.payment_status = "success";
      db_res.paid_on = formateDateWithMilliseconds(
        body.payload.payment.entity.created_at
      );
    }
    await db_res.save();

    return Response.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return Response.json(
      { error: "Error processing webhook" },
      {
        status: 500,
      }
    );
  }
}
