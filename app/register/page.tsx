"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    level: "100L",
    institution: "",
    department: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) router.push(`/payment?userId=${data.userId}`);
    else setError(data.error || "Registration failed");

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-netfund-light font-sans">
      <nav className="bg-netfund-green text-white px-6 py-4 flex justify-between">
        <span className="font-bold">🎓 NETFUND</span>
        <a href="/login" className="text-sm">Login</a>
      </nav>

      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8 my-10">
        <h1 className="text-2xl font-bold text-netfund-green text-center">
          Create Your NETFUND Account
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">Step 1 of 3</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {[
            { label: "Full Name", key: "name", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Phone", key: "phone", type: "tel" },
            { label: "Institution", key: "institution", type: "text" },
            { label: "Department", key: "department", type: "text" },
            { label: "Password", key: "password", type: "password" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700">{f.label}</label>
              <input
                type={f.type}
                required
                value={(form as any)[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-netfund-green"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <div className="flex gap-4 mt-2">
              {["100L", "200L"].map((l) => (
                <label key={l} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="level"
                    checked={form.level === l}
                    onChange={() => setForm({ ...form, level: l })}
                  />
                  {l}
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            I agree to NETFUND Terms & Privacy Policy
          </label>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-netfund-green hover:bg-netfund-dark text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Please wait..." : "Continue to Payment — ₦2,250"}
          </button>
        </form>
      </div>
    </main>
  );
}
