import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { MenuItem, NavbarProps } from '../../types';

const menuItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', path: '/profile' },
    { id: 'settings', label: 'Settings', path: '/settings' },
    { id: 'upgrade', label: 'Upgrade', path: '/upgrade' }
];

const Navbar: React.FC<NavbarProps> = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    return (
        <nav className={styles.navbar}>
            <ul className={styles.menuList}>
                {menuItems.map((item) => (
                    <li 
                        key={item.id}
                        className={`${styles.menuItem} ${
                            activeItem === item.path ? styles.active : ''
                        }`}
                    >
                        <Link 
                            to={item.path}
                            onClick={() => setActiveItem(item.path)}
                            className={styles.menuLink}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;