import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold text-blue-400">ResQAI</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Launch Dashboard
        </button>
      </header>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Disaster Response
        </h2>

        <p className="max-w-2xl text-gray-300 text-lg mb-8">
          ResQAI is an intelligent decision-support system that analyzes live
          environmental data and helps authorities determine where to act and
          how to deploy rescue resources during disasters.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 px-8 py-3 rounded text-lg hover:bg-blue-700 shadow-lg"
        >
          View Live System
        </button>
      </div>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 p-10 text-center">
        <div className="bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Live Risk Map</h3>
          <p className="text-gray-400">
            Interactive disaster map showing AI-computed risk zones in real time.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">AI Reasoning</h3>
          <p className="text-gray-400">
            Transparent AI decisions with reasoning behind every risk alert.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Smart Resource Allocation</h3>
          <p className="text-gray-400">
            Boats, ambulances, and helicopters assigned automatically by AI.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-6 text-gray-500 text-sm">
        Built by Pratyush Singh & Aditya Dev
      </footer>
    </div>
  );
}
