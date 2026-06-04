'use client'; // Вот эта строчка делает его клиентским

export default function BackButton({ className }) {
    return (
        <button onClick={() => window.history.back()} className={className}>
            ← Назад
        </button>
    );
}