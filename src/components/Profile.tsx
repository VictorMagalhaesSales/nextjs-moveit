import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/victormagalhaessales.png"/>
            <div>
                <strong>Victor Magalhães Sales</strong>
                <p>
                    <img src="icons/level.svg"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}