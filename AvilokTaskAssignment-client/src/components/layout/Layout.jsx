import Navbar from "./Navbar";

export default function Layout({ children }) {

    return (
        <div className="d-flex flex-column min-vh-100">
            <header>
                <Navbar />
            </header>

            <main className="flex-grow-1">
                {children}
            </main>

            <footer className="bg-dark text-light text-center py-3 mt-auto">
                <p className="mb-0">
                    Vytvořeno Jaroslav Žáček
                </p>
            </footer>
        </div>
    );
}