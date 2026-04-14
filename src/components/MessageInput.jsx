import { useMessageInput } from '../hooks/useMessageInput';
import styles from './MessageInput.module.css';

export default function MessageInput({ onSend, disabled }) {
    const { value, handleChange, handleSubmit, handleKeyDown, maxLength } = useMessageInput(onSend);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <textarea
                className={styles.input}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (Enter to send)"
                disabled={disabled}
                rows={1}
                aria-label="Message input"
            />
            <span className={styles.counter}>{value.length}/{maxLength}</span>
            <button
                type="submit"
                className={styles.sendBtn}
                disabled={disabled || !value.trim()}
                aria-label="Send message"
            >
                Send
            </button>
        </form>
    );
}
