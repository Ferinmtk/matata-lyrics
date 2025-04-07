console.log("script.js loaded successfully!");

document.addEventListener("DOMContentLoaded", async function () {
    const lyricsContainer = document.getElementById("lyrics-list");
    const searchInput = document.getElementById("search-lyrics");
    const featuredContainer = document.getElementById("featured-list");
    const searchBar = document.getElementById("search-bar");
    const modal = document.getElementById("lyrics-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalArtist = document.getElementById("modal-artist");
    const modalLyrics = document.getElementById("modal-lyrics");
    const closeModal = document.querySelector(".close");

    let songs = [];

    // Fetch lyrics data
    async function fetchLyrics() {
        try {
            const response = await fetch("data/lyrics.json");
            if (!response.ok) throw new Error("Failed to load lyrics.json");
            songs = await response.json();
        } catch (error) {
            console.error("Error loading lyrics data:", error);
        }
    }

    // Display search results in lyrics.html
    function displaySongs(filter = "") {
        lyricsContainer.innerHTML = "";
        const filtered = songs.filter(song =>
            song.title.toLowerCase().includes(filter.toLowerCase()) ||
            song.artist.toLowerCase().includes(filter.toLowerCase())
        );
        filtered.forEach(song => {
            const card = document.createElement("div");
            card.classList.add("lyric-card");
            card.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
            card.addEventListener("click", () => openModal(song));
            lyricsContainer.appendChild(card);
        });
    }

    // Display random featured songs
    function displayFeaturedSongs(limit = 5) {
        featuredContainer.innerHTML = "";
        const featured = [...songs].sort(() => 0.5 - Math.random()).slice(0, limit);
        featured.forEach(song => {
            const card = document.createElement("div");
            card.classList.add("featured-card");
            card.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <button class="view-lyrics" data-song="${song.title}">View Lyrics</button>
            `;
            featuredContainer.appendChild(card);
        });
    }

    // Open modal with lyrics
    function openModal(song) {
        modalTitle.textContent = song.title;
        modalArtist.textContent = `By ${song.artist}`;
        modalLyrics.textContent = song.lyrics;
        modal.style.display = "flex";
    }

    // Search within homepage
    function searchHomepage(query) {
        const results = songs.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase())
        );
        featuredContainer.innerHTML = "";
        if (results.length === 0) {
            featuredContainer.innerHTML = "<p>No matching songs found.</p>";
            return;
        }
        results.forEach(song => {
            const card = document.createElement("div");
            card.classList.add("featured-card");
            card.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <button class="view-lyrics" data-song="${song.title}">View Lyrics</button>
            `;
            featuredContainer.appendChild(card);
        });
    }

    // Event Delegation for modal
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("view-lyrics")) {
            const title = event.target.dataset.song;
            const song = songs.find(s => s.title === title);
            if (song) openModal(song);
        }
        if (event.target === modal) modal.style.display = "none";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Newsletter Subscription
    const newsletterForm = document.getElementById("newsletter-form");
    newsletterForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const message = document.getElementById("subscription-message");
        const email = emailInput.value;

        if (email && email.includes("@")) {
            message.textContent = "Thank you for subscribing!";
            message.style.color = "green";
        } else {
            message.textContent = "Please enter a valid email address.";
            message.style.color = "red";
        }
    });

    // Event listeners for search bars
    searchInput?.addEventListener("input", () => displaySongs(searchInput.value));
    searchBar?.addEventListener("input", () => {
        const query = searchBar.value.trim();
        if (query.length > 0) {
            searchHomepage(query);
        } else {
            displayFeaturedSongs();
        }
    });

    // Fetch and initialize
    await fetchLyrics();

    // Page-specific rendering
    if (lyricsContainer) displaySongs();
    if (featuredContainer) displayFeaturedSongs();
});
