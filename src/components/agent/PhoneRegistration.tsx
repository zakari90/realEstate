"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Loader2, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateAgentData } from "@/_actions/agent/actions";

const phoneSchema = z
  .string()
  .min(10, "رقم الهاتف يجب أن يتكون من 10 أرقام")
  .regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي فقط على أرقام");

export function PhoneRegistration({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationError, setValidationError] = useState("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    setValidationError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = phoneSchema.safeParse(phoneNumber);
    if (!result.success) {
      setValidationError(result?.error?.errors?.[0]?.message || "");
      return;
    }
    startTransition(async () => {
      await updateAgentData(phoneNumber);
      if (onSuccess) {
        onSuccess();
      }
      router.refresh();
    });
  };

  return (
    <Card className="max-w-md mx-auto shadow-xl border-t-4 border-t-teal-500 mt-10">
      <CardHeader className="text-center pb-2">
        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-teal-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-800">
          إكمال الملف الشخصي
        </CardTitle>
        <CardDescription>يرجى تسجيل رقم هاتفك للمتابعة</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="رقم الهاتف (مثال: 0512345678)"
              value={phoneNumber}
              onChange={handleInputChange}
              className="text-right h-12 text-lg"
              dir="rtl"
            />
            {validationError && (
              <p className="text-red-500 text-sm flex items-center mt-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 ml-2"></span>
                {validationError}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 text-lg bg-teal-600 hover:bg-teal-700 transition-colors"
          >
            {isPending ? (
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            ) : null}
            حفظ ومتابعة
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
