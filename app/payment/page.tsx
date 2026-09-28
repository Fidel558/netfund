"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function PaymentContent() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    const res = await fetch("/api/payment/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (data.authorization_url) window.location.href = data.authorization_url;
    else alert("Payment initialization failed");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-netfund-light flex items-center justify-center px-4 font-sans">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <p className="text-center text-gray-500 text-sm">Step 2 of 3 — Payment</p>
        <h1 className="text-2xl font-bold text-netfund-green text-center mt-2">
          💰 NETFUND Application Fee
        </h1>
        <div className="mt-6 border-t border-gray-200 pt-6 space-y-3 text-gray-700">
          <p className="flex justify-between"><span>Amount:</span><b>₦2,250.00</b></p>
          <p className="flex justify-between"><span>Status:</span><span>⏳ Awaiting</span></p>
        </div>
        <button
          onClick={pay}
          disabled={loading}
          className="mt-8 w-full bg-netfund-green hover:bg-netfund-dark text-white font-bold py-3 rounded-lg"
        >
          {loading ? "Redirecting..." : "Pay ₦2,250 with Paystack"}
        </button>
        <p className="text-center text-xs text-gray-500 mt-4">🔒 Secured by Paystack</p>
        <p className="text-center text-xs text-netfund-gold font-semibold mt-2">
          ⚠️ Form fee is non-refundable
        </p>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-netfund-light" />}>
      <PaymentContent />
    </Suspense>
  );
}
