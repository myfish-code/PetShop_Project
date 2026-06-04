'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from "./CartIcon.module.css"

export default function CartIcon({ className, onClick }) {
    const [isOpenCart, setIsOpenCart] = useState(false);

    const handleIconClick = () => {
        setIsOpenCart(true); 
        if (onClick) onClick(); 
    };

    return (
        <>
            <div
                className={`${className} ${styles.cartButton}`} 
                onClick={handleIconClick}
            >
                <ShoppingCart size={24} className={styles.icon} />
                <span className={styles.cartBadge}>0</span>
            </div>

            {isOpenCart && (
                <div className={styles.overlay} onClick={() => setIsOpenCart(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.header}>
                            <h3>Ваш кошик</h3>
                            <span onClick={() => setIsOpenCart(false)}>❌</span>
                        </div>
                        <div className={styles.body}>
                            <p>Товари в кошику...</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}