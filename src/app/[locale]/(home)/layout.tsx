import Header from "@/app/ui/HomePage/Header";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
