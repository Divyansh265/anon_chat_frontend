import { useEffect } from 'react';
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
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.appName}>AnonChat</span>
                    {partnerName && isConnected && (
                        <span className={styles.partnerName}>with {partnerName}</span>
                    )}
                </div>
                <div className={styles.headerRight}>
                    <StatusBadge status={status} />
                    {isConnected && (
                        <button className={styles.skipBtn} onClick={skipChat} aria-label="Skip to next person">
                            Skip
                        </button>
                    )}
                    <button className={styles.endBtn} onClick={endChat} aria-label="End chat and go home">
                        End
                    </button>
                </div>
            </header>

            {/* Message area */}
            <main className={styles.messages} aria-live="polite" aria-label="Chat messages">
                {isSearching && (
                    <div className={styles.centerMsg}>
                        <div className={styles.spinner} aria-hidden="true" />
                        <p>Looking for someone to chat with...</p>
                    </div>
                )}

                {isDisconnected && (
                    <div className={styles.centerMsg}>
                        <p className={styles.disconnectMsg}>
                            {status === 'partner_disconnected'
                                ? 'Your partner disconnected.'
                                : 'Chat ended.'}
                        </p>
                        <button className={styles.newChatBtn} onClick={skipChat}>
                            Find New Partner
                        </button>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <MessageBubble key={i} message={msg} />
                ))}

                {error && <p className={styles.errorMsg}>{error}</p>}

                <div ref={bottomRef} />
            </main>

            {/* Input */}
            <MessageInput onSend={sendMessage} disabled={!isConnected} />
        </div>
    );
}
