import { getUserAddresses, updateUserAddress, addUserAddress } from '@/api/users'
import AddressCard from '@/components/AddressCard/AddressCard';
import styles from './page.module.css';
import GoogleLoginPage from '@/components/GoogleLoginPage/GoogleLoginPage';
import ErrorWindow from '@/components/ErrorWindow/ErrorWindow';
import { revalidatePath } from 'next/cache';

export default async function AddressesPage() {
    async function updateAddressAction(id, data) {
        'use server';
        await updateUserAddress(id, data.recipient_name, data.city, data.street, data.house);
        revalidatePath('/profile/addresses');
    }
    try {
        const data = await getUserAddresses();
        const addresses = data.addresses
        return (
            <div className={styles.container}>
                <h1>Мої адреси</h1>
                <div className={styles.list}>
                    {addresses.map(addr => (
                        <AddressCard key={addr.id} address={addr} updateAddress={updateAddressAction}/>
                    ))}
                </div>
            </div>
        );
    } catch (error){
        if (error.message === "TOKEN_EXPIRED") {
            return <GoogleLoginPage />
        } else {
            return <ErrorWindow error={error}/>
        }
    }

}