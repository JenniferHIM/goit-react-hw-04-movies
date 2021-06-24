import {NavLink, useHistory} from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
    let history = useHistory();

const handleClick = e => {
    e.target.name === 'back' ? history.goBack() : history.goForward();
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <NavLink to="/" exact className={styles.link} activeClassName={styles.activeLink}>
                    Home
                </NavLink>
                <NavLink to="/movies" className={styles.link} activeClassName={styles.activeLink}>
                    Movies
                </NavLink>
            </nav>

            <button
                type="button"
                className={styles.moveButton}
                name="back"
                onClick={handleClick}
            >
                &#129144; Go back
            </button>

            <button
                type="button"
                className={styles.moveButton}
                name="forward"
                onClick={handleClick}
            >
                Go forward &#129146;
            </button>

        </div>
    );
};

export default Navigation;
