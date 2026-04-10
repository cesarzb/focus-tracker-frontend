"use client";

import { useState } from "react";
import type { LoginDto } from "./dtos/LoginDto";
import api from "@/api/client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginDto>({
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
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, server: undefined }));
    }
  };

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      login(response.data.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong";
      setErrors({ server: Array.isArray(message) ? message[0] : message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-900 p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-stone-50">
            Welcome Back
          </h1>
          <p className="mt-2 text-stone-400">
            Please enter your details to sign in.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-800/40 p-8 shadow-2xl backdrop-blur-sm">
          {errors.server && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle size={16} />
              {errors.server}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full rounded-xl bg-stone-950 border p-3 text-stone-50 outline-none transition-all 
                  ${errors.username ? "border-red-500 ring-4 ring-red-500/10" : "border-stone-700/50 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"}`}
                placeholder="username"
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
                className={`w-full rounded-xl bg-stone-950 border p-3 text-stone-50 outline-none transition-all 
                  ${errors.password ? "border-red-500 ring-4 ring-red-500/10" : "border-stone-700/50 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10"}`}
                placeholder="••••••••"
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
                "Sign In"
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-stone-500">
            Don't have an account?
            <Link
              href="/register"
              className="ml-1 font-semibold text-stone-300 hover:text-orange-500 transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
