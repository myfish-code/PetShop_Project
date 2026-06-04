'use client'

import styles from "./EditProfileModal.module.css"

import { Edit2 } from "lucide-react"
import { useState } from "react"

export default function EditProfileModal({ user, onUpdate }) {
    
    const [isOpenRefactor, setIsOpenRefactor] = useState(false);

    const [formData, setFormData] = useState({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'first_name' || name === 'last_name') {
            if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]*$/.test(value)) {
                return; 
            }
        }
    
        if (name === 'phone') {
            if (!/^[0-9]*$/.test(value)) {
                return; 
            }
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await onUpdate(formData.first_name, formData.last_name, formData.phone)
        setIsOpenRefactor(false);
    };

    return (
        <>
            <button className={styles.editButton} onClick={() => setIsOpenRefactor(true)}>
                <Edit2 size={16} /> Редагувати
            </button>
            {isOpenRefactor && (
                <div className={styles.overlay} onClick={() => setIsOpenRefactor(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.header}>
                            <h3>Редагування</h3>
                            <span onClick={() => setIsOpenRefactor(false)}>❌</span>
                        </div>
                        <div className={styles.formGroup}>
                            <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Ім'я" />
                            <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Прізвище" />
                            
                            <input name="email" value={formData.email} disabled className={styles.disabledInput} />
                            
                            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон" />
                            
                            <button className={styles.saveButton} onClick={handleSave}>Зберегти зміни</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}