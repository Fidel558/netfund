export default function Dashboard() {
  return (
    <main className="min-h-screen bg-netfund-light font-sans">
      <nav className="bg-netfund-green text-white px-6 py-4 flex justify-between">
        <span className="font-bold">🎓 NETFUND</span>
        <a href="/" className="text-sm">Logout</a>
      </nav>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-netfund-green">Welcome 👋</h1>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-gray-600">Application Status</h2>
            <p className="text-netfund-gold font-bold mt-2">🟡 Under Review</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-gray-600">Payment</h2>
            <p className="text-green-600 font-bold mt-2">✅ Paid ₦2,250</p>
          </div>
        </div>
      </div>
    </main>
  );
}
