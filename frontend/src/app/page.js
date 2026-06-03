import styles from "./page.module.css";
import { getProducts } from "@/api/shop";
import ProductCard from "@/components/ProductCard/ProductCard";


export default async function HomePage() {
    const data = await getProducts(); 
    const products = data.products || [];
    
    return (
      <main className={styles.main}>
        <h1>Найкращі пропозиції</h1>
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    );
}