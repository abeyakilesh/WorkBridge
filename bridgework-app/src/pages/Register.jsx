import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Toast from "../components/Toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    trade: "",
    location: "",
    experience: "",
    aadhaar: "",
  });
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const trades = ["Electrician", "Plumber", "Carpenter", "Painter"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aadhaar") {
      // Only allow numbers, max 12
      const val = value.replace(/\D/g, "").slice(0, 12);
      setFormData({ ...formData, [name]: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.aadhaar.length !== 12) {
      setToast({ message: "Aadhaar must be exactly 12 digits.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerified(true);
      setToast({ message: "Registration successful! You are now verified.", type: "success" });
    }, 1500);
  };

  if (isVerified) {
    return (
      <div className="min-h-[calc(100vh-80px)] pt-24 pb-16 px-4 flex items-center justify-center bg-bg-light">
        <Card className="max-w-xl w-full p-10 text-center animate-fade-in-up border-0 shadow-lg ring-1 ring-gray-100">
          <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-sm">
            <svg className="w-14 h-14 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-text-dark mb-4">Registration Complete!</h2>
          <p className="text-text-muted text-lg mb-8 leading-relaxed">
            Welcome to BridgeWork, <span className="font-semibold text-text-dark">{formData.name}</span>. 
            Your profile is now active with a verified badge. Start applying for jobs immediately.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 text-primary border border-blue-200 rounded-xl font-bold shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verified Badge Activated
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 pb-16 px-4 flex flex-col items-center justify-center bg-bg-light relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-10 left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl w-full relative z-10">
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-text-dark mb-4">Join BridgeWork</h1>
          <p className="text-text-muted text-lg">Register as a skilled worker and start earning independently today.</p>
        </div>

        <Card className="p-8 sm:p-12 animate-fade-in-up stagger-1 border-t-8 border-t-primary shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-1">Trade</label>
                <div className="relative">
                  <select
                    name="trade"
                    required
                    value={formData.trade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none shadow-sm bg-white"
                  >
                    <option value="" disabled>Select trade</option>
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
                <label className="block text-sm font-medium text-text-dark mb-1">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  required
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Andheri West, Mumbai"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Aadhaar Number <span className="text-xs text-text-muted font-normal">(12 digits)</span></label>
              <input
                type="text"
                name="aadhaar"
                required
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm font-mono tracking-wider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Profile Photo</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-text-muted">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">{file ? file.name : "PNG, JPG or JPEG (MAX. 2MB)"}</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div className="pt-6">
              <Button type="submit" className="w-full h-14 text-xl font-bold shadow-md hover:shadow-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering Profile...
                  </span>
                ) : "Register & Get Verified"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
