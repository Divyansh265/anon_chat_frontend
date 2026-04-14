import { useChat } from '../context/ChatContext';
import styles from './Home.module.css';

export default function Home() {
    const { startSearch } = useChat();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>💬</div>
                <h1 className={styles.title}>AnonChat</h1>
                <p className={styles.subtitle}>
                    Connect instantly with a random stranger. No account. No history. Just chat.
                </p>
                <ul className={styles.features}>
                    <li>🎲 Randomly matched</li>
                    <li>🔒 Fully anonymous</li>
                    <li>⚡ Real-time messaging</li>
                    <li>🔄 Skip anytime</li>
                </ul>
                <button className={styles.startBtn} onClick={startSearch} aria-label="Start chatting">
                    Start Chatting
                </button>
                <p className={styles.disclaimer}>By using this service you agree to be respectful.</p>
            </div>
        </div>
    );
}
