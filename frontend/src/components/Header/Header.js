import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import BurgerButton from '../BurgerButton/BurgerButton';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <BurgerButton />
        
        <Link href="/" className={styles.logo}>PetShop</Link>

        <div className={styles.searchContainer}>
          <input type="text" placeholder="Пошук товарів..." className={styles.searchInput} />
        </div>

        <div className={styles.actions}>
          <Link href="/profile" className={styles.iconButton}>
            <User size={24} className={styles.icon} />
          </Link>
          <Link href="/cart" className={styles.cartButton}>
            <ShoppingCart size={24} className={styles.icon} />
            <span className={styles.cartBadge}>0</span>
          </Link>
        </div>
      </div>
    </header>
  );
}