"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ReactNode;
}

export default function Input({ label, icon, className, ...props }: InputProps) {
    const [focused, setFocused] = useState(false);

    return (
        <div className={cn("relative group", className)}>
            <div
                className={cn(
                    "flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border transition-all duration-300",
                    focused
                        ? "border-brand-purple bg-white/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                        : "border-white/10 hover:border-white/20"
                )}
            >
                {icon && <span className="text-gray-400">{icon}</span>}
                <input
                    {...props}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-transparent peer"
                    onFocus={(e) => {
                        setFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        props.onBlur?.(e);
                    }}
                    placeholder={label} // Required for :placeholder-shown trick
                />
                <label
                    className={cn(
                        "absolute left-10 pointer-events-none transition-all duration-300 origin-[0]",
                        focused || props.value
                            ? "-top-6 left-1 text-xs text-brand-purple font-bold"
                            : "top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:left-1 peer-focus:text-brand-purple peer-focus:text-xs"
                    )}
                >
                    {label}
                </label>
            </div>
        </div>
    );
}
