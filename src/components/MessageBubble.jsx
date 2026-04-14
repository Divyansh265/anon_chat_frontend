import { formatTime } from '../utils/formatTime';
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message }) {
    const isSelf = message.isSelf;
    return (
        <div className={`${styles.wrapper} ${isSelf ? styles.self : styles.partner}`}>
            <div className={styles.bubble}>
                <p className={styles.text}>{message.content}</p>
                <span className={styles.time}>{formatTime(message.timestamp)}</span>
            </div>
        </div>
    );
}
