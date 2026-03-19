import { useState, useEffect } from "react";
import WorkerCard from "../components/WorkerCard";
import Toast from "../components/Toast";
import { workers, trades } from "../data/mockData";

export default function Match() {
  const [selectedTrade, setSelectedTrade] = useState("All");
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedTrade]);

  const filteredWorkers = selectedTrade === "All"
    ? workers
    : workers.filter((w) => w.trade === selectedTrade);

  const handleHire = (worker) => {
    setToast({
      message: `Request sent to ${worker.name}. They will contact you shortly.`,
      type: "success"
    });
  };

  return (
    <div className="w-full bg-bg-light min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-fade-in-up bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-4xl font-extrabold text-text-dark mb-3">Find a Worker</h1>
            <p className="text-text-muted text-lg">Discover top-rated, verified professionals near you.</p>
          </div>

          <div className="w-full md:w-72">
            <label className="block text-sm font-semibold text-text-dark mb-2 ml-1">Filter by Trade</label>
            <div className="relative">
              <select
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full px-5 py-4 text-lg bg-bg-light rounded-xl border-2 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="All">All Categories</option>
                {trades.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4 animate-fade-in-up stagger-1">
          <span className="font-medium text-text-dark">
            {isLoading ? "Searching..." : `Showing ${filteredWorkers.length} results`}
          </span>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Sorted by relevance
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-72 flex flex-col justify-between overflow-hidden">
                <div className="flex items-start gap-4 animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0"></div>
                  <div className="flex-1 mt-2 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-12 bg-gray-100 rounded-xl animate-pulse w-full mt-4"></div>
                <div className="flex justify-between items-center mt-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-12 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up stagger-2">
            {filteredWorkers.map((worker, idx) => (
              <div key={worker.id} style={{ animationDelay: `${0.1 * idx}s` }} className="animate-fade-in-up">
                <WorkerCard worker={worker} onHire={handleHire} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-2">No workers found</h3>
            <p className="text-text-muted">We couldn't find any professionals matching "{selectedTrade}".</p>
            <button
              onClick={() => setSelectedTrade("All")}
              className="mt-6 px-6 py-2 bg-primary-light text-primary font-semibold rounded-lg hover:bg-blue-100 transition-colors"
            >
              View all categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
