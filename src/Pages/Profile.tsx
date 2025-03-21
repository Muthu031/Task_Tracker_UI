import React from 'react';
import styles from './Pages.module.css';

const Profile: React.FC = () => {
    return (
        <div className={styles.page}>
            <h1>Profile</h1>
            <div className={styles.content}>
                <p>Welcome to your profile page!</p>
            </div>
        </div>
    );
};

export default Profile;