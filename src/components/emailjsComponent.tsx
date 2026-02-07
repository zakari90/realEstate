"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import emailjs from "@emailjs/browser";
import { SendIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function EmailjsComponent() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const templateParams = {
    from_email: email,
    message: message,
  };
  const Emailjs_service_id = process.env.NEXT_PUBLIC_DOMAINE1;
  const Emailjs_template_id = process.env.NEXT_PUBLIC_DOMAINE2;
  const Emailjs_public_key = process.env.NEXT_PUBLIC_DOMAINE3;

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        Emailjs_service_id + "",
        Emailjs_template_id + "",
        templateParams,
        Emailjs_public_key + "",
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <form onSubmit={sendEmail} className=" space-y-4 w-80">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative">
          <Input
            placeholder="contact@Email.com"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <div className="relative">
          <Textarea
            placeholder="...."
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      <SendIcon />
    </Button>
  );
}
