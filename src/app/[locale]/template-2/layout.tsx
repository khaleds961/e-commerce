import Header from "@/app/ui/template-2/Header";
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
