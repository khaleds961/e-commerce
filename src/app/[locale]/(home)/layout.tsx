import Header from "@/app/ui/HomePage/Header";
import MobileNavbar from "@/app/components/MobileNavbar";
import Footer from "@/app/ui/HomePage/Footer";

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
            <Footer />
        </>
    );
}
