'use client';

import Topmenu from "@/app/ui/template-2/Topmenu";
import Searchbar from "@/app/ui/template-2/Searchbar";
import MainMenu from "@/app/ui/template-2/Mainmenu";
import InfoCards from "@/app/ui/template-2/InfoCards";
import ContactForm from "@/app/ui/template-2/ContactForm";

export default function ContactUsPage() {
  const siteProperties = {
    color: '#BE1C26',
    fontFamily: 'Poppins',
    backgroundColor: '#F7F8F7',
    logo: '/images/logo.png',
    textColor: '#000000',
  };

  return (
    <div className="min-h-screen">
      <Topmenu siteProperties={siteProperties} />
      <Searchbar siteProperties={siteProperties} />
      <MainMenu siteProperties={siteProperties} />
      <div className="bg-[#FFF0E5] py-6 mt-18 bg-cover bg-center px-40">
        <div className="flex justify-between items-center">
          {/* Left - Title */}
          <h2 className="text-3xl font-bold text-black">Contact</h2>

          {/* Right - Breadcrumbs */}
          <div className="text-sm text-gray-600 space-x-1">
            <a href="/template-2" className="hover:underline text-blue-600">Home</a>
            <span>{'>'}</span>
            <span className="text-gray-800">Contact</span>
          </div>
        </div>
      </div>
      <div className="mx-2 md:mx-10 px-0 md:px-10 mt-5">
        <ContactForm />
        <InfoCards />
      </div>
    </div>
  );
}
