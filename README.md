# 🌐 Arena - The Networking Port for Your ECS ⚔️

> ⚔️ _"Why settle for local battles when you can conquer the world?"_  
> – A visionary developer.

Welcome to **Arena**, the networking port for your ECS that connects entities across the vast realms of the internet using Socket.IO. With **Arena**, you can effortlessly synchronize the state of your game world, allowing for real-time interactions among players.

## 💡 Features

- 🌍 **Real-Time Communication**: Send and receive state updates like a true wizard of the web!
- 🛡️ **Snapshot Management**: Capture the state of your world and restore it whenever you like.
- 🕰️ **Version Control**: Manage your snapshots with versioning, because every hero needs a history!

---

## 📦 Installation

You’ll want to grab **Arena** just like this:

```bash
npm install @medieval/arena
```

💡 **Pro Tip:** Make sure Socket.IO is also installed in your project for the magic to flow:

```bash
npm install socket.io socket.io-client
```

---

## 🚀 Getting Started

Here’s how to set up your **Arena** with Socket.IO:

```typescript
import { World, type Entity } from '@medieval/sword';
import { Arena } from '@medieval/arena';

// Create your world
const world = new World<Entity>();

// Initialize Arena with your world
const arena = new Arena<Entity>(world);

// Take a snapshot of your world
const snapshot = arena.snapshot();

// Restore from a snapshot
arena.restore(snapshot);
```

> 🌌 **Note**: Make sure to handle your snapshots wisely – every world has its secrets!

## 🔄 Networking with Socket.IO

Connect your entities across the internet with ease!

### Server Setup

First, set up your server to handle incoming connections and state updates:

```typescript
import { Server } from 'socket.io';

const io = new Server(3000);

io.on('connection', (socket) => {
  console.log('A player connected');

  socket.on('sendState', (snapshot) => {
    // Broadcast the snapshot to all connected clients
    socket.broadcast.emit('updateState', snapshot);
  });
});
```

### Client Setup

On the client side, connect to the server and handle state updates:

```typescript
import { io } from 'socket.io-client';
import { Arena } from '@medieval/arena';

const socket = io('http://localhost:3000');
const world = new World<Entity>();
const arena = new Arena<Entity>(world);

// Listen for state updates
socket.on('updateState', (snapshot) => {
  arena.restore(snapshot);
});

// Emit your world state to other clients
socket.emit('sendState', arena.snapshot());
```

> 🕸️ _"With great connections come great adventures."_ – A wise coder

---

## 🤝 Contributing

We would love your help to make **Arena** even more **epic**! Whether it’s issues, PRs, or just sharing your wisdom, all contributions are welcome.

> 💌 _"Together, we can build a magical world of code."_ – An optimistic developer

Feel free to contribute at the [GitHub repository](https://github.com/f-irac-odes/arena).

## 📜 License

This project is licensed under the **MIT License**.

---

🎮 Now go ahead and connect your worlds with **Arena**! **Enjoy the magic!** ✨
