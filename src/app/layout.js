import { Geist, Geist_Mono } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import Providers from './providers';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';

export const metadata = {
    title: 'SmartStore',
    description: 'Electronics shop (Next.js + Firebase)',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <div className="d-flex flex-column min-vh-100">
                <AppNavbar />
                <main className="flex-grow-1">{children}</main>
                <AppFooter />
            </div>
        </Providers>
        </body>
        </html>
    );
}
