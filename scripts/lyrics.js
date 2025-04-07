const searchInput = document.getElementById('search-lyrics');
const lyricsList = document.getElementById('lyrics-list');
const lyricsModal = document.getElementById('lyrics-modal');
const modalTitle = document.getElementById('modal-title');
const modalArtist = document.getElementById('modal-artist');
const modalLyrics = document.getElementById('modal-lyrics');
const closeModal = document.querySelector('.close');
const loadingSpinner = document.getElementById('loading-spinner');

// Mock song data for demo (you can replace this with an API call)
const mockSongs = [
  { title: 'Hello', artist: 'Adele' },
  { title: 'Shape of You', artist: 'Ed Sheeran' },
  { title: 'Blinding Lights', artist: 'The Weeknd' },
  { title: 'Photograph', artist: 'Ed Sheeran' },
  { title: 'Levitating', artist: 'Dua Lipa' },
];

// Filter and show songs based on user input
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  lyricsList.innerHTML = '';

  if (query.length === 0) return;

  const filtered = mockSongs.filter(
    song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );

  filtered.forEach(song => {
    const songItem = document.createElement('div');
    songItem.classList.add('song-item');
    songItem.innerHTML = `
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <button class="view-lyrics-btn" data-title="${song.title}" data-artist="${song.artist}">
        View Lyrics
      </button>
    `;
    lyricsList.appendChild(songItem);
  });

  addLyricsButtonListeners();
});

// Add click listeners to all "View Lyrics" buttons
function addLyricsButtonListeners() {
  const buttons = document.querySelectorAll('.view-lyrics-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const title = btn.getAttribute('data-title');
      const artist = btn.getAttribute('data-artist');

      showSpinner(true);
      try {
        const lyrics = await fetchLyrics(artist, title);
        openLyricsModal(artist, title, lyrics);
      } catch (err) {
        openLyricsModal(artist, title, 'Lyrics not found.');
      } finally {
        showSpinner(false);
      }
    });
  });
}

// Fetch lyrics from lyrics.ovh API
async function fetchLyrics(artist, title) {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
  if (!res.ok) throw new Error('Not found');
  const data = await res.json();
  return data.lyrics;
}

// Show lyrics in modal
function openLyricsModal(artist, title, lyrics) {
  modalTitle.textContent = title;
  modalArtist.textContent = `by ${artist}`;
  modalLyrics.textContent = lyrics;
  lyricsModal.style.display = 'block';
}

// Close modal on X
closeModal.addEventListener('click', () => {
  lyricsModal.style.display = 'none';
});

// Hide modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === lyricsModal) {
    lyricsModal.style.display = 'none';
  }
});

// Show or hide loading spinner
function showSpinner(show) {
  loadingSpinner.style.display = show ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", async function () {
    const lyricsContainer = document.getElementById("lyrics-list");

    const eastAfricanSongs = [
        { title: "Malaika", artist: "Fadhili Williams" },
        { title: "Jambo Bwana", artist: "Them Mushrooms" },
        { title: "Kuna Kuna", artist: "Vic West" },
        { title: "Unconditionally Bae", artist: "Sauti Sol" },
        { title: "Tetema", artist: "Rayvanny" },
        { title: "Kwangwaru", artist: "Harmonize" },
        { title: "Katika", artist: "Navy Kenzo" },
        { title: "Suzanna", artist: "Sauti Sol" },
        { title: "Salome", artist: "Diamond Platnumz" },
        { title: "Yope Remix", artist: "Innoss'B" },
        { title: "Mbona", artist: "Ali Kiba" },
        { title: "Sipangwingwi", artist: "Exray Taniua" }
    ];

    async function fetchLyrics(artist, title) {
        try {
            const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
            const data = await res.json();
            return data.lyrics || "Lyrics not found.";
        } catch (err) {
            console.error(`Error fetching lyrics for ${title}:`, err);
            return "Lyrics not found.";
        }
    }

    for (const song of eastAfricanSongs) {
        const songCard = document.createElement("div");
        songCard.classList.add("lyric-card");
        songCard.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;

        songCard.addEventListener("click", async () => {
            const lyrics = await fetchLyrics(song.artist, song.title);
            document.getElementById("modal-title").textContent = song.title;
            document.getElementById("modal-artist").textContent = `By ${song.artist}`;
            document.getElementById("modal-lyrics").textContent = lyrics;
            document.getElementById("lyrics-modal").style.display = "flex";
        });

        lyricsContainer.appendChild(songCard);
    }
});


document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-lyrics");
  const lyricsList = document.getElementById("lyrics-list");

  // Reusable function to fetch lyrics suggestions using TheAudioDB (artist + song)
  async function searchLyrics(query) {
      lyricsList.innerHTML = "<p>Searching...</p>";

      try {
          const response = await fetch(`https://www.theaudiodb.com/api/v1/json/2/searchtrack.php?s=${encodeURIComponent(query)}`);
          const data = await response.json();

          lyricsList.innerHTML = ""; // Clear old content

          if (data.track && data.track.length > 0) {
              data.track.forEach(track => {
                  const card = document.createElement("div");
                  card.classList.add("lyric-card");
                  card.innerHTML = `
                      <h3>${track.strTrack}</h3>
                      <p>${track.strArtist}</p>
                      <button class="view-lyrics" data-artist="${track.strArtist}" data-title="${track.strTrack}">View Lyrics</button>
                  `;
                  lyricsList.appendChild(card);
              });
          } else {
              lyricsList.innerHTML = "<p>No results found.</p>";
          }

      } catch (error) {
          console.error("Error fetching lyrics:", error);
          lyricsList.innerHTML = "<p>Error fetching results. Try again.</p>";
      }
  }

  // Real-time input listener
  searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim();
      if (query.length > 2) {
          searchLyrics(query);
      } else {
          lyricsList.innerHTML = "<p>Type to search lyrics...</p>";
      }
  });

  // On clicking a result, fetch actual lyrics using lyrics.ovh
  lyricsList.addEventListener("click", async function (e) {
    if (e.target.classList.contains("view-lyrics")) {
        const artist = e.target.dataset.artist;
        const title = e.target.dataset.title;
        const preloaded = e.target.dataset.lyrics;

        modalTitle.textContent = title;
        modalArtist.textContent = `By ${artist}`;

        if (preloaded) {
            modalLyrics.textContent = decodeURIComponent(preloaded);
            modal.style.display = "flex";
        } else {
            try {
                const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
                const result = await res.json();
                modalLyrics.textContent = result.lyrics || "Lyrics not found.";
                modal.style.display = "flex";
            } catch (err) {
                modalLyrics.textContent = "Lyrics not available at the moment.";
                modal.style.display = "flex";
            }
        }
    }
});

  preloadSuggestions();

});

async function preloadSuggestions() {
  const lyricsList = document.getElementById("lyrics-list");
  lyricsList.innerHTML = "<p>Loading suggestions...</p>";

  const available = [];

  for (const song of curatedSuggestions) {
      try {
          const lyricsRes = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(song.artist)}/${encodeURIComponent(song.title)}`);
          const lyricsData = await lyricsRes.json();

          if (lyricsData.lyrics) {
              available.push({ ...song, lyrics: lyricsData.lyrics });
          }
      } catch (err) {
          console.warn(`Lyrics not found for ${song.title} by ${song.artist}`);
      }
  }

  if (available.length === 0) {
      lyricsList.innerHTML = "<p>No lyrics found for suggestions.</p>";
      return;
  }

  lyricsList.innerHTML = "";
  available.forEach(track => {
      const card = document.createElement("div");
      card.classList.add("lyric-card");
      card.innerHTML = `
          <h3>${track.title}</h3>
          <p>${track.artist}</p>
          <button class="view-lyrics" data-artist="${track.artist}" data-title="${track.title}" data-lyrics="${encodeURIComponent(track.lyrics)}">View Lyrics</button>
      `;
      lyricsList.appendChild(card);
  });
}
