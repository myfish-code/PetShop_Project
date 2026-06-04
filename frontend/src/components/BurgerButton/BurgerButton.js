'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import styles from './BurgerButton.module.css';

import CartIcon from '../Header/CartIcon/CartIcon';
export default function BurgerButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.burgerWrapper}>
      {/* Кнопка */}
      <button className={styles.burgerButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} className={styles.icon} /> : <Menu size={28} className={styles.icon} />}
      </button>

      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} onClick={() => setIsOpen(false)} />

      <nav className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.menuContent}>
          <Link href="/" onClick={() => setIsOpen(false)} className={styles.menuLink}>Головна</Link>
          <Link href="/catalog" onClick={() => setIsOpen(false)} className={styles.menuLink}>Каталог</Link>
          <Link href="/profile/addresses" onClick={() => setIsOpen(false)} className={styles.menuLink}>Доставка</Link>
          <hr className={styles.divider} />

          {/*<Link href="/cart" onClick={() => setIsOpen(false)} className={styles.menuLinkWithIcon}>
            <ShoppingCart size={20} /> Кошик
          </Link>
          */}
          <Link href="/profile" onClick={() => setIsOpen(false)} className={styles.menuLinkWithIcon}>
            <User size={20} /> Профіль
          </Link>
        </div>
      </nav>
    </div>
  );
}