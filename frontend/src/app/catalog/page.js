import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import { getProducts } from "@/api/shop"; // Одна функция для одного запроса

export default async function CatalogPage({ searchParams }) {
    const { category } = await searchParams;
    const data = await getProducts(category)
    const { categories, products } = data;

    return (
        <div className={styles.container}>
            <header className={styles.catalogHeader}>
                <h1>Каталог товарів</h1>
            </header>

            <nav className={styles.categoryGrid}>
                <Link 
                    href="/catalog" 
                    className={!category ? styles.active : styles.catBtn}
                >
                    Всі товари
                </Link>
                {categories.map((cat) => (
                    <Link 
                        key={cat.id} 
                        href={`/catalog?category=${cat.slug}`}
                        className={category === cat.slug ? styles.active : styles.catBtn}
                    >
                        {cat.name}
                    </Link>
                ))}
            </nav>

            <div className={styles.productGrid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className={styles.empty}>Товарів у цій категорії поки немає.</p>
                )}
            </div>
        </div>
    );
}