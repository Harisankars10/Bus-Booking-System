"use client";

import Input from "@/components/ui/Input";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 glass-card rounded-3xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2">Sign in to manage your bookings</p>
                </div>

                <form className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        icon={<Mail className="w-5 h-5" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        icon={<Lock className="w-5 h-5" />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex justify-end">
                        <Link href="#" className="text-sm text-brand-cyan hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl font-bold text-white shadow-lg shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                        Sign In <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-brand-cyan font-bold hover:underline">
                        Create Account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
