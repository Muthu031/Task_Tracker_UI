import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Navbar from '../Navbars/Navbar';


const Layout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <Navbar activeRoute="profile" />
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;