import styles from "./page.module.css";
import Link from 'next/link';

async function getProducts() {
  const res = await fetch('http://127.0.0.1:8000/api/products', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <section className={styles.hero}>
        <h1 className={styles.title}>Добро пожаловать в PetShop</h1>
        <p>Лучшие товары для вашего питомца.</p>
      </section>

      <section>
        <h2 style={{ textAlign: 'center' }}>Хиты продаж</h2>
        <div className={styles.grid}>
          {products.map((p) => (
            <div key={p.id} className={styles.card}>
              <h3>{p.name}</h3>
              <p>{p.price} ₽</p>
            </div>
          ))}
        </div>
        <nav>
        {/* Обычная ссылка, никаких хуков и "use client" */}
        <Link href="/profile" className={styles.navLink}>Профиль</Link>
      </nav>
      </section>
    </main>
  );
}