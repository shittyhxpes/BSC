"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  error: "",
};

export default function AdminLogin() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/products");
    }
  }, [state?.success, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Admin Access</h1>
          <p className="text-neutral-500 mt-2">Enter password to continue</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          
          {state?.error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
