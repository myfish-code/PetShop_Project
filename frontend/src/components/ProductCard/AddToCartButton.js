'use client';
import { ShoppingCart } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function AddToCartButton({ productId }) {
  const handleAddToCart = (e) => {
    console.log("Додано в кошик:", productId);
  };

  return (
    <button className={styles.cartButton} onClick={handleAddToCart}>
      <ShoppingCart size={20} />
    </button>
  );
}