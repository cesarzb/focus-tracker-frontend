"use client";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const FormInput = ({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-stone-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 scheme-dark disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default FormInput;
