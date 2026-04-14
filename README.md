# StrangerTalk — Frontend

This is the frontend for **StrangerTalk**, a simple anonymous chat application built as a single-page React app. It connects to the backend using Socket.io and provides a minimal, real-time chat experience.

The UI is intentionally kept clean and lightweight, with all state managed centrally to keep components simple and predictable.

---

## Tech Stack

* React 18
* Vite
* Socket.io Client
* CSS Modules

---

## High-Level Architecture

The frontend is built around a single global context (`ChatProvider`) that manages socket state and all chat-related logic.

* **ChatProvider** handles socket connection, events, and state updates
* **App.jsx** decides which screen to render based on current state
* UI components are kept simple and only consume state from context

```
ChatProvider  (socket state + all dispatch logic)
  └── App.jsx  (shows Home or Chat based on status)
        ├── Home.jsx        idle state
        └── Chat.jsx        searching / connected / ended
              ├── StatusBadge
              ├── MessageBubble (× n)
              └── MessageInput
```

---

## State Management

State is managed using a `useReducer` inside `ChatContext`, which keeps updates predictable and easy to debug.

```js
{
  status: 'idle' | 'searching' | 'connected' | 'partner_disconnected' | 'ended',
  messages: [],
  partnerName: null,
  error: null
}
```

* Each Socket.io event triggers a dispatch
* Components only read state and render UI accordingly
* No prop drilling, everything flows through context

---

## Chat Flow

The chat lifecycle is designed to feel smooth and real-time:

1. User clicks **"Start a Conversation"**

   * Socket connects
   * `start_search` event is emitted

2. Status changes to `searching`

   * A loading spinner is displayed

3. Server finds a match

   * `matched` event received
   * Status changes to `connected`

4. Users exchange messages in real time

5. If the partner disconnects

   * `partner_disconnected` is triggered
   * User gets an option to reconnect

6. If the user skips the chat

   * They are automatically re-added to the queue

7. If the user leaves

   * Socket disconnects
   * App returns to the Home screen

> Note: The socket connection is created only when the user starts a search, not on initial page load.

---

## Setup Instructions

Install dependencies:

```bash
npm install
npm run dev
```

To test locally, open two browser tabs at:

```
http://localhost:5173
```

---

## Environment Variables

```
VITE_SOCKET_URL=http://localhost:4000
```

For production, update this value to point to your deployed backend.

---

## Deployment (Vercel)

Steps to deploy:

1. Connect your repository to Vercel
2. Set root directory to `frontend/`
3. Configure:

   * Build command: `npm run build`
   * Output directory: `dist`
4. Add `VITE_SOCKET_URL` in environment variables
5. Deploy the project

> Note: Vite embeds environment variables at build time, so make sure they are set before deploying.

---

## Known Limitations & Trade-offs

* **No message history**

  * Refreshing during a chat will reset the conversation
  * Messages exist in the backend but are not fetched again

* **Same browser tab limitation**

  * Multiple tabs may share the same socket connection
  * Use incognito mode or different browsers for testing multiple users

* **No typing indicators**

  * Not implemented, but can be added easily using additional socket events

* **Mobile keyboard issues**

  * On some devices, the keyboard may overlap the input field
  * Can be improved using a `visualViewport` listener

* **Cold start delay**

  * Backend hosted on Render free tier may take ~30 seconds to wake up after inactivity

---

## Final Notes

The frontend is designed with simplicity and clarity in mind. By centralizing all logic inside a single context, the app remains easy to maintain and extend. Future improvements could include better mobile support, typing indicators, and optional chat history retrieval.
