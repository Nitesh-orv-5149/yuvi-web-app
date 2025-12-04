import AdminNavBar from "@/components/admin/adminNavBar";

export default function adminLayout({children}) {
    return (
        <section>
            {children}
            <AdminNavBar/>
        </section>
    );
}