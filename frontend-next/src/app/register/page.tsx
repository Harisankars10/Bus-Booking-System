"use client";

import Input from "@/components/ui/Input";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-20">
            {/* Background Blobs */}
            <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 glass-card rounded-3xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-blue">
                        Create Account
                    </h1>
                    <p className="text-gray-400 mt-2">Join SkyBus for premium travel</p>
                </div>

                <form className="space-y-6">
                    <Input
                        label="Full Name"
                        name="name"
                        icon={<User className="w-5 h-5" />}
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={<Mail className="w-5 h-5" />}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        icon={<Lock className="w-5 h-5" />}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        icon={<Lock className="w-5 h-5" />}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <button className="w-full py-3 bg-gradient-to-r from-brand-cyan to-brand-blue rounded-xl font-bold text-white shadow-lg shadow-brand-cyan/30 hover:shadow-brand-cyan/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                        Sign Up <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-brand-blue font-bold hover:underline">
                        Login here
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
