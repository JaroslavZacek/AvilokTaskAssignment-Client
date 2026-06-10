import Navbar from "./Navbar";

export default function Layout({ children }) {

    return (
        <>
            <header>
                <Navbar />
            </header>
            
            <main>
                {children}
            </main>

            <footer>
                <p>Vytvořeno Jaroslav Žáček</p>
            </footer>

        </>
    );
}