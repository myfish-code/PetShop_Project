'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './OrderCard.module.css';

export default function OrderCard({ order }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const items = order.items || [];

    return (
        <div className={styles.card}>
            <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <strong>Замовлення №{order.id}</strong> 
                    <br /> <small>Статус: {order.status}</small>
                </div>
                <div>
                    {order.total_cost} грн {isOpen ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>
            
            {isOpen && (
                <div className={styles.details}>
                    {items.length > 0 ? (
                        items.map(item => (
                            <div key={item.id} className={styles.item}>
                                {/* Используем уже готовое имя продукта */}
                                <span>{item.product_name} × {item.quantity}</span>
                                <span>{item.price} грн</span>
                            </div>
                        ))
                    ) : (
                        <p>Товарів немає</p>
                    )}
                    <div className={styles.footer}>
                        <hr />
                        <p><strong>Адреса:</strong> {order.address}</p>
                        <p><strong>Телефон:</strong> {order.phone}</p>
                    </div>
                </div>
            )}
        </div>
    );
}