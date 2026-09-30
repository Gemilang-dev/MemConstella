# MemConstella 🌌

A web-based educational game where students map technical or conceptual topics to interactive star constellations. Originally designed to teach CPU Registers (PC, IR, MAR, MDR, ACC), this application is now a fully customizable platform! Educators can use the built-in CPU Register materials or use the **Game Builder** to create and save their own learning packages for any subject.

![Halaman Utama MemConstella]([Tolong screenshot halaman utama/home screen aplikasi yang menampilkan 3 pilihan mode: Register CPU, Create Custom, Play Games])

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

## 🎮 Cara Menggunakan Aplikasi (User Guide)

Aplikasi ini memiliki 3 mode utama. Berikut adalah panduan cara menggunakannya:

### 1. Bermain Mode Default (Register CPU)
Mode ini sudah memiliki soal bawaan mengenai arsitektur CPU dan Register.
* Di halaman utama, pilih **Register CPU**.
* Masukkan nama Anda dan masuk ke dalam permainan.
* Jawab setiap pertanyaan di setiap ruangan (Room) dengan memilih jawaban yang tepat berdasarkan cerita/petunjuk.

![Gameplay Register CPU]([Tolong screenshot tampilan saat sedang bermain di dalam salah satu Room, memperlihatkan pertanyaan dan pilihan jawaban])

### 2. Membuat Materi Sendiri (Create Custom)
Anda bisa membuat soal kustom untuk pelajaran apa saja (Biologi, Sejarah, Bahasa, dll).
1. Pada halaman utama, klik **Create Custom**.
2. **Step 1:** Masukkan nama materi/paket pembelajaran Anda.
3. **Step 2:** Tambahkan semua daftar item/konsep utama yang perlu dihafal oleh siswa (contoh: Kloroplas, Mitokondria, dll).
4. **Step 3:** Konfigurasi 4 ruangan (Rooms). Untuk setiap ruangan:
   * Masukkan skenario cerita.
   * Masukkan teks pertanyaan dan petunjuk (hint).
   * Pilih target jawaban yang benar dari daftar konsep yang sudah Anda buat di Step 2.
   * *(Opsional)* Anda juga bisa mengunggah file JSON untuk mengisi data ruangan secara otomatis.
5. Klik **Save Package**.

![Form Create Custom]([Tolong screenshot tampilan halaman Game Builder / saat sedang mengisi form pembuatan soal (Step 2 atau Step 3)])

### 3. Memainkan Materi Buatan Sendiri (Play Games)
Setelah Anda menyimpan materi di tahap sebelumnya, materi tersebut akan tersimpan di Library browser Anda.
* Pada halaman utama, klik **Play Games**.
* Pilih paket game yang sudah Anda buat dari daftar Library.
* Klik **Play** untuk mulai bermain menggunakan soal-soal Anda sendiri.

![Library Play Games]([Tolong screenshot halaman Library yang menampilkan daftar paket game custom yang sudah dibuat])

---

## 👨‍🏫 Teacher Dashboard & Video Mode

Aplikasi ini dilengkapi dengan fitur pemantauan untuk guru dan animasi rasi bintang untuk siswa.

**Bagi Guru:**
* Guru dapat mengakses **Teacher Dashboard** untuk memantau progress siswa yang sedang bermain secara real-time.
* Guru dapat mengatur **Video Password** yang nantinya harus dimasukkan oleh siswa jika mereka ingin melihat Video Constellation.

![Teacher Dashboard]([Tolong screenshot tampilan Teacher Dashboard yang memperlihatkan list siswa dan pengaturan password video])

**Bagi Siswa:**
* Siswa dapat mengakses **Global Observation Mode** (Video Mode).
* Siswa akan diminta memasukkan password yang diberikan oleh guru.
* Setelah berhasil, siswa akan disuguhkan animasi pergerakan rasi bintang yang dimainkan secara otomatis (loop).

![Video Observation Mode]([Tolong screenshot tampilan saat Video Observation Mode (animasi rasi bintang) sedang berputar])

---

## 👩‍🏫 Cara Bermain di Kelas Bersama Siswa

Saat mengimplementasikan permainan ini di dalam kelas, ada **2 pilihan skenario** yang bisa Anda (Guru) gunakan untuk menayangkan animasi *Video Constellation* (Rasi Bintang) agar selaras dengan permainan siswa:

### Opsi 1: Video di Layar Terpisah (Proyektor / Layar Utama Kelas)
Opsi ini sangat ideal untuk permainan interaktif terpusat.
1. **Persiapan Guru:** Guru membuka game di komputer yang tersambung ke proyektor di depan kelas. Guru masuk ke **Global Observation Mode** (Video Mode), memasukkan password, dan memutar animasinya secara *fullscreen* di proyektor. (Guru juga dapat mendownload videonya terlebih dahulu menggunakan fitur *Download Video*).
2. **Aktivitas Siswa:** Siswa membuka aplikasi di perangkat mereka masing-masing (laptop/tablet/HP) dan langsung masuk ke permainan (tidak perlu masuk ke menu Video Mode).
3. **Cara Bermain:** Siswa berdiskusi atau secara individu menjawab soal-soal di layar perangkat mereka **dengan berpatokan pada animasi rasi bintang yang terus berputar di proyektor depan kelas**. 

### Opsi 2: Video di Layar yang Sama (Perangkat Individu Siswa)
Opsi ini cocok jika siswa belajar secara mandiri, jarak jauh (online), atau tidak tersedia fasilitas proyektor di kelas.
1. **Persiapan Guru:** Guru membagikan **Video Password** kepada seluruh siswa.
2. **Aktivitas Siswa:** Siswa membuka aplikasi di perangkat mereka masing-masing.
3. **Cara Bermain:** 
   * Siswa membuka menu **Global Observation Mode**, memasukkan password, dan melihat animasinya langsung di layar mereka.
   * Siswa dapat menekan tombol **Download Video** untuk menyimpan video tersebut. 
   * Setelah video tersimpan, siswa memutar video tersebut dan menyandingkannya (*split-screen*) dengan browser utama yang membuka halaman soal permainan. Siswa kini dapat menganalisa video di satu sisi layar sambil menjawab pertanyaan di sisi layar lainnya.

---

## 🛠️ Tech Stack

*   React 18
*   Vite
*   Tailwind CSS
*   Lucide React (Icons)
