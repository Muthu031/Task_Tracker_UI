import React, { useState } from 'react';
import styles from './Navbar.module.css';
import SideMenu from '../Sidebar/SideMenu';
import { Image } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    {imageError ? (
                        <div className="flex items-center text-gray-400">
                            <Image className="w-8 h-8" />
                            <span>Logo</span>
                        </div>
                    ) : (
                        <img 
                            src="/src/assets/logo.png" 
                            alt="Company Logo"
                            className="h-10 w-auto object-contain"
                            onError={() => setImageError(true)}
                        />
                    )}
                </div>
                <button 
                    className={styles.menuButton}
                    onClick={() => setIsSideMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <div className={styles.hamburger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </nav>
            <SideMenu 
                isOpen={isSideMenuOpen} 
                onClose={() => setIsSideMenuOpen(false)} 
            />
        </>
    );
};

export default Navbar;