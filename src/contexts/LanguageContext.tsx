import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'id' | 'en';

export const LANGUAGE_STORAGE_KEY = 'memconstella_language';

export const translations = {
  id: {
    common: {
      appName: 'MemConstella',
      appSubtitle: 'Game Edukasi Rasi Bintang Interaktif',
      version: 'v2.1',
      back: 'Kembali',
      cancel: 'Batal',
      save: 'Simpan',
      delete: 'Hapus',
      close: 'Tutup',
      warning: 'Peringatan',
      language: 'Bahasa',
      indonesian: 'Indonesia',
      english: 'English',
      switchLanguage: 'Ganti Bahasa'
    },
    nav: {
      home: 'Beranda',
      howToPlay: 'Cara Bermain',
      howToSetup: 'Cara Menyiapkan',
      about: 'Tentang',
      roomA: 'Room A',
      roomB: 'Room B',
      roomC: 'Room C',
      roomD: 'Room D',
      dashboard: 'Dashboard Guru',
      stationLocked: 'Stasiun Terkunci: Pilih & Kunci Jawaban untuk Melanjutkan',
      stationLockedShort: 'Terkunci',
      muteSound: 'Bisukan Suara',
      unmuteSound: 'Aktifkan Suara'
    },
    home: {
      headerSubtitle: 'Game Edukasi Rasi Bintang & Arsitektur Komputer',
      card1Title: 'Register CPU',
      card1Desc: 'Mulai Permainan dengan Materi CPU Bawaan',
      card2Title: 'Create Custom',
      card2Desc: 'Susun Paket Materi & Soal Pembelajaran Sendiri',
      card3Title: 'Play Games',
      card3Desc: 'Mulai Petualangan Menghafal dari Paket Kustom',
      promptText: 'Pilih salah satu menu di atas untuk memulai perjalanan belajar kosmik Anda!'
    },
    howToPlay: {
      title: 'Cara Bermain di Kelas Bersama Siswa',
      subtitle: 'Terdapat dua opsi atau cara bermain bersama siswa menggunakan animasi rasi bintang. Silakan pilih mode yang sesuai dengan kondisi kelas Anda.',
      tabSeparate: 'Layar Terpisah',
      tabSplit: 'Tidak Terpisah',
      
      // Layar Terpisah Setup Section (Requested by User)
      separatePrepTitle: '📋 Sebelum Mulai: Apa Saja yang Perlu Disiapkan?',
      separatePrepBadge: 'Persiapan Wajib 2 Layar',
      separatePrepDesc: 'Untuk mode Layar Terpisah, harus disiapkan 2 layar. Dapat menggunakan 1 komputer/laptop dengan 2 layar (monitor laptop/utama + monitor eksternal atau proyektor kelas).',
      
      screen1Title: '1. Layar Utama (Monitor Laptop / PC)',
      screen1Role: 'Layar Input Soal (Untuk Siswa / Peserta)',
      screen1Desc: 'Digunakan oleh siswa untuk membuka stasiun soal (Room A - D), membaca narasi misi, serta memilih dan mengunci nomor bintang jawaban.',
      
      screen2Title: '2. Layar Eksternal / Proyektor',
      screen2Role: 'Layar Animasi Rasi Bintang (Tampilan Bersama)',
      screen2Desc: 'Digunakan untuk menampilkan dan memutar video animasi rasi bintang secara layar penuh (fullscreen) terus-menerus sebagai petunjuk visual di depan kelas.',
      
      connectionNoteTitle: '💡 Tips Pengaturan Tampilan:',
      connectionNoteDesc: 'Sambungkan kabel HDMI/VGA dari laptop ke proyektor atau monitor eksternal, lalu atur mode tampilan sistem operasi ke "Extend" (Bukan Duplicate) agar layar laptop dan layar proyektor dapat menampilkan jendela yang berbeda secara independen.',
      
      stepsTitle: 'Langkah-langkah Pelaksanaan:',
      step1Title: 'Persiapan Guru (Setup Layar & Video):',
      step1Desc: 'Guru menghubungkan proyektor ke komputer. Guru masuk ke Teacher Dashboard untuk mengatur Video Password, lalu buka jendela Video Rasi Bintang dan geser ke layar proyektor dalam mode fullscreen.',
      
      step2Title: 'Aktivitas Siswa (Mengerjakan Soal):',
      step2Desc: 'Di layar utama (atau melalui perangkat laptop/HP siswa masing-masing jika siswa membawa perangkat), siswa membuka Room A, B, C, atau D, memilih nama mereka, dan membaca pertanyaan kuis.',
      
      step3Title: 'Cara Bermain & Analisis:',
      step3Desc: 'Siswa menjawab pertanyaan di layar utama sambil mengamati pergerakan animasi rasi bintang di layar proyektor depan kelas untuk mencari bintang yang sesuai.',
      
      // Split Screen Section
      splitTitle: '2. Tidak Terpisah (Split-Screen / Perangkat Mandiri)',
      splitDesc: 'Opsi ini cocok jika siswa belajar secara mandiri, pembelajaran jarak jauh (online), atau jika kelas tidak memiliki fasilitas proyektor.',
      splitPrepTitle: 'Persiapan: Cukup 1 Perangkat per Siswa (Laptop / Tablet / HP)',
      splitStep1Title: 'Persiapan Guru:',
      splitStep1Desc: 'Guru membagikan Video Password kepada seluruh siswa dan instruksi untuk mengunduh videonya terlebih dahulu.',
      splitStep2Title: 'Aktivitas Siswa:',
      splitStep2Desc: 'Siswa memasukkan Video Password, kemudian menekan tombol Download Video untuk menyimpan animasi rasi bintang ke perangkat.',
      splitStep3Title: 'Cara Bermain (Split Screen):',
      splitStep3Desc: 'Siswa memutar video tersebut dan membaginya (split-screen) bersandingan dengan browser yang menampilkan soal. Siswa menganalisis video di satu sisi layar sambil menjawab pertanyaan di sisi layar lainnya.'
    },
    howToSetup: {
      badge: 'PANDUAN STACK & INSTALASI',
      title: 'Panduan Instalasi & Setup Tech Stack',
      subtitle: 'Sebelum menjalankan MemConstella, pastikan Anda telah mengunduh software yang dibutuhkan di bawah ini.',
      prereqHeading: '1. Software yang Perlu Diinstal Terlebih Dahulu (Prerequisites)',
      
      nodeTitle: 'Node.js & npm',
      nodeDesc: 'JavaScript runtime lingkungan utama untuk menjalankan aplikasi web modern dan mengunduh paket dependensi.',
      nodeVersion: 'Versi Rekomendasi: v18.0.0+ (LTS)',
      nodeDownloadBtn: 'Unduh Node.js (Official)',
      nodeUrl: 'https://nodejs.org/',
      
      gitTitle: 'Git (Version Control)',
      gitDesc: 'Sistem pengontrol versi untuk mengkloning repositori kode MemConstella ke komputer Anda.',
      gitVersion: 'Kompatibel: Windows, macOS, Linux',
      gitDownloadBtn: 'Unduh Git (Official)',
      gitUrl: 'https://git-scm.com/downloads',
      
      browserTitle: 'Modern Web Browser',
      browserDesc: 'Browser modern berkecepatan tinggi yang mendukung standar HTML5 Canvas, SVG, dan Web Storage.',
      browserVersion: 'Google Chrome / Edge / Firefox',
      browserDownloadBtn: 'Unduh Chrome (Official)',
      browserUrl: 'https://www.google.com/chrome/',
      
      stepsHeading: '2. Langkah-Langkah Menjalankan MemConstella di Komputer',
      step1Title: 'Langkah 1: Clone Repositori (Unduh Kode)',
      step1Desc: 'Buka Terminal atau Command Prompt, lalu unduh kode sumber proyek dengan perintah berikut:',
      
      step2Title: 'Langkah 2: Instal Seluruh Dependensi',
      step2Desc: 'Masuk ke folder proyek lalu instal paket React, Vite, dan Tailwind CSS:',
      
      step3Title: 'Langkah 3: Jalankan Development Server Lokal',
      step3Desc: 'Mulai server lokal Vite dengan hot module replacement instan:',
      
      step4Title: 'Langkah 4: Buka di Browser Anda',
      step4Desc: 'Buka browser favorit Anda dan akses alamat lokal aplikasi:',
      
      verifyHeading: 'Verifikasi Instalasi di Terminal Anda:',
      verifyTip: 'Buka terminal dan ketik perintah berikut untuk memastikan software sudah terpasang dengan baik:',
      copyCode: 'Salin',
      copiedCode: 'Tersalin!'
    },
    about: {
      title: 'Tentang MemConstella',
      productBadge: 'APLIKASI EDUKASI VISUAL KOSMIK',
      licenseTag: 'Lisensi GNU GPL v3',
      heroHeadline: 'Cara Baru Menghafal & Memahami Materi Lewat Rasi Bintang',
      heroSubheadline: 'MemConstella adalah aplikasi belajar interaktif yang mengubah konsep materi pelajaran menjadi petualangan rasi bintang kosmik. Belajar jadi tidak membosankan dan materi lebih mudah diingat dalam memori jangka panjang!',
      
      // Inspiration story: Clash of Champions - Ruangguru Season 2 (Galactic Trace)
      inspirationBadge: 'INSPIRASI UTAMA',
      inspirationTitle: 'Terinspirasi dari "Galactic Trace" di Clash of Champions Season 2',
      inspirationDesc: 'Pernah menonton serunya game "Galactic Trace" di acara Clash of Champions (CoC) Ruangguru Season 2? Di sana, para peserta jenius ditantang menguji ingatan visual dengan menghafal pola dan rute rasi bintang yang rumit. Terinspirasi dari keseruan dan daya asah kognitif game tersebut, MemConstella hadir membawa sensasi yang sama ke dalam materi pelajaran sehari-hari!',
      inspirationSub: 'Setiap materi (seperti fungsi Register CPU komputer, istilah biologi, rumus, hingga sejarah) dipetakan ke titik-titik bintang dalam animasi kosmik yang terus bergerak.',
      
      // Section: Ini Apa Sih?
      whatIsTitle: 'Sebenarnya, MemConstella Ini Apa Sih?',
      whatIsSubtitle: 'Bukan sekadar kuis biasa — ini adalah cara baru menghubungkan daya ingat visual dengan konsep pelajaran.',
      
      card1Title: 'Asosiasi Memori Visual',
      card1Desc: 'Daripada membaca buku teks yang kaku, siswa mengamati animasi pergerakan rasi bintang yang estetik. Otak manusia mengingat gambar dan pergerakan jauh lebih cepat dibanding teks biasa.',
      
      card2Title: 'Petualangan 4 Ruangan Misi',
      card2Desc: 'Ada Room A, B, C, dan D dengan cerita misi yang menarik. Setiap siswa mendapatkan variasi soal unik untuk mengasah ketelitian dan kecepatan analisis.',
      
      card3Title: 'Bebas Buat Materi Sendiri',
      card3Desc: 'Bukan cuma untuk Register CPU komputer! Lewat fitur Custom Game Builder, guru atau siapa saja bisa membuat paket soal untuk Biologi, Kimia, Bahasa, Sejarah, hingga kuis komunitas.',
      
      // Section: Untuk Siapa?
      audienceTitle: 'Dirancang Untuk Siapa Saja?',
      audience1Title: 'Bagi Guru & Pendidik di Kelas',
      audience1Desc: 'Bikin suasana kelas jadi seru dan aktif. Cukup putar animasi rasi bintang di proyektor kelas, lalu pantau hasil jawaban siswa di Dashboard Guru secara real-time.',
      
      audience2Title: 'Bagi Siswa & Pelajar',
      audience2Desc: 'Latihan mengingat dengan cara yang fresh dan menantang. Merasa seperti sedang bertanding di game show sambil menguasai konsep pelajaran yang sulit.',
      
      audience3Title: 'Bagi Sekolah & Komunitas Belajar',
      audience3Desc: 'Bisa dijalankan tanpa koneksi internet (offline-friendly), tanpa biaya langganan, dan data siswa tersimpan aman di komputer sekolah sendiri.',
      
      // Open source & GNU GPL v3
      openSourceTitle: '100% Gratis & Berlisensi Terbuka (GNU GPL v3)',
      openSourceDesc: 'MemConstella adalah perangkat lunak bebas dan terbuka (Free and Open Source Software) di bawah naungan GNU General Public License v3.0 (GPL-3.0). Anda bebas menggunakan, memodifikasi, dan membagikan aplikasi ini untuk kemajuan dunia pendidikan.',
      viewLicenseBtn: 'Lihat Lisensi GNU GPL v3',
      copyright: '© MemConstella. Bebas & Terbuka di bawah naungan GNU General Public License v3.0.'
    },
    gameSetup: {
      back: 'Kembali',
      title: 'Pengaturan Roster Kelas',
      subtitle: 'Masukkan nama siswa yang akan mengikuti sesi permainan ini.',
      label: 'Nama-nama Siswa',
      help: 'Anda dapat memisahkan nama dengan tanda koma atau tekan Enter untuk baris baru.',
      placeholder: 'Contoh: Ahmad, Budi, Cantika\nDewi\nEko',
      warningTitle: 'Peringatan: Progres sebelumnya akan di-reset.',
      warningDesc: 'Memulai sesi baru akan menghapus semua riwayat percobaan, perolehan poin, dan penguncian dari roster sebelumnya.',
      startMission: 'Mulai Misi',
      alertEmpty: 'Silakan masukkan minimal satu nama siswa untuk memulai.'
    },
    dashboard: {
      title: 'Teacher Monitor Dashboard',
      subtitle: 'Pantau aktivitas siswa, atur password video, dan kelola sesi permainan.',
      totalStudents: 'Total Siswa',
      completedStudents: 'Selesai (Poin Penuh)',
      inProgressStudents: 'Sedang Berjalan',
      videoPassTitle: 'Pengaturan Password Video',
      videoPassDesc: 'Siswa memerlukan password ini untuk membuka video rasi bintang di mode observasi.',
      videoPassPlaceholder: 'Ketik password video...',
      savePassword: 'Simpan Password',
      savedToast: 'Password berhasil disimpan!',
      searchPlaceholder: 'Cari nama siswa...',
      filterAll: 'Semua Siswa',
      filterFull: 'Poin Penuh',
      filterActive: 'Sedang Mengerjakan',
      resetAllBtn: 'Reset Semua Data Siswa',
      resetAllConfirm: 'PERHATIAN: Apakah Anda yakin ingin mereset SELURUH data progres siswa di semua ruangan?',
      resetSingleConfirm: 'Reset seluruh progres ruangan untuk siswa: ',
      thStudent: 'Nama Siswa',
      thRoomA: 'Room A',
      thRoomB: 'Room B',
      thRoomC: 'Room C',
      thRoomD: 'Room D',
      thScore: 'Poin',
      thStatus: 'Status',
      thActions: 'Aksi',
      statusPassed: 'Lulus (Poin Penuh)',
      statusPlaying: 'Sedang Bermain',
      resetBtn: 'Reset',
      emptySearch: 'Tidak ada data siswa yang cocok dengan pencarian.'
    },
    room: {
      backToDash: 'Dashboard',
      studentSelectLabel: 'Pilih Siswa:',
      studentSelectPlaceholder: '-- Pilih Nama Siswa --',
      manualInputPlaceholder: 'Atau ketik nama siswa manual...',
      btnEnter: 'Mulai Stasiun',
      switchStudent: 'Ganti Siswa',
      viewVideoBtn: 'Buka Video Rasi Bintang',
      videoLockedTitle: 'Video Terproteksi',
      videoLockedDesc: 'Masukkan password yang diberikan guru untuk melihat video pengamatan rasi bintang:',
      passwordInputPlaceholder: 'Ketik password di sini...',
      btnUnlock: 'Buka Video',
      passwordEmptyAlert: 'Guru belum mengatur password video di Dashboard.',
      passwordWrongAlert: 'Password salah! Silakan tanyakan kepada guru.',
      stationLockedTitle: 'Stasiun Terkunci!',
      stationLockedDesc: 'Jawaban Anda pada stasiun ini belum tepat dan stasiun ini telah terkunci. Silakan coba stasiun lainnya.',
      stationCompletedTitle: 'Stasiun Selesai!',
      stationCompletedDesc: 'Bagus sekali! Anda telah berhasil menjawab stasiun ini dengan tepat.',
      roomMissionTitle: 'Misi Ruangan',
      selectStarPrompt: 'Pilih Nomor Bintang Jawaban:',
      btnLockAnswer: 'Kunci Jawaban',
      confirmLock: 'Apakah Anda yakin ingin mengunci bintang nomor ',
      correctNotice: 'Jawaban Anda Benar!',
      incorrectNotice: 'Jawaban Belum Tepat!',
      congratsAllRooms: 'Selamat! Anda telah mengumpulkan poin penuh!'
    }
  },
  en: {
    common: {
      appName: 'MemConstella',
      appSubtitle: 'Interactive Constellation Educational Game',
      version: 'v2.1',
      back: 'Back',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      close: 'Close',
      warning: 'Warning',
      language: 'Language',
      indonesian: 'Indonesia',
      english: 'English',
      switchLanguage: 'Switch Language'
    },
    nav: {
      home: 'Home',
      howToPlay: 'How to play',
      howToSetup: 'How to setup',
      about: 'About',
      roomA: 'Room A',
      roomB: 'Room B',
      roomC: 'Room C',
      roomD: 'Room D',
      dashboard: 'Dashboard',
      stationLocked: 'Station Locked: Select & Lock Answer to Proceed',
      stationLockedShort: 'Locked',
      muteSound: 'Mute Sound FX',
      unmuteSound: 'Unmute Sound FX'
    },
    home: {
      headerSubtitle: 'The Educational Constellation & Computer Architecture Game',
      card1Title: 'Register CPU',
      card1Desc: 'Configure Game Settings with Default CPU Curriculum',
      card2Title: 'Create Custom',
      card2Desc: 'Build Your Own Memory Decks and Questions',
      card3Title: 'Play Games',
      card3Desc: 'Start Your Galactic Memory Adventure with Custom Packages',
      promptText: 'Select an option above to begin your celestial learning journey!'
    },
    howToPlay: {
      title: 'How to Play in Class with Students',
      subtitle: 'There are two options or ways to play with students using constellation animations. Please select the mode that best fits your classroom setup.',
      tabSeparate: 'Separate Screen',
      tabSplit: 'Single Screen',
      
      // Layar Terpisah Setup Section (Requested by User)
      separatePrepTitle: '📋 Before Starting: What Needs to be Prepared?',
      separatePrepBadge: '2 Screens Required',
      separatePrepDesc: 'For Separate Screen mode, 2 screens must be prepared. You can use 1 computer/laptop with 2 screens (main laptop/PC monitor + external monitor or classroom projector).',
      
      screen1Title: '1. Primary Screen (Laptop / PC Monitor)',
      screen1Role: 'Question Input Screen (For Students / Participants)',
      screen1Desc: 'Used by students to access question stations (Room A - D), read mission scenarios, and select & lock in star answers.',
      
      screen2Title: '2. External Screen / Projector',
      screen2Role: 'Constellation Video Screen (Shared Classroom Display)',
      screen2Desc: 'Used to display and play the animated constellation video in fullscreen continuously as an active visual reference at the front of the classroom.',
      
      connectionNoteTitle: '💡 Display Configuration Tip:',
      connectionNoteDesc: 'Connect the HDMI/VGA cable from the laptop to the projector or external monitor, then configure your OS display settings to "Extend" (Not Duplicate) so that the laptop screen and the projector screen can display independent windows.',
      
      stepsTitle: 'Implementation Steps:',
      step1Title: 'Teacher Setup (Display & Video):',
      step1Desc: 'The teacher connects the computer to the projector. The teacher opens the Teacher Dashboard to set the Video Password, opens the Constellation Video window, and moves it to the projector screen in fullscreen mode.',
      
      step2Title: 'Student Activity (Inputting Answers):',
      step2Desc: 'On the primary screen (or on individual student devices if students bring laptops/tablets), students open Room A, B, C, or D, choose their name, and read the mission questions.',
      
      step3Title: 'Gameplay & Analysis:',
      step3Desc: 'Students answer questions on the primary screen while actively observing the looping constellation animations on the classroom projector screen to identify the matching star.',
      
      // Split Screen Section
      splitTitle: '2. Single Screen (Split-Screen / Individual Device)',
      splitDesc: 'This option is suitable for independent self-study, remote online learning, or classrooms without projector facilities.',
      splitPrepTitle: 'Preparation: 1 Device per Student (Laptop / Tablet / Phone)',
      splitStep1Title: 'Teacher Preparation:',
      splitStep1Desc: 'The teacher shares the Video Password with all students along with instructions to download the video beforehand.',
      splitStep2Title: 'Student Activity:',
      splitStep2Desc: 'Students enter the Video Password, then click the Download Video button to save the constellation animation locally.',
      splitStep3Title: 'Gameplay (Split-Screen):',
      splitStep3Desc: 'Students play the video side-by-side (split-screen) with their web browser showing the quiz questions. Students analyze the video on one side while answering questions on the other.'
    },
    howToSetup: {
      badge: 'TECH STACK & SETUP GUIDE',
      title: 'Tech Stack & Local Installation Guide',
      subtitle: 'Before running MemConstella on your computer, please install the prerequisite software below.',
      prereqHeading: '1. Prerequisites: What You Need to Install First',
      
      nodeTitle: 'Node.js & npm',
      nodeDesc: 'The core JavaScript runtime environment required to run modern web apps and manage package dependencies.',
      nodeVersion: 'Recommended: v18.0.0+ (LTS)',
      nodeDownloadBtn: 'Download Node.js (Official)',
      nodeUrl: 'https://nodejs.org/',
      
      gitTitle: 'Git (Version Control)',
      gitDesc: 'Version control system to clone the MemConstella repository code directly onto your computer.',
      gitVersion: 'Compatible: Windows, macOS, Linux',
      gitDownloadBtn: 'Download Git (Official)',
      gitUrl: 'https://git-scm.com/downloads',
      
      browserTitle: 'Modern Web Browser',
      browserDesc: 'High-performance web browser supporting modern HTML5 Canvas, SVG vectors, and Web Storage.',
      browserVersion: 'Google Chrome / Edge / Firefox',
      browserDownloadBtn: 'Download Chrome (Official)',
      browserUrl: 'https://www.google.com/chrome/',
      
      stepsHeading: '2. Step-by-Step Instructions to Run Locally',
      step1Title: 'Step 1: Clone the Repository',
      step1Desc: 'Open Terminal or Command Prompt and download the project source code:',
      
      step2Title: 'Step 2: Install Project Dependencies',
      step2Desc: 'Navigate into the project folder and install React, Vite, and Tailwind packages:',
      
      step3Title: 'Step 3: Start the Local Development Server',
      step3Desc: 'Launch the lightning-fast Vite dev server with instant hot reload:',
      
      step4Title: 'Step 4: Launch in Your Browser',
      step4Desc: 'Open your favorite web browser and navigate to the local address:',
      
      verifyHeading: 'Verify Your Terminal Installation:',
      verifyTip: 'Open your command terminal and run these commands to confirm your environment is ready:',
      copyCode: 'Copy',
      copiedCode: 'Copied!'
    },
    about: {
      title: 'About MemConstella',
      productBadge: 'COSMIC VISUAL LEARNING APP',
      licenseTag: 'GNU GPL v3 License',
      heroHeadline: 'A Fresh Way to Learn & Remember Concepts Through Constellations',
      heroSubheadline: 'MemConstella is an interactive learning platform that transforms dense study material into celestial constellation adventures. Say goodbye to dull rote learning and make knowledge stick longer!',
      
      // Inspiration story: Clash of Champions - Ruangguru Season 2 (Galactic Trace)
      inspirationBadge: 'ORIGIN STORY',
      inspirationTitle: 'Inspired by "Galactic Trace" from Clash of Champions Season 2',
      inspirationDesc: 'Did you catch the thrilling "Galactic Trace" challenge in Ruangguru\'s Clash of Champions (CoC) Season 2? In that challenge, brilliant champions memorized complex constellation paths and star coordinates in seconds. Inspired by that very cognitive memory challenge, MemConstella brings that excitement into real-world education!',
      inspirationSub: 'Every curriculum concept (like CPU registers, biology terms, history milestones, or languages) is mapped to living star nodes connected in dynamic cosmic animations.',
      
      // Section: What is it?
      whatIsTitle: 'What Exactly is MemConstella?',
      whatIsSubtitle: 'Not just another quiz app — a visual memory engine connecting spatial thinking with real curriculum.',
      
      card1Title: 'Visual Memory Association',
      card1Desc: 'Instead of staring at rigid text, students observe dynamic looping constellation animations. The human brain retains visual and motion patterns up to 4x faster than plain text.',
      
      card2Title: '4 Themed Mission Rooms',
      card2Desc: 'Explore Room A, B, C, and D with engaging mission scenarios. Students receive personalized constellation puzzles to train analytical focus and recall.',
      
      card3Title: 'Create Custom Subjects Freely',
      card3Desc: 'Not just for computer CPU registers! With the built-in Custom Game Builder, teachers and students can craft decks for Biology, Chemistry, Languages, History, or community trivia.',
      
      // Section: Who is it for?
      audienceTitle: 'Who is MemConstella Built For?',
      audience1Title: 'For Teachers & Classroom Educators',
      audience1Desc: 'Electrify your classroom. Project the constellation video on the front screen, let students tackle stations, and track live class progress on the Teacher Dashboard.',
      
      audience2Title: 'For Students & Independent Learners',
      audience2Desc: 'Sharpen your photographic memory and cognitive focus. It feels like competing in an intellectual game show while truly understanding tricky subject concepts.',
      
      audience3Title: 'For Schools & Study Groups',
      audience3Desc: 'Works completely offline with zero cloud lag, no monthly subscription fees, and 100% local student privacy right on your school hardware.',
      
      // Open source & GNU GPL v3
      openSourceTitle: '100% Free & Open Source (GNU GPL v3)',
      openSourceDesc: 'MemConstella is proud Free and Open Source Software distributed under the GNU General Public License v3.0 (GPL-3.0). You are fully empowered to use, adapt, and share this software to advance education everywhere.',
      viewLicenseBtn: 'View GNU GPL v3 License',
      copyright: '© MemConstella. Free and Open Source under GNU General Public License v3.0.'
    },
    gameSetup: {
      back: 'Back',
      title: 'Class Roster Setup',
      subtitle: 'Enter the names of the students who will play this session.',
      label: 'Student Names',
      help: 'You can separate names with commas or press Enter for a new line.',
      placeholder: 'e.g. John Doe, Jane Smith\nAlice\nBob',
      warningTitle: 'Warning: Progress will be reset.',
      warningDesc: 'Starting a new session will clear all previous attempts, points, and lockouts for the previous roster.',
      startMission: 'Start Mission',
      alertEmpty: 'Please enter at least one student name to begin.'
    },
    dashboard: {
      title: 'Teacher Monitor Dashboard',
      subtitle: 'Monitor student activity, configure video password, and manage session progress.',
      totalStudents: 'Total Students',
      completedStudents: 'Completed (Full Points)',
      inProgressStudents: 'In Progress',
      videoPassTitle: 'Observation Video Password',
      videoPassDesc: 'Students require this password to unlock the constellation video in observation mode.',
      videoPassPlaceholder: 'Enter video password...',
      savePassword: 'Save Password',
      savedToast: 'Password saved successfully!',
      searchPlaceholder: 'Search student name...',
      filterAll: 'All Students',
      filterFull: 'Full Points',
      filterActive: 'In Progress',
      resetAllBtn: 'Reset All Student Progress',
      resetAllConfirm: 'CAUTION: Are you sure you want to reset ALL student progress across all 4 rooms?',
      resetSingleConfirm: 'Reset all room progress for student: ',
      thStudent: 'Student Name',
      thRoomA: 'Room A',
      thRoomB: 'Room B',
      thRoomC: 'Room C',
      thRoomD: 'Room D',
      thScore: 'Score',
      thStatus: 'Status',
      thActions: 'Actions',
      statusPassed: 'Passed (Full Points)',
      statusPlaying: 'In Progress',
      resetBtn: 'Reset',
      emptySearch: 'No students found matching your search.'
    },
    room: {
      backToDash: 'Dashboard',
      studentSelectLabel: 'Select Student:',
      studentSelectPlaceholder: '-- Select Student Name --',
      manualInputPlaceholder: 'Or type student name manually...',
      btnEnter: 'Start Station',
      switchStudent: 'Switch Student',
      viewVideoBtn: 'Open Constellation Video',
      videoLockedTitle: 'Protected Video',
      videoLockedDesc: 'Enter the password provided by your teacher to view the constellation video:',
      passwordInputPlaceholder: 'Enter password here...',
      btnUnlock: 'Unlock Video',
      passwordEmptyAlert: 'Teacher has not set a video password yet. Please ask the teacher to set it in the Dashboard.',
      passwordWrongAlert: 'Incorrect password! Please ask your teacher.',
      stationLockedTitle: 'Station Locked!',
      stationLockedDesc: 'Your previous attempt was incorrect and this station is locked. Please proceed to another station.',
      stationCompletedTitle: 'Station Completed!',
      stationCompletedDesc: 'Outstanding! You have successfully solved this station.',
      roomMissionTitle: 'Room Mission',
      selectStarPrompt: 'Select the Star Number for this concept:',
      btnLockAnswer: 'Lock Answer',
      confirmLock: 'Are you sure you want to lock star number ',
      correctNotice: 'Correct Answer!',
      incorrectNotice: 'Incorrect Answer!',
      congratsAllRooms: 'Congratulations! You achieved full points!'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['id'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved === 'id' || saved === 'en') {
          return saved;
        }
      } catch {
        // Fallback
      }
    }
    return 'id'; // Default to Indonesian
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch {
        // Ignore quota/storage errors
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'id' ? 'en' : 'id';
    setLanguage(nextLang);
  };

  // Sync across tabs if user changes language in another tab
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === LANGUAGE_STORAGE_KEY && (e.newValue === 'id' || e.newValue === 'en')) {
        setLanguageState(e.newValue as Language);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
