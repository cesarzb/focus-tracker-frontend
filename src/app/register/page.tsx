"use client";

import Link from "next/link";
import api from "../../api/client";
import type { RegisterDto } from "./dtos/RegisterDto";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircle, Loader2 } from "lucide-react";

const Register = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterDto>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    server?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, server: undefined }));
  };

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/users/", formData);

      const response = await api.post("/auth/login", formData);
      login(response.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ server: Array.isArray(message) ? message[0] : message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-900 p-4 font-sans selection:bg-orange-500/30">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-50">
            Create Account
          </h1>
          <p className="mt-2 text-stone-400">Join the sessions app today.</p>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-800/40 p-8 shadow-2xl backdrop-blur-sm">
          {errors.server && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle size={16} />
              {errors.server}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className={`w-full rounded-xl bg-stone-950 border p-3 text-stone-50 outline-none transition-all 
                  ${errors.username ? "border-red-500 ring-4 ring-red-500/10" : "border-stone-700/50 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"}`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-xl bg-stone-950 border p-3 text-stone-50 outline-none transition-all 
                  ${errors.password ? "border-red-500 ring-4 ring-red-500/10" : "border-stone-700/50 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"}`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer group relative flex w-full items-center justify-center rounded-xl bg-orange-600 py-3 px-4 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-semibold text-stone-300 hover:text-orange-500 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
