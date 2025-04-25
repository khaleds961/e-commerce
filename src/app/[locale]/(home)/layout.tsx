import Header from "@/app/ui/HomePage/Header";
import MobileNavbar from "@/app/components/MobileNavbar";
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
        </>
    );
}
