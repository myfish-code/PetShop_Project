import styles from "./page.module.css"

import { getUserOrders } from "@/api/shop";
import OrderFilter from "@/components/OrderFilter/OrderFilter";
import OrderCard from "@/components/OrderCard/OrderCard";

import GoogleLoginPage from "@/components/GoogleLoginPage/GoogleLoginPage";
import ErrorWindow from "@/components/ErrorWindow/ErrorWindow";

export default async function OrdersPage({ searchParams }) {
    const params = await searchParams;
    

    const status = params.status || '';

    try {
        const data = await getUserOrders(status);
        const orders = data.orders;

        return (
            <div className={styles.container}>
                <OrderFilter className={styles.filterWrapper} />
                
                <div className={styles.ordersList}>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    ) : (
                        <p className={styles.emptyMessage}>Замовлень із таким статусом немає.</p>
                    )}
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