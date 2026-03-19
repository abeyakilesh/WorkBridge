import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Toast from "../components/Toast";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    trade: "",
    location: "",
    budget: "",
    description: "",
  });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trades = ["Electrician", "Plumber", "Carpenter", "Painter"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setToast({ message: "Job posted successfully! Workers will contact you soon.", type: "success" });
      setFormData({
        title: "",
        trade: "",
        location: "",
        budget: "",
        description: "",
      });
    }, 1200);
  };

  return (
    <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-bg-light relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-primary/5 rounded-full filter blur-3xl rounded-tl-[100px] pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-text-dark mb-4">Post a Job</h1>
          <p className="text-text-muted text-lg">Describe your need and receive quotes from verified professionals in minutes.</p>
        </div>

        <Card className="p-8 sm:p-10 animate-fade-in-up stagger-1 border-t-8 border-t-primary shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Job Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Fix leaking kitchen pipe"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Service Required</label>
                <div className="relative">
                  <select
                    name="trade"
                    required
                    value={formData.trade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none shadow-sm bg-white"
                  >
                    <option value="" disabled>Select category</option>
                    {trades.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Estimated Budget (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">₹</span>
                  </div>
                  <input
                    type="number"
                    name="budget"
                    required
                    min="100"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="1000"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Location / Locality</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Indiranagar, Bangalore"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Job Description</label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Give details about the work required, preferred timings, or specific instructions..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm resize-y"
              ></textarea>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full h-12 text-lg group" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Posting Job..."
                ) : (
                  <>
                    Post Job Request
                    <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-text-muted mt-3">
                By posting this job, you agree to our Terms of Service.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
