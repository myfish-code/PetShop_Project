import styles from "./page.module.css"

import { revalidatePath } from 'next/cache';

import { User, Mail, Phone } from 'lucide-react';

import { getUserProfile, updateUserProfile } from '@/api/users';

import GoogleLoginPage from "@/components/GoogleLoginPage/GoogleLoginPage";
import ErrorWindow from "@/components/ErrorWindow/ErrorWindow";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";

export default async function ProfilePage() {

    async function updateProfileAction(first_name, last_name, phone) {
        'use server'; 
        await updateUserProfile(first_name, last_name, phone);
        revalidatePath('/profile');
    }
    
    try {
        let data = await getUserProfile();
        let user = data.user
        const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U';
        
        return (
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.headerRow}>
                        <div className={styles.userHead}>
                            {user.avatar_url ? (
                                <img src={user.avatar_url} alt="Avatar" className={styles.avatar} referrerPolicy="no-referrer"/>
                            ) : (
                                <div className={styles.avatarPlaceholder}>{initials}</div>
                            )}
                            <h2 className={styles.subtitle}>Особисті дані</h2>
                        </div>
                        
                        <EditProfileModal user={user} onUpdate={updateProfileAction}/>
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
        if (error.message === "TOKEN_EXPIRED") {
            return <GoogleLoginPage />
        } else {
            return <ErrorWindow error={error}/>
        }
    }
}