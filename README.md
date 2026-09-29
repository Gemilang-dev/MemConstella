# MemConstella

A web-based educational game where students map technical or conceptual topics to interactive star constellations. Originally designed to teach CPU Registers (PC, IR, MAR, MDR, ACC), this application is now a fully customizable platform! Educators can use the built-in CPU Register materials or use the **Game Builder** to create and save their own learning packages for any subject.

## Key Features

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
    *   An interactive SVG constellation animation plays out the sequence of steps visually.
    *   Teachers can set a custom **Video Password** in the Teacher Dashboard to securely gate access.
    *   Students must enter the correct password to unlock and show the video.
*   **Teacher Dashboard:** Real-time monitoring of all student connections, attempts, and room completion status.

## Getting Started

**Prerequisites:** Node.js (v16+)

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the app locally:**
    ```bash
    npm run dev
    ```
3.  Open `http://localhost:3000` in your browser.

## How to Create Custom Materials

1.  On the Home screen, click **Create Custom**.
2.  **Step 1:** Name your material.
3.  **Step 2:** Add all the core items/concepts your students need to memorize.
4.  **Step 3:** Configure the 4 rooms. For each room, provide a story scenario, question text, hint, and select the correct target answer from your list of concepts. (You can also upload a pre-filled JSON file for that room here).
5.  Click **Save Package**.
6.  The new package will appear in your **Play Games** library. Click Play to start the session with your custom data!

## Tech Stack

*   React 18
*   Vite
*   Tailwind CSS
*   Lucide React (Icons)




