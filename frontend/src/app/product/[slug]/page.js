import styles from "./page.module.css"

import BackButton from "@/components/BackButton/BackButton";
import AddToCartButton from "@/components/ProductCard/AddToCartButton";

import { getProductById } from "@/api/shop";
export default async function ProductDetail({ params }) {
    const { slug } = await params;
    
    const productId = slug.split('__').pop();

    const data = await getProductById(productId);
    const product = data.product;
    
    if (!product) return <div className={styles.container}>Товар не знайдено</div>;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const imageUrl = product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;

    return (
        <main className={styles.container}>
            <BackButton className={styles.backButton} />
            <div className={styles.productWrapper}>
                <img src={imageUrl} alt={product.name} className={styles.image} />
                
                <div className={styles.info}>
                    <h1>{product.name}</h1>
                    <p className={styles.category}>{product.category.name}</p>
                    
                    <div className={styles.priceBlock}>
                        {product.old_price && <span className={styles.oldPrice}>{product.old_price} ₴</span>}
                        <span className={styles.price}>{product.price} ₴</span>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.actions}>
                        <AddToCartButton productId={product.id} />
                        <button className={styles.buyNowBtn}>Замовити в 1 клік</button>
                    </div>

                    <p className={styles.stock}>В наявності: {product.stock} шт.</p>
                </div>
            </div>
        </main>
    );


}