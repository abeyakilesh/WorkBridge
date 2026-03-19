export default function Button({ children, onClick, variant = "primary", type = "button", className = "", disabled = false }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-[15px] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-[0_4px_14px_0_rgba(24,95,165,0.39)] hover:shadow-[0_6px_20px_rgba(24,95,165,0.23)] active:scale-[0.98] transform",
    secondary: "bg-white text-text-dark border-2 border-gray-200 hover:border-primary hover:text-primary active:scale-[0.98] transform shadow-sm",
    success: "bg-success text-white hover:brightness-110 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] active:scale-[0.98] transform",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md active:scale-[0.98] transform",
    ghost: "bg-transparent text-primary hover:bg-primary-light/50 font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
