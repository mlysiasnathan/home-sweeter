import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import {Inter} from "next/font/google";
import Header from "../components/Header";
import AuthSessionProvider from "../components/SessionProvider";
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Home SWEETER",
    description: "LALA project",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthSessionProvider>
            <Header/>
            {children}
            <ToastContainer position={"top-center"}/>
        </AuthSessionProvider>
        </body>
        </html>
    );
}
