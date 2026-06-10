import Navbar from "./Navbar";

export default function Layout({ children }) {

    return (
        <>
            <header>
                <Navbar />
            </header>
            
            <main className="container mt-4">
                {children}
            </main>

            <footer className="text-center text-muted py-3 border-top mt-5">
                <p>Vytvořeno Jaroslav Žáček</p>
            </footer>

        </>
    );
}