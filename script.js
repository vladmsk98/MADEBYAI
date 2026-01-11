"use strict";

// --- DOM-ЭЛЕМЕНТЫ ---
const albumsList = document.getElementById('albums-list');
const albumDetails = document.getElementById('album-details');
const albumTitle = document.getElementById('album-title');
const albumDescription = document.getElementById('album-description');
const albumYear = document.getElementById('album-year');
const albumType = document.getElementById('album-type');
const tracklist = document.getElementById('tracklist');
const backBtn = document.getElementById('back-btn');
const themeToggle = document.getElementById('theme-toggle');

// --- ТАЙМЕР ---
const countdownContainer = document.getElementById('countdown-container');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const targetDate = new Date('2026-02-03T00:00:00').getTime(); // 3 февраля 2026

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    daysSpan.textContent = '00';
    hoursSpan.textContent = '00';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Обновить сразу при загрузке

// --- ДАННЫЕ ДИСКОГРАФИИ ---
const discography = [
  {
    id: 1,
    title: "MADE BY AI (CLOUD RAP)",
    year: 2026,
    type: "Single",
    description: "Смесь клауд-рэпа и эмбиента в сочетании с атмосферными пэдами",
    tracks: [
      "MADE BY AI (CLOUD RAP)"
    ]
  },
  {
    id: 2,
    title: "MADE BY AI (TRIP HOP)",
    year: 2026,
    type: "Single",
    description: "Трип-хоп бит + осмысленная задумчивость = плавный даунтемпо-рэп",
    tracks: [
      "MADE BY AI (TRIP HOP)"
    ]
  },
  {
    id: 3,
    title: "MADE BY AI (NEO SOUL HIP HOP)",
    year: 2026,
    type: "Single",
    description: "Современный соул с живыми инструментами и лирической глубиной",
    tracks: [
      "MADE BY AI (NEO SOUL HIP HOP)"
    ]
  }
];

// --- МОДУЛЬ ОТОБРАЖЕНИЯ ---
const DisplayModule = {
  showAlbumsList() {
    albumsList.innerHTML = '';
    discography.forEach(album => {
      const li = document.createElement('li');
      li.textContent = `${album.title} (${album.year})`;
      li.addEventListener('click', () => {
        ViewModule.showAlbumDetails(album);
      });
      albumsList.appendChild(li);
    });
    document.getElementById('discography-section').style.display = 'block';
    albumDetails.style.display = 'none';
  },

  showAlbumDetails(album) {
    albumTitle.textContent = album.title;
    albumDescription.textContent = album.description;
    albumYear.textContent = `Year: ${album.year}`;
    albumType.textContent = `Type: ${album.type}`;
    
    tracklist.innerHTML = '';
    album.tracks.forEach((track) => {
      const li = document.createElement('li');
      
      // Добавляем название трека
      const trackName = document.createElement('p');
      trackName.textContent = track;
      trackName.style.margin = '0 0 10px 0';
      li.appendChild(trackName);
      
      // Добавляем обложку — имя файла = название трека
      const cover = document.createElement('img');
      const coverFileName = track.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
      cover.src = `covers/${coverFileName}.jpg`;
      cover.alt = `Cover for ${track}`;
      cover.style.width = '100%';
      cover.style.maxWidth = '300px';
      cover.style.height = 'auto';
      cover.style.display = 'block';
      cover.style.margin = '10px auto';
      cover.style.borderRadius = '4px';
      cover.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
      // Попробуем загрузить, если нет — скрыть
      cover.onerror = () => cover.style.display = 'none';
      
      li.appendChild(cover);
      
      // Добавляем аудио-плеер — имя файла = название трека
      const audio = document.createElement('audio');
      const audioFileName = track.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
      audio.src = `audio/${audioFileName}.mp3`;
      audio.controls = true;
      audio.style.width = '100%';
      audio.style.marginTop = '10px';
      
      li.appendChild(audio);
      tracklist.appendChild(li);
    });

    document.getElementById('discography-section').style.display = 'none';
    albumDetails.style.display = 'block';
  }
};

// --- МОДУЛЬ ВИДА ---
const ViewModule = {
  showAlbumDetails: DisplayModule.showAlbumDetails
};

// --- ОБРАБОТЧИКИ СОБЫТИЙ ---
backBtn.addEventListener('click', DisplayModule.showAlbumsList);

themeToggle.addEventListener('click', () => {
  document.body.setAttribute('data-theme',
    document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  );
});

// --- ИНИЦИАЛИЗАЦИЯ ---
DisplayModule.showAlbumsList();