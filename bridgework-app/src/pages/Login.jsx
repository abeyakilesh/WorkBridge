import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Toast from "../components/Toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate Login API
    setTimeout(() => {
      setIsSubmitting(false);
      setToast({ message: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 1200);
  };

  return (
    <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-bg-light relative overflow-hidden">
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        <div className="text-center mb-10 animate-fade-in-up">
          <h1 className="text-4xl font-extrabold text-text-dark mb-4">Welcome Back</h1>
          <p className="text-text-muted text-lg">Login to access your dashboard</p>
        </div>

        <Card className="p-8 sm:p-10 animate-fade-in-up stagger-1 border-t-8 border-t-primary shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-dark mb-1">Email / Phone</label>
              <input
                type="text"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>
            
            <div>
               <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-medium text-text-dark">Password</label>
                 <a href="#" className="text-sm text-primary hover:underline">Forgot?</a>
               </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 text-lg font-bold shadow-md hover:shadow-lg" disabled={isSubmitting}>
                {isSubmitting ? "Authenticating..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-text-muted mt-8">
             Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register here</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
