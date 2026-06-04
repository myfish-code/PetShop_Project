import styles from "./page.module.css";
import { getProducts } from "@/api/shop";
import ProductCard from "@/components/ProductCard/ProductCard";


export default async function HomePage() {
  const data = await getProducts();
  const products = data.products || [];


  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Найкращі пропозиції</h1>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );

}