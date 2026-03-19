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
    contactEmail: "",
    contactPhone: "",
    contactWhatsapp: "",
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
        contactEmail: "",
        contactPhone: "",
        contactWhatsapp: "",
      });
    }, 1200);
  };

  return (
    <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-bg-light relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-primary/5 rounded-full filter blur-3xl rounded-tl-[100px] pointer-events-none"></div>

      <div className="max-w-4xl w-full relative z-10">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-text-dark mb-4">Post a Job</h1>
          <p className="text-text-muted text-lg">Describe your need and receive quotes from verified professionals in minutes.</p>
        </div>

        <Card className="p-8 sm:p-10 animate-fade-in-up stagger-1 border-t-8 border-t-primary shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Job Details</h2>
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

            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4 mt-12">Contact Information <span className="p-1 px-3 bg-purple-100 text-purple-700 text-sm font-bold ml-3 rounded-full">New</span></h2>
            <p className="text-sm text-gray-500 mb-6 -mt-2">Provide multiple ways for candidates to reach out directly to the hiring manager or representative.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Email (Optional)</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="hr@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="contactPhone"
                  required
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">WhatsApp (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-green-500">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.126.549 4.148 1.597 5.952L.15 24l6.172-1.616c1.748.966 3.708 1.474 5.709 1.474 6.645 0 12.031-5.385 12.031-12.031 0-6.646-5.386-12.031-12.031-12.031zm6.069 17.373c-.255.72-1.488 1.378-2.062 1.464-.52.077-1.189.206-3.484-.741-2.836-1.171-4.665-4.062-4.809-4.254-.141-.192-1.149-1.53-1.149-2.923 0-1.393.72-2.079.972-2.347.251-.271.55-.339.733-.339.18 0 .363.003.522.012.167.009.39-.066.608.461.226.545.748 1.83.816 1.966.066.138.109.299.019.48-.09.18-.135.291-.27.443-.135.15-.286.326-.407.45-.133.137-.272.285-.116.55.153.265.688 1.138 1.476 1.841.93.829 1.785 1.085 2.053 1.22.268.135.426.115.586-.068.156-.184.675-.785.856-1.054.18-.27.359-.225.602-.136.242.088 1.53.723 1.792.855.261.13.435.195.498.305.064.11.064.636-.191 1.356z"/></svg>
                  </span>
                  <input
                    type="tel"
                    name="contactWhatsapp"
                    value={formData.contactWhatsapp}
                    onChange={handleChange}
                    placeholder="WhatsApp Match"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-4">
              <Button type="submit" className="w-full h-12 text-lg group" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Posting Job with Contacts..."
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
                By posting this job, you agree to our Terms of Service and data sharing policies.
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
