import Header from "@/app/ui/home/header";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <h1>Home Layout</h1>
            {children}
        </div>
    );
}
