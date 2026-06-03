import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import { GoogleOAuthProvider } from '@react-oauth/google';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "PetShop | Лучшие товары для питомцев",
    description: "Магазин зоотоваров с доставкой по городу",
};

export default function RootLayout({ children }) {
    // 2. Получаем ID из переменной окружения
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body>
                {/* 3. Оборачиваем body или детей в провайдер */}
                <GoogleOAuthProvider clientId={clientId}>
                    <Header />
                    <main>
                        {children}
                    </main>
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}