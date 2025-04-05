console.log("script.js loaded successfully!");


document.addEventListener("DOMContentLoaded", async function() {
    const lyricsContainer = document.getElementById("lyrics-list");
    const searchInput = document.getElementById("search-lyrics");
    const modal = document.getElementById("lyrics-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalArtist = document.getElementById("modal-artist");
    const modalLyrics = document.getElementById("modal-lyrics");
    const closeModal = document.querySelector(".close");

    try {
        const response = await fetch("data/lyrics.json");
        let songs = await response.json();

        function displaySongs(filter = "") {
            lyricsContainer.innerHTML = ""; // Clear previous results
            const filteredSongs = songs.filter(song =>
                song.title.toLowerCase().includes(filter.toLowerCase()) ||
                song.artist.toLowerCase().includes(filter.toLowerCase())
            );

            filteredSongs.forEach(song => {
                const songCard = document.createElement("div");
                songCard.classList.add("lyric-card");
                songCard.innerHTML = `<h3>${song.title}</h3><p>${song.artist}</p>`;
                
                songCard.addEventListener("click", () => {
                    modalTitle.textContent = song.title;
                    modalArtist.textContent = `By ${song.artist}`;
                    modalLyrics.textContent = song.lyrics;
                    modal.style.display = "flex";
                });

                lyricsContainer.appendChild(songCard);
            });
        }

        // Initial Load
        displaySongs();

        // Search Functionality
        searchInput.addEventListener("input", () => {
            displaySongs(searchInput.value);
        });

        // Close Modal
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });

    } catch (error) {
        console.error("Error loading lyrics:", error);
    }
});


// 🌙 Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    // Save mode in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});

// Check User Preference on Load
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}


document.addEventListener("DOMContentLoaded", async function() {
    const featuredContainer = document.getElementById("featured-list");

    try {
        const response = await fetch("data/lyrics.json");
        if (!response.ok) throw new Error("Failed to load lyrics.json");

        let songs = await response.json();

        // 🎯 Select 3 random songs
        let featuredSongs = songs.sort(() => 0.5 - Math.random()).slice(0, 3);

        // 🔥 Display Featured Songs
        featuredSongs.forEach(song => {
            const songCard = document.createElement("div");
            songCard.classList.add("featured-card");
            songCard.innerHTML = `
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <button class="view-lyrics" data-title="${song.title}">View Lyrics</button>
            `;

            // Open lyrics modal on click
            songCard.querySelector(".view-lyrics").addEventListener("click", () => {
                modalTitle.textContent = song.title;
                modalArtist.textContent = "By " + song.artist;
                modalLyrics.textContent = song.lyrics;
                modal.style.display = "flex";
            });

            featuredContainer.appendChild(songCard);
        });

    } catch (error) {
        console.error("Error loading featured songs:", error);
        featuredContainer.innerHTML = "<p>Failed to load songs. Try again later.</p>";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const featuredList = document.getElementById("featured-list");

    // Fetch Lyrics Data
    async function fetchLyrics() {
        try {
            const response = await fetch("data/lyrics.json");
            return await response.json();
        } catch (error) {
            console.error("Error loading lyrics data:", error);
        }
    }

    // Render Featured Songs
    async function renderFeaturedSongs() {
        const lyricsData = await fetchLyrics();
        featuredList.innerHTML = ""; // Clear existing content

        lyricsData.slice(0, 5).forEach((song) => {  // Display first 5 songs
            const songCard = document.createElement("div");
            songCard.classList.add("featured-card");
            songCard.innerHTML = `
                <h3>${song.title}</h3>
                <p>By ${song.artist}</p>
                <button class="view-lyrics" data-song="${song.title}">View Lyrics</button>
            `;
            featuredList.appendChild(songCard);
        });
    }

    // Handle "View Lyrics" Button Click
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("view-lyrics")) {
            const songTitle = event.target.dataset.song;
            window.location.href = `lyrics.html?song=${encodeURIComponent(songTitle)}`;
        }
    });

    // Search for Songs
    async function searchSongs(query) {
        const lyricsData = await fetchLyrics();
        featuredList.innerHTML = ""; // Clear previous results

        const filteredSongs = lyricsData.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSongs.length === 0) {
            featuredList.innerHTML = "<p>No matching songs found.</p>";
            return;
        }

        filteredSongs.forEach((song) => {
            const songCard = document.createElement("div");
            songCard.classList.add("featured-card");
            songCard.innerHTML = `
                <h3>${song.title}</h3>
                <p>By ${song.artist}</p>
                <button class="view-lyrics" data-song="${song.title}">View Lyrics</button>
            `;
            featuredList.appendChild(songCard);
        });
    }

    // Event Listener for Search Bar
    searchBar.addEventListener("input", function () {
        const query = searchBar.value.trim();
        if (query.length > 0) {
            searchSongs(query);
        } else {
            renderFeaturedSongs(); // Reset to default when search is cleared
        }
    });

    // Initial Load
    renderFeaturedSongs();
});

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const featuredList = document.getElementById("featured-list");

    // Fetch Lyrics Data
    async function fetchLyrics() {
        try {
            const response = await fetch("data/lyrics.json");
            return await response.json();
        } catch (error) {
            console.error("Error loading lyrics data:", error);
        }
    }

    // Render Featured Songs
    async function renderFeaturedSongs() {
        const lyricsData = await fetchLyrics();
        featuredList.innerHTML = ""; // Clear existing content

        lyricsData.slice(0, 5).forEach((song) => {  // Show first 5 songs
            const songCard = document.createElement("div");
            songCard.classList.add("featured-card");
            songCard.innerHTML = `
                <h3>${song.title}</h3>
                <p>By ${song.artist}</p>
                <button class="view-lyrics" data-song="${song.title}">View Lyrics</button>
            `;
            featuredList.appendChild(songCard);
        });
    }

    // Handle "View Lyrics" Button Click - Open Modal in lyrics.html
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("view-lyrics")) {
            const songTitle = event.target.dataset.song;
            localStorage.setItem("selectedSong", songTitle); // Store song title
            window.location.href = "lyrics.html"; // Redirect to lyrics page
        }
    });

    // Search for Songs
    async function searchSongs(query) {
        const lyricsData = await fetchLyrics();
        featuredList.innerHTML = ""; // Clear previous results

        const filteredSongs = lyricsData.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSongs.length === 0) {
            featuredList.innerHTML = "<p>No matching songs found.</p>";
            return;
        }

        filteredSongs.forEach((song) => {
            const songCard = document.createElement("div");
            songCard.classList.add("featured-card");
            songCard.innerHTML = `
                <h3>${song.title}</h3>
                <p>By ${song.artist}</p>
                <button class="view-lyrics" data-song="${song.title}">View Lyrics</button>
            `;
            featuredList.appendChild(songCard);
        });
    }

    // Event Listener for Search Bar
    searchBar.addEventListener("input", function () {
        const query = searchBar.value.trim();
        if (query.length > 0) {
            searchSongs(query);
        } else {
            renderFeaturedSongs(); // Reset to default when search is cleared
        }
    });

    // Initial Load
    renderFeaturedSongs();
});


// Newsletter Subscription Logic
document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const message = document.getElementById("subscription-message");


    if (email && email.includes('@')) {
        message.textContent = 'Thank you for subscribing!';
        message.style.color = 'green';
        // Here you can add code to send the email to your server or email service
    } else {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
    }

});

document.getElementById('modal-title').textContent = song.title;