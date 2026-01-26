"use client";

import SeatLayout from "@/components/booking/SeatLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Ticket } from "lucide-react";

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState<any[]>([]);

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const tax = totalPrice * 0.18;
    const grandTotal = totalPrice + tax;

    return (
        <div className="min-h-screen pt-24 px-6 pb-12 bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Seat Selection Area */}
                <div className="lg:col-span-2">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold font-heading mb-2">Select Seats</h1>
                        <p className="text-gray-400">Bus ID: {params.busId} • AC Sleeper (2+1)</p>
                    </div>
                    <SeatLayout onSeatSelect={setSelectedSeats} />
                </div>

                {/* Price Summary Sidebar */}
                <div className="relative">
                    <div className="sticky top-24">
                        <motion.div
                            layout
                            className="glass-card p-6 rounded-2xl border border-white/10"
                        >
                            <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-2">
                                <Ticket className="w-5 h-5 text-brand-purple" />
                                Booking Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Selected Seats</span>
                                    <span className="text-white font-medium">
                                        {selectedSeats.map(s => s.id).join(", ") || "None"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Base Price</span>
                                    <span className="text-white">₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Tax (18%)</span>
                                    <span className="text-white">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-white/10 my-2" />
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <motion.span
                                        key={grandTotal}
                                        initial={{ scale: 1.5, color: "#06b6d4" }}
                                        animate={{ scale: 1, color: "#fff" }}
                                        className="text-brand-cyan"
                                    >
                                        ₹{grandTotal.toFixed(2)}
                                    </motion.span>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/payment")}
                                disabled={selectedSeats.length === 0}
                                className="w-full py-4 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl font-bold text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Proceed to Payment <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
