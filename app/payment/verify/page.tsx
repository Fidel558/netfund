"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyContent() {
  const params = useSearchParams();
  const router = useRouter();
  const reference = params.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    if (!reference) return;
    fetch(`/api/payment/verify?reference=${reference}`)
      .then((r) => r.json())
      .then((d) => {
        setStatus(d.success ? "success" : "failed");
        if (d.success) setTimeout(() => router.push("/dashboard"), 2500);
      });
  }, [reference, router]);

  return (
    <main className="min-h-screen bg-netfund-light flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        {status === "loading" && <p>⏳ Verifying payment...</p>}
        {status === "success" && (
          <>
            <div className="text-5xl">✅</div>
            <h1 className="text-2xl font-bold text-netfund-green mt-4">Payment Successful!</h1>
            <p className="text-gray-600 mt-2">Your NETFUND form is now unlocked.</p>
          </>
        )}
        {status === "failed" && (
          <>
            <div className="text-5xl">❌</div>
            <h1 className="text-2xl font-bold text-red-600 mt-4">Payment Failed</h1>
            <p className="text-gray-600 mt-2">Please try again.</p>
          </>
        )}
      </div>
    </main>
  );
}

export default function Verify() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-netfund-light" />}>
      <VerifyContent />
    </Suspense>
  );
}
