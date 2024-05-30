import Razorpay from "razorpay";

type PaymentLinkProps = {
  name: string;
  email: string;
  mobile_number: string;
  amount: number;
};

export async function generatePaymentLink({
  name,
  email,
  mobile_number,
  amount,
}: PaymentLinkProps) {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const link = await instance.paymentLink.create({
      //   upi_link: true,
      amount: amount * 100,
      currency: "INR",
      accept_partial: false,
      customer: {
        name: name,
        email: email,
        contact: mobile_number,
      },
      notify: { email: false, sms: true },
      notes: { project_name: "This is project 1" },
      description: "Testing me",
    });
    console.log("Payment link created", link);
    return link;
  } catch (error) {
    console.error("Error creating payment link", error);
    throw new Error("Error creating payment link");
  }
}
