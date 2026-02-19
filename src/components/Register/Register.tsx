import { Link } from "react-router-dom";

const Register = () => {
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
          <form className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-xl bg-stone-950 border border-stone-700/50 p-3 text-stone-50 placeholder:text-stone-600 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-stone-950 border border-stone-700/50 p-3 text-stone-50 placeholder:text-stone-600 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all"
              />
            </div>

            <button className="group relative flex w-full items-center justify-center rounded-xl bg-orange-600 py-3 px-4 text-sm font-bold text-white transition-all hover:bg-orange-500 active:scale-[0.98]">
              Register
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Already have an account?
            <Link
              to="/login"
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
