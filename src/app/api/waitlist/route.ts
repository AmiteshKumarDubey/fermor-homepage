import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  planningGoal: z.enum(["Loan", "Investing", "Tax", "Retirement", "Other"]),
  honeypot: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = waitlistSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, errors: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, planningGoal, honeypot } = parseResult.data;

    // Honeypot bot protection check
    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ success: true, message: "Subscribed" });
    }

    const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || process.env.WEBHOOK_URL;

    if (formEndpoint) {
      const formRes = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Anonymous",
          email,
          planningGoal,
          timestamp: new Date().toISOString(),
          source: "Fermor Homepage Waitlist",
        }),
      });

      if (!formRes.ok) {
        throw new Error(`Form endpoint responded with status ${formRes.status}`);
      }
    } else {
      console.log("[WAITLIST SUBMISSION DEV LOG]", { name, email, planningGoal, date: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, message: "Waitlist entry recorded" });
  } catch (error) {
    console.error("[WAITLIST API ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Unable to process waitlist submission. Please check network connection." },
      { status: 500 }
    );
  }
}
