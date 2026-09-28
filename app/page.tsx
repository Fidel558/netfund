import Link from "next/link";

export default function Home() {
  return (
    <main className="font-sans">
      <nav className="bg-netfund-green text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="font-bold text-xl">NETFUND</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#how">How It Works</a>
          <a href="#eligibility">Eligibility</a>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm">Login</Link>
          <Link href="/register" className="bg-netfund-gold text-black font-semibold px-4 py-2 rounded-lg text-sm">
            Register
          </Link>
        </div>
      </nav>

      <section className="bg-netfund-light px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-netfund-green">
          🇳🇬 NETFUND SCHOLARSHIP 2026
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Supporting 100L & 200L Students Nationwide
        </p>

        <div className="mt-10 max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-netfund-gold">
          <p className="text-2xl font-bold text-netfund-green">
            💰 Application Fee: ₦2,250
          </p>
          <p className="text-gray-600 mt-2">📅 Deadline: 30th Nov, 2026</p>
          <Link
            href="/register"
            className="mt-6 inline-block w-full bg-netfund-green hover:bg-netfund-dark text-white font-semibold py-3 rounded-lg transition"
          >
            Register & Pay Now
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          <span>✅ Verified Program</span>
          <span>✅ Instant Form Access</span>
          <span>✅ Winners via Email</span>
        </div>
      </section>

      <section id="how" className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-netfund-green">How It Works</h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          {["Register", "Pay ₦2,250", "Fill Form", "Submit", "Wait"].map((s, i) => (
            <div key={i} className="bg-netfund-light rounded-xl p-4 text-netfund-green font-semibold">
              {i + 1}️⃣ {s}
            </div>
          ))}
        </div>
      </section>

      <section id="eligibility" className="bg-netfund-light px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-netfund-green text-center">Eligibility</h2>
          <ul className="mt-8 space-y-3 text-gray-800 text-lg">
            <li>• Must be a 100L or 200L student</li>
            <li>• Valid admission letter required</li>
            <li>• Nigerian institution only</li>
          </ul>
          <div className="text-center mt-10">
            <Link href="/register" className="bg-netfund-gold text-black font-bold px-8 py-3 rounded-lg">
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-netfund-dark text-white px-6 py-10 text-center text-sm">
        <p>Contact | Terms | Privacy | WhatsApp</p>
        <p className="mt-2 text-gray-300">© 2026 NETFUND. All rights reserved.</p>
      </footer>
    </main>
  );
}
