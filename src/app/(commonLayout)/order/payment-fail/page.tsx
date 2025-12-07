"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <XCircle className="text-red-500 w-20 h-20 mb-4" />

      <h1 className="text-3xl font-bold text-red-600 mb-2">
        Payment Failed!
      </h1>

      <p className="text-gray-600 max-w-md mb-6">
        আপনার পেমেন্টটি সফল হয়নি। দয়া করে আবার চেষ্টা করুন অথবা ভিন্ন পেমেন্ট
        পদ্ধতি নির্বাচন করুন।
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
