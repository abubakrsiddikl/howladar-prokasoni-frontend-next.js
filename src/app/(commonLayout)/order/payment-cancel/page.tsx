"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Ban className="text-orange-500 w-20 h-20 mb-4" />

      <h1 className="text-3xl font-bold text-orange-600 mb-2">
        Payment Canceled!
      </h1>

      <p className="text-gray-600 max-w-md mb-6">
        আপনি পেমেন্ট প্রক্রিয়া বাতিল করেছেন। চাইলে আবার চেষ্টা করতে পারেন।
      </p>

      <div className="flex gap-3">
        <Button asChild variant="default">
          <Link href="/checkout">Try Again</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
