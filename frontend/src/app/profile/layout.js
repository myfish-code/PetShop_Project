'use client'; // Нужно, так как используем хук usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ProfileLayout.module.css';

export default function ProfileLayout({ children }) {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <nav className={styles.nav}>
                    <Link href="/profile" className={isActive('/profile') ? styles.active : ''}>
                        Головна
                    </Link>
                    <Link href="/profile/orders" className={isActive('/profile/orders') ? styles.active : ''}>
                        Мої замовлення
                    </Link>
                    <Link href="/profile/addresses" className={isActive('/profile/addresses') ? styles.active : ''}>  
                        Адреси доставки
                    </Link>
                </nav>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}