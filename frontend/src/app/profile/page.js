import styles from "./page.module.css"
import { User, Mail, Phone, Edit2 } from 'lucide-react';
import { getUserProfile } from '@/api/users';
import GoogleLoginPage from "@/components/GoogleLoginPage/GoogleLoginPage";

export default async function ProfilePage() {
    try {
        const data = await getUserProfile();
        const user = data.user
        
        const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U';
        
        return (
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.headerRow}>
                        <div className={styles.userHead}>
                            {user.avatar_url ? (
                                <img src={user.avatar_url} alt="Avatar" className={styles.avatar} />
                            ) : (
                                <div className={styles.avatarPlaceholder}>{initials}</div>
                            )}
                            <h2 className={styles.subtitle}>Особисті дані</h2>
                        </div>
                        <button className={styles.editButton}>
                            <Edit2 size={16} /> Редагувати
                        </button>
                    </div>

                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label><User size={16} /> Ім'я</label>
                            <p>{user.first_name || '—'}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <label><User size={16} /> Прізвище</label>
                            <p>{user.last_name || '—'}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <label><Mail size={16} /> Email</label>
                            <p>{user.email}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <label><Phone size={16} /> Телефон</label>
                            <p>{user.phone || 'Не вказано'}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <GoogleLoginPage />
        );
    }
}