"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ অর্ডার সফলভাবে সম্পন্ন হয়েছে!
        </h1>
        <p className="text-gray-700 mb-2">
          ধন্যবাদ আপনাকে। আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।
        </p>

        {id && (
          <p className="mb-4 text-sm text-gray-600">
            🎯 <strong>আপনার অর্ডার আইডি : </strong># {id}
          </p>
        )}
        {transactionId && (
          <p className="mb-4 text-sm text-gray-600">
            🎯 <strong>আপনার ট্রান্সেকশন আইডি : </strong># {transactionId}
          </p>
        )}

        <div className="flex gap-4 justify-center">
          {/* <Link
            href="/customer/dashboard/orders"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            🧾 অর্ডার সমূহ দেখুন
          </Link> */}
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300"
          >
            🏠 হোমে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
