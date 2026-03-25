interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

const ActionButton = ({
  label,
  onClick,
  variant = "secondary",
  className = "",
}: ActionButtonProps) => {
  const variants = {
    primary:
      "bg-orange-600 border-orange-500 text-stone-50 hover:bg-orange-500 shadow-lg shadow-orange-900/20",
    secondary:
      "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-100 hover:border-stone-700",
    danger:
      "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/50",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-bold tracking-wide
        transition-all duration-200 border
        active:scale-95 flex items-center justify-center gap-2 cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default ActionButton;
