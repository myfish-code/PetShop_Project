'use client';

import styles from "./ErrorWindow.module.css"

export default function ErrorWindow({ error }) {
    if (!error) return null;
    
    return (
        <div className={styles.overlay}>
            <div className={styles.errorCard}>
                <div className={styles.header}>
                    <h3>Виникла помилка</h3>
                </div>

                <div className={styles.body}>
                    <p className={styles.message}>{error.message}</p>
                    <p className={styles.hint}>
                        Спробуйте оновити сторінку або перевірити з'єднання. Якщо проблема не зникає, зверніться до підтримки.
                    </p>
                </div>

                <div className={styles.footer}>
                    <button className={styles.refreshBtn} onClick={() => window.location.reload()}>
                        Оновити сторінку
                    </button>
                </div>
            </div>
        </div>
    );
}