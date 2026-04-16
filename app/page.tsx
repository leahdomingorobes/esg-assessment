"use client";
import { useState } from "react";

export default function Home() {
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/generate-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, industry, employees: "", practices: [], compliance: "" }),
      });
      
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Error: " + err);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">ESG Gap Assessment</h1>
        
        {!result ? (
          <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-lg space-y-4">
            <input type="text" placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 bg-white/5 border border-white/20 rounded text-white placeholder-white/50" required />
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full p-3 bg-white/5 border border-white/20 rounded text-white" required>
              <option value="">Select Industry</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Technology">Technology</option>
              <option value="Retail">Retail</option>
            </select>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-white/5 border border-white/20 rounded text-white placeholder-white/50" required />
            <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-500 text-white rounded font-semibold hover:bg-emerald-600">
              {loading ? "Generating..." : "Generate Assessment"}
            </button>
          </form>
        ) : (
          <div className="bg-white/10 p-8 rounded-lg">
            <pre className="text-white text-sm whitespace-pre-wrap mb-6">{result}</pre>
            <button onClick={() => setResult("")} className="w-full py-3 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600">
              New Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}