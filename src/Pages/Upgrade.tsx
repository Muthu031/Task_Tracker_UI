import React from 'react';
import styles from './Pages.module.css'; 


const Upgrade: React.FC = () => {
    return (
        <div className={styles.page}>
            <h1>Upgrade</h1>
            <div className={styles.content}>
                <p>Explore upgrade options for your account.</p>
            </div>
        </div>
    );
};

export default Upgrade;