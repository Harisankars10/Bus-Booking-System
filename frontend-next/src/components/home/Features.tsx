"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Map, Armchair, Wifi } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Safety First",
        description: "Verified buses and drivers ensuring a secure journey for you.",
        color: "text-brand-cyan",
    },
    {
        icon: Map,
        title: "Live Tracking",
        description: "Track your bus in real-time and share your location with loved ones.",
        color: "text-brand-purple",
    },
    {
        icon: Armchair,
        title: "Premium Comfort",
        description: "Reclining seats, ample legroom, and sanitized interiors.",
        color: "text-brand-blue",
    },
    {
        icon: Wifi,
        title: "On-board Amenities",
        description: "Free Wi-Fi, charging ports, and water bottles on growing fleets.",
        color: "text-pink-500",
    },
];

export default function Features() {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        Why Choose <span className="text-brand-cyan">SkyBus</span>?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We are redefining the bus travel experience with technology, safety, and comfort at the forefront.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5"
                        >
                            <div className={`p-3 rounded-lg bg-white/5 w-fit mb-4 ${feature.color}`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 font-heading">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
