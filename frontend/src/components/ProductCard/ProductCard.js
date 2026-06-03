import styles from './ProductCard.module.css';
import AddToCartButton from './AddToCartButton';

import Link from 'next/link';

export default function ProductCard({ product }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
    const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${baseUrl}${product.image}`;

    return (
        <div className={styles.card}>
            <Link href={`/product/${product.slug}__${product.id}`} className={styles.linkWrapper}>
            </Link>
            <img src={imageUrl} alt={product.name} className={styles.image} />
            <h3 className={styles.name}>{product.name}</h3>

            <div className={styles.priceBlock}>
                {product.old_price && <span className={styles.oldPrice}>{product.old_price} ₴</span>}
                <span className={styles.price}>{product.price} ₴</span>
            </div>
            

            <AddToCartButton productId={product.id} />
        </div>
    );
}