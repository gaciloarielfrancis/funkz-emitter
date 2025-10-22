# funkz-emitter
Allowing parts of your application to communicate asynchronously without being tightly coupled.
A lightweight and dependency-free **Event Emitter** written entirely in **TypeScript**.  
It provides a simple, type-safe way to **emit**, **listen**, and **unsubscribe** from custom events — perfect for **game systems**, **frontend apps**, and **ECS architectures**.

funkz-emitter is a lightweight and framework-agnostic event management library written in TypeScript. It is designed to work seamlessly across **all TypeScript-based frameworks and environments**, including **React, Angular, Vue, Node.js**, and **game engines** or **custom applications** that rely on event-driven architectures.

Unlike framework-specific solutions, funkz-emitter does not depend on any external libraries or runtime environments. Its minimal and strongly typed design allows developers to easily integrate it into any TypeScript project—whether it runs in the **browser**, **server**, or **embedded environment**—without additional setup or compatibility issues.

Because it’s built purely in TypeScript, funkz-emitter takes full advantage of **type inference**, **generics**, and **intellisense support**, ensuring a clean and predictable developer experience. It helps you implement clear communication between components, modules, or systems using the familiar pattern of **emitters and listeners**, making your codebase more modular and maintainable.

In short, funkz-emitter serves as a **universal event communication layer** that simplifies event handling for any TypeScript-powered application, regardless of its framework or runtime.

---

## Features

- ⚡ Built **100% in TypeScript** — no Node.js `events` module required  
- ✅ Strongly typed — event names and payloads are type-checked  
- 🧠 Follows the **Observer / Pub-Sub** design pattern  
- 💡 Minimal, clean, and framework-agnostic  
- 🕹 Perfect for game engine and ECS logic

---

## Installation

```bash
npm i funkz-emitter
```

---

## Usage

```ts
import EventEmitter from "funkz-emitter";

// Initialize the emitter
const emitter = new EventEmitter();

// Example data type
interface IntervalData {
    message: string;
    duration: number;
}

// Listening for an event
emitter.on<IntervalData>("interval", (data) => {
    console.log(`[on] Interval event triggered:`, data.message, "in", data.duration, "ms");
});

// Listening once (auto removed after first trigger)
emitter.once<IntervalData>("interval", (data) => {
    console.log(`[once] This will only appear once:`, data.message);
});

setInterval(() => {
    // Emitting an event with data
    emitter.emit<IntervalData>("interval", {
        message: "Operation took too long.",
        duration: 3000,
    });
}, 3000);

// Attaching multiple listeners with identifiers
emitter.on("update", () => console.log("[A] update received"), "A");
emitter.on("update", () => console.log("[B] update received"), "B");

// Emitting the event triggers both listeners
emitter.emit("update");

// Emitting again triggers only listener B
emitter.emit("update", null, "B");

// Remove only listener with identifier "A"
emitter.off("update", "A");

// Emitting with custom type data
emitter.on<number>("progress", (data) => {
    console.log("Progress:", data, "%");
});
emitter.emit<number>("progress", 75);

```
### How It Works
- The emitter acts as a message hub.
- You can register listeners for specific event names (on, once).
- Later, when you emit that event name (emit), all matching listeners get called.
- You can remove listeners when they’re no longer needed (off).

## Using Global Emit — No Instance Required
This example shows how to emit events globally without the need to declare or reference an emitter variable. Perfect for shared, application-wide event handling.

```ts
// main.ts

import { on, once } from "funkz-emitter";

// Persistent listener
on<string>("user:login", (username) => {
    console.log(`[Main] User logged in: ${username}`);
});

// One-time listener
once<string>("system:init", (version) => {
    console.log(`[Main] System initialized. Version: ${version}`);
});

```

```ts
// pageA.ts

import { emit } from "funkz-emitter";

function loginUser() {
    emit("user:login", "Funkz");
}

function initializeSystem() {
    emit("system:init", "1.0.0");
}

// Trigger global events
loginUser();
initializeSystem();

```

```ts
// pageB.ts

import { on, off } from "funkz-emitter";

// Listen globally for user logins
on<string>("user:login", (username) => {
    console.log(`[PageB] Detected login: ${username}`);
});

// Optionally remove listener later
setTimeout(() => {
    off("user:login");
    console.log("[PageB] Stopped listening for user:login");
}, 5000);

```
### How It Works
- All pages import from "funkz-emitter", which uses a shared singleton emitter internally.
- Any call to emit() in one page automatically triggers listeners in another.
- Works even when modules are dynamically loaded — no need to pass instances around.