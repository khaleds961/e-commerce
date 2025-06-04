import Header from "@/app/ui/template-2/Header";
import MobileNavbar from "@/app/components/MobileNavbar";
import Footer from "@/app/ui/template-2/Footer";
import FooterBottomBar from "@/app/ui/template-2/FooterBottomBar";
import InfoCards from "@/app/ui/template-2/InfoCards";
import Topmenu from "@/app/ui/template-2/Topmenu";
import Searchbar from "@/app/ui/template-2/Searchbar";
import MainMenu from "@/app/ui/template-2/Mainmenu";
export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
    
})
 {
    const siteProperties = {
    color: '#BE1C26',
    fontFamily: 'Poppins',
    backgroundColor: '#F7F8F7',
    logo: '/images/logo.png',
    textColor: '#000000',
  };
    return (
        <>  
        <div className="min-h-screen bg-gray-50">
      <Topmenu siteProperties={siteProperties} />
      <Searchbar siteProperties={siteProperties} />
      <MainMenu siteProperties={siteProperties} />
            <Header />
            {children}
            <MobileNavbar />
            <InfoCards />
         <div className="w-full bg-[url('/images/body-bottom-bg.png')] bg-cover bg-center bg-no-repeat">
         
                 <div className="md:px-20">
                   
                   <Footer />
                 </div>
                 </div>
                 
                 <FooterBottomBar />
                 </div>
        </>
        
    );
}
