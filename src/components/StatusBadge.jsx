import styles from './StatusBadge.module.css';

const statusConfig = {
    idle: { label: 'Offline', color: 'gray' },
    searching: { label: 'Searching...', color: 'yellow', pulse: true },
    connected: { label: 'Connected', color: 'green' },
    partner_disconnected: { label: 'Partner disconnected', color: 'red' },
    ended: { label: 'Chat ended', color: 'gray' },
};

export default function StatusBadge({ status }) {
    const cfg = statusConfig[status] || statusConfig.idle;
    return (
        <span className={`${styles.badge} ${styles[cfg.color]} ${cfg.pulse ? styles.pulse : ''}`}>
            {cfg.pulse && <span className={styles.dot} />}
            {cfg.label}
        </span>
    );
}
