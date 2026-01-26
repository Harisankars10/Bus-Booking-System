"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, ShieldCheck, Ticket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const steps = ["Review", "Payment", "Confirmation"];

export default function PaymentPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [processing, setProcessing] = useState(false);

    const handlePay = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setCurrentStep(2);
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-28 pb-12 px-6 bg-background">
            <div className="max-w-3xl mx-auto">

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-0"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-brand-cyan transition-all duration-500 -z-0"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step, index) => (
                        <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${index <= currentStep
                                        ? "bg-brand-cyan text-black"
                                        : "bg-gray-800 text-gray-500 border border-white/10"
                                    }`}
                            >
                                {index < currentStep ? <Check className="w-6 h-6" /> : index + 1}
                            </div>
                            <span className={`text-xs ${index <= currentStep ? "text-brand-cyan" : "text-gray-500"}`}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            <h2 className="text-2xl font-bold font-heading mb-6">Review Booking</h2>
                            <div className="space-y-4 mb-8">
                                <div className="p-4 bg-white/5 rounded-xl flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">Bus</p>
                                        <p className="font-bold">SkyBus Premium - AC Sleeper</p>
                                    </div>
                                    <Ticket className="text-brand-purple" />
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-sm">Route</p>
                                        <p className="font-bold">Bangalore → Hyderabad</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-sm">Date</p>
                                        <p className="font-bold">25 Oct, 2023</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="w-full py-4 bg-brand-blue rounded-xl font-bold text-white hover:bg-brand-blue/80 transition-colors"
                            >
                                Confirm Details
                            </button>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            <h2 className="text-2xl font-bold font-heading mb-6">Payment Method</h2>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 border border-brand-cyan bg-brand-cyan/10 rounded-xl cursor-pointer flex flex-col items-center gap-2">
                                    <CreditCard className="w-8 h-8 text-brand-cyan" />
                                    <span className="font-bold">Card</span>
                                </div>
                                <div className="p-4 border border-white/10 bg-white/5 rounded-xl cursor-pointer flex flex-col items-center gap-2 hover:bg-white/10">
                                    <ShieldCheck className="w-8 h-8 text-gray-400" />
                                    <span className="text-gray-400">UPI / Wallets</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <input type="text" placeholder="Card Number" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-brand-cyan" />
                                <div className="flex gap-4">
                                    <input type="text" placeholder="MM/YY" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-brand-cyan" />
                                    <input type="text" placeholder="CVV" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-brand-cyan" />
                                </div>
                            </div>

                            <button
                                onClick={handlePay}
                                disabled={processing}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:scale-[1.02] transition-all flex justify-center items-center"
                            >
                                {processing ? "Processing..." : "Pay Now & Book"}
                            </button>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-12 rounded-3xl text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                            >
                                <Check className="w-12 h-12 text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold font-heading mb-4 text-white">Booking Confirmed!</h2>
                            <p className="text-gray-400 mb-8">Your ticket has been sent to your email.</p>

                            <div className="flex gap-4 justify-center">
                                <Link href="/">
                                    <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold transition-colors">
                                        Return Home
                                    </button>
                                </Link>
                                <Link href="/bookings">
                                    <button className="px-8 py-3 bg-brand-cyan text-black rounded-xl font-bold hover:bg-cyan-400 transition-colors">
                                        View Ticket
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
