'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Main content container - now responsive */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* Left - Form */}
                <div className="bg-white border border-[#E6E6E6] rounded-lg p-6 w-full lg:w-2/3">
                    <h2 className="text-xl font-semibold mb-6">Make Custom Request</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Email address"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="message">Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Type your message"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Get a Quote
                        </button>
                    </form>
                </div>

                {/* Right - Contact Info */}
                <div className="bg-white border border-[#E6E6E6] rounded-lg p-6 w-full lg:w-1/3 h-auto lg:h-[300px] flex flex-col">
                    <div className="flex-grow">
                        <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="flex items-start gap-2">
                                <span className="mt-0.5">📞</span>
                                <span>+00 123 456 789</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="mt-0.5">📧</span>
                                <span>support24@marketpro.com</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="mt-0.5">📍</span>
                                <span>789 Inner Lane, California, USA</span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold">Get Support On Call</h3>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-2">
                            <span>📍</span>
                            <span>Get Direction</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}