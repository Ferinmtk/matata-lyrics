document.addEventListener("DOMContentLoaded", async function () {
    const modal = document.getElementById("lyrics-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalLyrics = document.getElementById("modal-lyrics");
    const closeModal = document.querySelector(".close");

    async function fetchLyrics() {
        try {
            const response = await fetch("data/lyrics.json");
            return await response.json();
        } catch (error) {
            console.error("Error loading lyrics data:", error);
        }
    }

    // Load song from localStorage
    async function loadSongLyrics() {
        const songTitle = localStorage.getItem("selectedSong");
        if (!songTitle) return;

        const lyricsData = await fetchLyrics();
        const song = lyricsData.find(song => song.title === songTitle);

        if (song) {
            modalTitle.textContent = song.title;
            modalLyrics.innerHTML = song.lyrics.replace(/\n/g, "<br>"); // Preserve line breaks
            modal.style.display = "block"; // Show modal
        }
    }

    // Close Modal on Click
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        localStorage.removeItem("selectedSong"); // Clear stored song
    });

    // Close Modal when clicking outside
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            localStorage.removeItem("selectedSong");
        }
    });

    loadSongLyrics();
});
