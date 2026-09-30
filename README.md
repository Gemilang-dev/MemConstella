*Read this in other languages: [English](README.md), [Bahasa Indonesia](README-id.md).*

# MemConstella 🌌

A web-based educational game where students map technical or conceptual topics to interactive star constellations. Originally designed to teach CPU Registers (PC, IR, MAR, MDR, ACC), this application is now a fully customizable platform! Educators can use the built-in CPU Register materials or use the **Game Builder** to create and save their own learning packages for any subject.

![MemConstella Home Screen](./assets/home.jpg)

## ✨ Key Features

*   **3 Play Modes on Startup:**
    *   **Register CPU:** Launch the default IT architecture materials.
    *   **Create Custom:** Use the built-in Game Builder to create a new learning package from scratch.
    *   **Play Games:** Access and launch your previously saved custom game packages from the Library.
*   **Built-in Custom Game Builder:** 
    *   Create custom materials effortlessly using the step-by-step UI. 
    *   Define your own "memorization items" (e.g., Biology terms, Historical figures, Language vocabulary).
    *   Manually configure rooms/questions using a form, or upload a JSON file for specific rooms.
    *   Save packages locally to the browser for quick access in future sessions.
*   **Video Observation Mode:** 
    *   An interactive SVG constellation animation plays out the sequence of steps visually and loops seamlessly!
    *   Includes a **Download Video** feature that automatically records and saves the video in 1 minute.
    *   Teachers can set a custom **Video Password** in the Teacher Dashboard to securely gate access.
    *   Students must enter the correct password to unlock and view the video animation.
*   **Teacher Dashboard:** Real-time monitoring of all student connections, attempts, and room completion status.

---

## 🚀 Getting Started

**Prerequisites:** Node.js (v16+).

1.  **Clone / Download Repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the app locally:**
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:3000` in your browser.

---

## 🎮 How to Use the Application (User Guide)

This application has 3 main modes. Here is a guide on how to use them:

### 1. Playing Default Mode (Register CPU)
This mode comes with built-in questions about CPU architecture and Registers.
* On the main page, select **Register CPU**.
* Enter your name and enter the game.
* Answer each question in each Room by choosing the right answer based on the story/clue.

![Register CPU Gameplay](./assets/gameplay.jpg)

### 2. Creating Custom Materials (Create Custom)
You can create custom questions for any subject (Biology, History, Languages, etc).
1. On the main page, click **Create Custom**.
2. **Step 1:** Enter the name of your material/learning package.
3. **Step 2:** Add all the core items/concepts that students need to memorize (e.g. Chloroplast, Mitochondria, etc).
4. **Step 3:** Configure the 4 Rooms. For each room:
   * Enter a story scenario.
   * Enter the question text and hint.
   * Select the correct target answer from the list of concepts you made in Step 2.
   * *(Optional)* You can also upload a JSON file to automatically fill in the room data.
5. Click **Save Package**.

![Create Custom Form](./assets/builder.jpg)

### 3. Playing Custom Materials (Play Games)
After you save the material in the previous step, it will be saved in your browser's Library.
* On the main page, click **Play Games**.
* Select the game package you have created from the Library list.
* Click **Play** to start playing using your own questions.

![Play Games Library](./assets/library.jpg)

---

## 👨‍🏫 Teacher Dashboard & Video Mode

This application is equipped with monitoring features for teachers and constellation animations for students.

**For Teachers:**
* Teachers can access the **Teacher Dashboard** to monitor the progress of students who are currently playing in real-time.
* Teachers can set a **Video Password** which students must later enter if they want to see the Video Constellation.

![Teacher Dashboard](./assets/dashboard.jpg)

**For Students:**
* Students can access the **Global Observation Mode** (Video Mode).
* Students will be asked to enter the password provided by the teacher.
* After successfully entering it, students will be presented with a constellation movement animation that plays automatically (loop).

![Video Observation Mode](./assets/video.jpg)

---

## 👩‍🏫 How to Play in Class with Students

When implementing this game in the classroom, there are **2 scenario options** that you (the Teacher) can use to display the *Video Constellation* animation so that it aligns with the students' game:

### Option 1: Video on a Separate Screen (Projector / Main Class Screen)
This option is highly ideal for centralized interactive play.
1. **Teacher Preparation:** The teacher opens the game on the computer connected to the projector at the front of the class. The teacher enters the **Global Observation Mode** (Video Mode), enters the password, and plays the animation *fullscreen* on the projector. (The teacher can also download the video beforehand using the *Download Video* feature).
2. **Student Activity:** Students open the application on their respective devices (laptop/tablet/smartphone) and go straight into the game (no need to enter the Video Mode menu).
3. **How to Play:** Students discuss or individually answer the questions on their device screens **by using the constellation animation that continuously plays on the front projector as a guide**.

### Option 2: Video on the Same Screen (Student's Individual Device)
This option is suitable if students are learning independently, remotely (online), or if projector facilities are unavailable in class.
1. **Teacher Preparation:** The teacher shares the **Video Password** with all students.
2. **Student Activity:** Students open the application on their respective devices.
3. **How to Play:**
   * Students open the **Global Observation Mode** menu, enter the password, and view the animation directly on their screen.
   * Students can press the **Download Video** button to save the video.
   * Once the video is saved, students play the video and place it side-by-side (*split-screen*) with the main browser that has the game questions page open. Students can now analyze the video on one side of the screen while answering questions on the other side.

---

## 🛠️ Tech Stack

*   React 18
*   Vite
*   Tailwind CSS
*   Lucide React (Icons)
