'use server'
import { cookies } from 'next/headers';
import { refreshToken } from '@/api/auth';

export async function refreshAndRetry() {
    const refresh = (await cookies()).get('refresh')?.value;
    if (!refresh) throw new Error("TOKEN_EXPIRED");

    const tokenData = await refreshToken(refresh);
    
    // Здесь запись сработает, потому что файл с 'use server'
    (await cookies()).set('access', tokenData.access, { 
        maxAge: 60 * 60 * 24 * 7, 
        path: '/',
        httpOnly: true
    });
    
    return tokenData.access;
}