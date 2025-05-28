import Header from "@/app/ui/template-2/Header";
import MobileNavbar from "@/app/components/MobileNavbar";
import Footer from "@/app/ui/template-2/Footer";
import FooterBottomBar from "@/app/ui/template-2/FooterBottomBar";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>  
            <Header />
            {children}
            <MobileNavbar />
         <div className="w-full bg-[url('/images/body-bottom-bg.png')] bg-cover bg-center bg-no-repeat">
                 <div className="md:px-20">
                   
                   <Footer />
                 </div>
                 </div>
                 <FooterBottomBar />
        </>
        
    );
}
