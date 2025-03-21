import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { MenuItem } from '../../types';

const menuItems: MenuItem[] = [
    { 
        id: 'profile', 
        label: 'Profile', 
        path: '/profile',
        icon: '👤'
    },
    { 
        id: 'settings', 
        label: 'Settings', 
        path: '/settings',
        icon: '⚙️'
    },
    { 
        id: 'upgrade', 
        label: 'Upgrade', 
        path: '/upgrade',
        icon: '⭐'
    }
];

const SideMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
    isOpen, 
    onClose 
}) => {
    const location = useLocation();

    return (
        <>
            <div 
                className={`${styles.overlay} ${isOpen ? styles.visible : ''}`} 
                onClick={onClose}
            />
            <div className={`${styles.sideMenu} ${isOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>
                <div className={styles.menuContent}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`${styles.menuItem} ${
                                location.pathname === item.path ? styles.active : ''
                            }`}
                            onClick={onClose}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideMenu;