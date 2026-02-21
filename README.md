## Super Hopper Mobile 🏃‍♂️💨

**Super Hopper Mobile** is a fast-paced, 3D-perspective arcade runner designed for both mobile and desktop browsers. Navigate through three lanes, dodge incoming obstacles, and jump your way to a high score in this vibrant, retro-inspired adventure.

---

### 🎮 How to Play

The goal is simple: **Stay alive as long as possible.** The speed increases as your score climbs!

* **Move Left/Right:** Switch between the three lanes to avoid blocks.
* **Jump:** Leap over obstacles if you can't switch lanes in time.
* **Game Over:** Hitting an obstacle while on the ground ends your run.

#### Controls

| Action | Mobile (Touch) | Desktop (Keyboard) |
| --- | --- | --- |
| **Move Left** | Left Arrow Button | `Left Arrow` |
| **Move Right** | Right Arrow Button | `Right Arrow` |
| **Jump** | Jump Button | `Spacebar` or `Up Arrow` |

---

### 🚀 Features

* **Responsive Design:** Fully playable on smartphones, tablets, and desktops.
* **3D Perspective:** A CSS-driven `rotateX` effect gives the game world a sense of depth and speed.
* **Dynamic Difficulty:** Obstacles spawn faster and move more quickly as your score increases.
* **Smooth Animations:** CSS keyframes handle the jumping physics and lane transitions for a fluid feel.

---

### 🛠️ Technical Breakdown

The game is built using a clean, "vanilla" web stack:

* **HTML5:** Structured for mobile-first interaction with dedicated touch controls.
* **CSS3:** Utilizes `perspective` and `transform` for the 3D world effect, along with Flexbox for UI layout.
* **JavaScript:**
* **Game Loop:** Uses `requestAnimationFrame` for smooth rendering.
* **Collision Logic:** Real-time coordinate checking between the player and obstacle elements.
* **Touch Handling:** Implements `touchstart` with `e.preventDefault()` to ensure responsive controls on mobile devices without "ghost clicks."



---

### 📦 Installation & Setup

No build tools or servers required!

1. Download the `index.html`, `style.css`, and `script.js` files.
2. Keep them in the same folder.
3. Open `index.html` in any modern web browser.

---

### 📝 License

This project is open-source. Feel free to fork it, add new features (like power-ups or different skins!), and make it your own.

