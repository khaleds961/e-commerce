'use client';
import Image from "next/image";

const aboutPageData = {
    missionImage: {
        src: '/images/200x200.svg',
        alt: 'Our mission',
        width: 600,
        height: 400,
    },
    team: [
        { name: "Jane Doe", title: "CEO", img: "/images/200x200.svg" },
        { name: "John Smith", title: "CTO", img: "/images/200x200.svg" },
        { name: "Sara Johnson", title: "Marketing Lead", img: "/images/200x200.svg" },
    ],
};

export default function AboutUsPage() {
    return (

        <div className="min-h-screen bg-white text-gray-800">
            {/* Header Section */}
            <div className="bg-green-600 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    Learn more about our mission, values, and the team behind our success.
                </p>
            </div>

            {/* Company Mission Section */}
            <div className="py-16 px-4 lg:px-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Our goal is to provide high-quality products and services that improve everyday life.
                            We're passionate about delivering value and excellence to our customers.
                        </p>
                    </div>
                    <div>
                        <Image
                            {...aboutPageData.missionImage}
                            className="rounded-lg object-cover w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-100 py-16 px-4 lg:px-32">
                <h2 className="text-3xl font-semibold text-center mb-12">Meet the Team</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {aboutPageData.team.map((member, idx) => (
                        <div key={idx} className="text-center">
                            <Image
                                src={member.img}
                                alt={member.name}
                                width={200}
                                height={200}
                                className="w-48 h-48 rounded-full mx-auto object-cover"
                            />
                            <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-600">{member.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-green-600 text-white py-12 text-center">
                <h2 className="text-2xl font-semibold mb-4">Want to learn more?</h2>
                <p className="mb-6">Get in touch with us or explore our services today.</p>
                <a
                    href="/template-2/contact-us"
                    className="bg-white text-green-600 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
                >
                    Contact Us
                </a>
            </div>
        </div>

    );
}
