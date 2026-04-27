"use client";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const FormTextArea = ({
  label,
  className = "",
  ...props
}: FormTextAreaProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-stone-300">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`w-full resize-none rounded-xl border border-stone-700/50 bg-stone-950 p-3 text-stone-50 outline-none transition-all focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 ${className}`}
      />
    </div>
  );
};

export default FormTextArea;
