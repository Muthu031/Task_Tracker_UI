import React from 'react';
import styles from './Pages.module.css';

const Settings: React.FC = () => {
    return (
        <div className={styles.page}>
            <h1>Settings</h1>
            <div className={styles.content}>
                <p>Manage your application settings here.</p>
            </div>
        </div>
    );
};

export default Settings;