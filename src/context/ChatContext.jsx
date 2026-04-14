import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import socket from '../services/socket';

const ChatContext = createContext(null);

const initialState = {
    status: 'idle',
    messages: [],
    partnerName: null,
    error: null,
};

function chatReducer(state, action) {
    switch (action.type) {
        case 'SEARCHING':
            return { ...initialState, status: 'searching' };
        case 'MATCHED':
            return { ...state, status: 'connected', partnerName: action.payload.anonName, messages: [] };
        case 'MESSAGE':
            return { ...state, messages: [...state.messages, action.payload] };
        case 'PARTNER_DISCONNECTED':
            return { ...state, status: 'partner_disconnected' };
        case 'CHAT_ENDED':
            return { ...state, status: 'ended' };
        case 'ERROR':
            return { ...state, error: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export function ChatProvider({ children }) {
    const [state, dispatch] = useReducer(chatReducer, initialState);
    const listenersAttached = useRef(false);

    const attachListeners = useCallback(() => {
        if (listenersAttached.current) return;
        listenersAttached.current = true;

        socket.on('searching', () => {
            dispatch({ type: 'SEARCHING' });
        });
        socket.on('matched', (data) => dispatch({ type: 'MATCHED', payload: data }));
        socket.on('receive_message', (msg) => dispatch({ type: 'MESSAGE', payload: msg }));
        socket.on('partner_disconnected', () => dispatch({ type: 'PARTNER_DISCONNECTED' }));
        socket.on('chat_ended', () => dispatch({ type: 'CHAT_ENDED' }));
        socket.on('error_event', ({ message }) => dispatch({ type: 'ERROR', payload: message }));
        socket.on('disconnect', () => {
            if (state.status === 'connected') {
                dispatch({ type: 'PARTNER_DISCONNECTED' });
            }
        });
    }, []);

    useEffect(() => {
        return () => { listenersAttached.current = false; };
    }, []);

    const startSearch = useCallback(() => {
        if (!socket.connected) {
            socket.once('connect', () => {
                attachListeners();
                socket.emit('start_search');
            });
            socket.connect();
        } else {
            attachListeners();
            socket.emit('start_search');
        }
        dispatch({ type: 'SEARCHING' });
    }, [attachListeners]);

    const sendMessage = useCallback((content) => {
        if (!content.trim()) return;
        socket.emit('send_message', { content });
    }, []);

    const skipChat = useCallback(() => {
        socket.emit('skip_chat');
        dispatch({ type: 'SEARCHING' });
    }, []);

    const endChat = useCallback(() => {
        socket.emit('skip_chat');
        socket.disconnect();
        listenersAttached.current = false;
        dispatch({ type: 'RESET' });
    }, []);

    return (
        <ChatContext.Provider value={{ state, startSearch, sendMessage, skipChat, endChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error('useChat must be used within ChatProvider');
    return ctx;
}
