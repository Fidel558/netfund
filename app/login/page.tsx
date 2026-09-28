"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) router.push("/dashboard");
    else setError(data.error || "Login failed");
  };

  return (
    <main className="min-h-screen bg-netfund-light font-sans">
      <nav className="bg-netfund-green text-white px-6 py-4">
        <span className="font-bold">🎓 NETFUND</span>
      </nav>
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 my-16">
        <h1 className="text-2xl font-bold text-netfund-green text-center">Login</h1>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-netfund-green focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-netfund-green focus:outline-none"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full bg-netfund-green text-white font-semibold py-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
