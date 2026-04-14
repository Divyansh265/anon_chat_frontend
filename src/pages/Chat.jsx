import { useChat } from '../context/ChatContext';
import { useAutoScroll } from '../hooks/useAutoScroll';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import StatusBadge from '../components/StatusBadge';
import styles from './Chat.module.css';

export default function Chat() {
    const { state, sendMessage, skipChat, endChat } = useChat();
    const { status, messages, partnerName, error } = state;
    const bottomRef = useAutoScroll(messages);

    const isConnected = status === 'connected';
    const isSearching = status === 'searching';
    const isDisconnected = status === 'partner_disconnected' || status === 'ended';

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.brand}>
                        <span className={styles.brandIcon}>S</span>
                        <span className={styles.brandName}>StrangerTalk</span>
                    </div>
                    {partnerName && isConnected && (
                        <span className={styles.partnerName}>— {partnerName}</span>
                    )}
                </div>
                <div className={styles.headerRight}>
                    <StatusBadge status={status} />
                    {isConnected && (
                        <button className={styles.skipBtn} onClick={skipChat}>
                            Next
                        </button>
                    )}
                    <button className={styles.endBtn} onClick={endChat}>
                        Leave
                    </button>
                </div>
            </header>

            <main className={styles.messages} aria-live="polite">
                {isSearching && (
                    <div className={styles.centerMsg}>
                        <div className={styles.spinner} />
                        <p>Finding someone to talk to...</p>
                        <span className={styles.hint}>This usually takes a few seconds</span>
                    </div>
                )}

                {isDisconnected && (
                    <div className={styles.centerMsg}>
                        <p className={styles.disconnectMsg}>
                            {status === 'partner_disconnected'
                                ? 'The other person left the chat.'
                                : 'Conversation ended.'}
                        </p>
                        <button className={styles.newChatBtn} onClick={skipChat}>
                            Find Someone New
                        </button>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <MessageBubble key={i} message={msg} />
                ))}

                {error && <p className={styles.errorMsg}>{error}</p>}
                <div ref={bottomRef} />
            </main>

            <MessageInput onSend={sendMessage} disabled={!isConnected} />
        </div>
    );
}
