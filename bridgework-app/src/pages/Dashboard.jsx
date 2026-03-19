import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { jobRequests, dashboardData } from "../data/mockData";

export default function Dashboard() {
  const [activeJobs, setActiveJobs] = useState(jobRequests);
  const [toast, setToast] = useState(null);

  const handleAction = (id, action) => {
    setActiveJobs(activeJobs.filter((job) => job.id !== id));
    setToast({
      message: `Job ${action === "accept" ? "accepted" : "rejected"} successfully.`,
      type: action === "accept" ? "success" : "info" // 'info' maps to primary color in our toast
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full bg-bg-light min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-12 animate-fade-in-up">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-4xl font-extrabold text-text-dark mb-2">Worker Dashboard</h1>
            <p className="text-text-muted text-lg">Welcome back, <span className="font-semibold text-text-dark">Rajesh Kumar</span></p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-bold border border-green-100">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
              Available for Work
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-1">
          <Card className="p-8 border-t-4 border-t-primary shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted mb-1">Earnings (Month)</p>
                <h3 className="text-3xl font-bold text-text-dark">₹{dashboardData.earningsThisMonth.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-t-4 border-t-success shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-text-muted mb-2 uppercase tracking-wide">Completed Jobs</p>
                <h3 className="text-4xl font-extrabold text-text-dark">{dashboardData.totalJobs}</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-lg text-success">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-md flex flex-col justify-center">
            <p className="text-sm font-semibold text-text-muted mb-4 flex items-center justify-between uppercase tracking-wide">
              Profile Completion <span className="text-primary font-bold text-base">{dashboardData.profileCompletion}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
              <div
                className="bg-primary h-3 rounded-full relative"
                style={{ width: `${dashboardData.profileCompletion}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '1000px 100%' }}></div>
              </div>
            </div>
            <p className="text-xs text-text-muted font-medium">Add identity proof to reach 100%</p>
          </Card>
        </div>

        {/* Active Job Requests */}
        <div className="stagger-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-3xl font-extrabold text-text-dark">Active Job Requests</h2>
            <button className="text-primary text-base font-bold hover:text-primary-dark transition-colors px-4 py-2 bg-primary-light/30 rounded-lg">View All</button>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {activeJobs.length > 0 ? (
              activeJobs.map((job, idx) => (
                <Card key={job.id} className="p-8 animate-fade-in-up border-0 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] ring-1 ring-gray-100 h-full flex flex-col" hover={false} style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <h3 className="text-xl font-extrabold text-text-dark leading-tight">{job.title}</h3>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="block text-2xl font-black text-primary">₹{job.budget}</span>
                      <span className="text-xs text-text-muted font-medium bg-gray-50 px-2 py-1 rounded-md mt-1 inline-block">{job.postedAt}</span>
                    </div>
                  </div>

                  <p className="text-text-muted text-base mb-6 leading-relaxed flex-grow">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-3 mb-8 text-sm text-text-dark bg-bg-light p-4 rounded-xl border border-gray-200">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold truncate text-[15px]">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <Button
                      variant="success"
                      onClick={() => handleAction(job.id, "accept")}
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 shadow-md text-[15px] font-bold"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Accept
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleAction(job.id, "reject")}
                      className="flex-1 py-3 text-text-muted border-gray-200 bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-[15px] font-bold"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Decline
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100 border-dashed animate-fade-in">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium tracking-tight text-text-dark mb-1">No Active Requests</h3>
                <p className="text-text-muted">You have resolved all your job requests for now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
