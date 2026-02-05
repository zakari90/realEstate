"use server";

import { z } from "zod";
import axios from "axios"
import emailjs from "@emailjs/browser";

const serviceId = process.env.Emailjs_service_id;
const templateId = process.env.Emailjs_template_id;
const publicKey = process.env.Emailjs_public_key;

export async function sendEmail(prevState: { message: string }, formData: FormData) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("Missing required environment variables");
  }

  const schema = z.object({
    email: z.string().email(),
    message: z.string().min(1),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parse.success) {
    return { message: "Failed to parse content" };
  }

  const data = parse.data;
   const emailjsData = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    templateParams : {
      from_name: "User",
      from_email: "test",
      to_name: "Web Wizard",
      message: "test",
    }
  };

  try {
    const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", emailjsData);
    console.log(res.data);
    return { message: "Email sent successfully!" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { message: "Failed to send email: " + error + emailjsData.templateParams.message};

  }
}
