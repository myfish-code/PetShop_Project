import Link from 'next/link';
import {User } from 'lucide-react';
import BurgerButton from '../BurgerButton/BurgerButton';
import CartIcon from './CartIcon/CartIcon';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <BurgerButton />
        
        <Link href="/" className={styles.logo}>PetShop</Link>
        <Link href="/catalog" className={styles.catalogLink}>
          Каталог
        </Link>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Пошук товарів..." className={styles.searchInput} />
        </div>

        <div className={styles.actions}>
          <Link href="/profile" className={styles.iconButton}>
            <User size={24} className={styles.icon} />
          </Link>
          <CartIcon className={styles.cartButton}/>
        </div>
      </div>
    </header>
  );
}