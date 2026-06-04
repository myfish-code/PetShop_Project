'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './OrderFilter.module.css';

export default function OrderFilter({ className }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get('status') || '';

    const tabs = [
        { id: '', label: 'Всі' },
        { id: 'active', label: 'Активні' },
        { id: 'shipped', label: 'Доставлені' },
        { id: 'canceled', label: 'Скасовані' },
    ];

    return (
        <div className={`${styles.tabContainer} ${className}`}>
            {tabs.map(tab => (
                <button 
                    key={tab.id}
                    className={currentStatus === tab.id ? styles.active : ''}
                    onClick={() => router.push(tab.id ? `/profile/orders?status=${tab.id}` : '/profile/orders')}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}