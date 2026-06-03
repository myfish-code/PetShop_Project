'use client'; 

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { loginWithGoogle } from '@/api/auth';
import styles from './GoogleLoginPage.module.css';

export default function GoogleLoginPage() {
    const router = useRouter();

    const handleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle(credentialResponse.credential);
            router.refresh();
        } catch (error) {
            alert("Помилка входу.");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.title}>Увійдіть до облікового запису</h3>
                <p className={styles.description}>
                    Авторизуйтеся через Google, щоб отримати доступ до всіх можливостей сервісу.
                </p>

                <div className={styles.actions}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => {}}
                        theme="outline"
                        size="large"
                        width="100%"
                    />
                </div>
            </div>
        </div>
    );
}