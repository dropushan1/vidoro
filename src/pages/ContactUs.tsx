// src/pages/ContactUs.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

// HARDCODED Supabase URL and Key - Replace with actual values if different
const supabaseUrl = 'https://mwpyorayqfyrcpclyhmk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13cHlvcmF5cWZ5cmNwY2x5aG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1MTg0OTUsImV4cCI6MjA1MjA5NDQ5NX0.3tl92mwRQotJ_p95O7a2R4PKO2ecYF7_tBuUxLvJX6M';

const supabase = createClient(supabaseUrl, supabaseKey);

interface FormData {
  name: string;
  email: string;
  channelLink: string;
  message: string;
}

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const { error } = await supabase
                .from('contacts') // Make sure 'contacts' is the correct table name in Supabase
                .insert([{
                    name: data.name,
                    email: data.email,
                    channel_link: data.channelLink, // Supabase columns are often snake_case
                    message: data.message,
                    created_at: new Date().toISOString()
                }]);

            if (error) {
                console.error("Error inserting data to Supabase:", error.message);
                toast.error("Failed to send message. Please try again.", {
                    position: "bottom-left",
                    duration: 4000,
                    style: { // Keep static styles for toast or make them theme-aware via a toast wrapper
                        backgroundColor: "#2A2A35",
                        border: "1px solid #3A3A45",
                        color: "white",
                        fontSize: "14px"
                    },
                });
            } else {
                toast.success("Message sent successfully!", {
                    position: "bottom-left",
                    duration: 4000,
                    style: { // Keep static styles for toast or make them theme-aware via a toast wrapper
                        backgroundColor: "#2A2A35",
                        border: "1px solid #3A3A45",
                        color: "white",
                        fontSize: "14px",
                    },
                    icon: "✓",
                });
                reset();
            }
        } catch (error: any) {
            console.error("Client-side error sending data:", error.message);
            toast.error("Something went wrong. Please check your connection.", {
                position: "bottom-left",
                duration: 4000,
                style: { // Keep static styles for toast or make them theme-aware via a toast wrapper
                    backgroundColor: "#2A2A35",
                    border: "1px solid #3A3A45",
                    color: "white",
                    fontSize: "14px"
                },
            });
        }
    };

    // Removed the handleLogoClick function as the button is removed

    return (
        // Changed bg-[#0A0A0F] to bg-background
        // Changed text-white to text-foreground
        <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center py-16">
            {/* Removed the Logo div here */}
            {/* The div with class "absolute top-6 left-6 ..." was here */}

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    // Changed bg-[#151520] to bg-card
                    // Changed border-[#2A2A35] to border-border
                    className="max-w-2xl w-full mx-auto bg-card rounded-2xl shadow-2xl p-8 sm:p-10 border border-border"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
                        {/* Gradient text needs to be theme-aware for light mode readability */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                            Contact Us
                        </span>
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            {/* Changed text-gray-200 to text-muted-foreground */}
                            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                            <Input
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                // Changed bg-[#1C1C28] to bg-input
                                // Changed border-[#2A2A35] to border-border
                                // Changed text-white to text-foreground
                                // Changed placeholder-gray-400 to placeholder-muted-foreground
                                // focus:ring-indigo-500 focus:border-indigo-500 are good feature colors
                                className="w-full bg-input border-border text-foreground placeholder-muted-foreground focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                placeholder="Your name"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} {/* Red for errors can be static */}
                        </div>

                        <div>
                            {/* Changed text-gray-200 to text-muted-foreground */}
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                            <Input
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                // Changed bg-[#1C1C28] to bg-input, border-[#2A2A35] to border-border, etc.
                                className="w-full bg-input border-border text-foreground placeholder-muted-foreground focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            {/* Changed text-gray-200 to text-muted-foreground */}
                            <label htmlFor="channelLink" className="block text-sm font-medium text-muted-foreground mb-2">YouTube Channel Link</label>
                            <Input
                                id="channelLink"
                                {...register("channelLink", {
                                    required: "Channel link is required",
                                    pattern: {
                                        value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i,
                                        message: "Please enter a valid YouTube link"
                                    }
                                })}
                                // Changed bg-[#1C1C28] to bg-input, border-[#2A2A35] to border-border, etc.
                                className="w-full bg-input border-border text-foreground placeholder-muted-foreground focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                placeholder="https://youtube.com/c/yourchannel"
                            />
                            {errors.channelLink && <p className="text-red-500 text-sm mt-1">{errors.channelLink.message}</p>}
                        </div>

                        <div>
                            {/* Changed text-gray-200 to text-muted-foreground */}
                            <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                            <Textarea
                                id="message"
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: { value: 10, message: "Message must be at least 10 characters" }
                                })}
                                // Changed bg-[#1C1C28] to bg-input, border-[#2A2A35] to border-border, etc.
                                className="w-full bg-input border-border text-foreground placeholder-muted-foreground focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                placeholder="Your message (min. 10 characters)"
                                rows={5}
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        {/* Changed text-gray-400 to text-muted-foreground */}
                        <p className="text-center text-xs sm:text-sm text-muted-foreground pt-2">
                            We aim to respond within a few business hours.
                        </p>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            // Button colors remain strong gradient, which is fine for CTAs
                            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : "Send Message"}
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        {/* Changed text-gray-400 to text-muted-foreground */}
                        <p className="mb-2 text-sm text-muted-foreground">Or reach us directly via email:</p>
                        <a
                            href="mailto:contact@vidoro.agency"
                            // Changed text-indigo-400 to a more generic link color or specific indigo
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-base hover:underline"
                        >
                            contact@vidoro.agency
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;