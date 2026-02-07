"use client";

import { useState, useTransition } from "react";
import { resetDemoData } from "@/_actions/agent/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ResetDemoButton() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleReset = () => {
    startTransition(async () => {
      const result = await resetDemoData();

      if (result.success) {
        toast.success("Demo data reset successfully");
        setOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to reset demo data");
      }
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="lg"
            className="shadow-lg rounded-full h-14 px-6 gap-2 border-4 border-white"
          >
            <Trash2 className="h-5 w-5" />
            Reset Demo
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Careful! Reset Demo Data?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete ALL:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Properties</li>
                <li>Investments</li>
                <li>Client Offers</li>
                <li>Visit Logs</li>
              </ul>
              <br />
              Use this to clean the database for a fresh start.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ...
                </>
              ) : (
                ""
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
