import { useChat } from '../context/ChatContext';
import styles from './Home.module.css';

export default function Home() {
    const { startSearch } = useChat();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.brand}>
                    <span className={styles.brandIcon}>S</span>
                    <span className={styles.brandName}>StrangerTalk</span>
                </div>

                <h1 className={styles.headline}>Talk to someone new.</h1>
                <p className={styles.sub}>
                    Anonymous one-on-one conversations with real people.
                </p>

                <div className={styles.divider} />

                <ul className={styles.features}>
                    <li>
                        <span className={styles.dot} />
                        Randomly paired with a stranger
                    </li>
                    <li>
                        <span className={styles.dot} />
                        No account or personal info needed
                    </li>
                    <li>
                        <span className={styles.dot} />
                        Skip and find someone new anytime
                    </li>
                    <li>
                        <span className={styles.dot} />
                        Messages are never stored
                    </li>
                </ul>

                <button className={styles.startBtn} onClick={startSearch}>
                    Start a Conversation
                </button>

                <p className={styles.note}>
                    By continuing you agree to keep conversations respectful.
                </p>
            </div>
        </div>
    );
}
