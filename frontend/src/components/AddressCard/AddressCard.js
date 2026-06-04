'use client';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import styles from './AddressCard.module.css';

export default function AddressCard({ address, updateAddress }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(address);

    const handleSave = async () => {
        await updateAddress(address.id, formData);
        setIsOpen(false);
    };

    return (
        <div className={styles.card}>
            <p><strong>{formData.recipient_name}</strong></p>
            <p>{formData.city}, {formData.street}, д.{formData.house}</p>
            
            <button className={styles.editButton} onClick={() => setIsOpen(true)}>
                <Edit2 size={16} /> Редагувати
            </button>

            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.header}>
                            <h3>Редагування адреси</h3>
                            <span onClick={() => setIsOpen(false)}>❌</span>
                        </div>
                        
                        <div className={styles.formGroup}>
                            <input value={formData.recipient_name} onChange={e => setFormData({...formData, recipient_name: e.target.value})} placeholder="Отримувач" />
                            <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="Місто" />
                            <input value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} placeholder="Вулиця" />
                            <input value={formData.house} onChange={e => setFormData({...formData, house: e.target.value})} placeholder="Будинок" />
                            
                            <button className={styles.saveButton} onClick={handleSave}>Зберегти зміни</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}