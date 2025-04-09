// Helper function to show and hide the loader
const showLoader = () => {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('lyricsSection').style.display = 'none';
    document.getElementById('errorSection').style.display = 'none';
  };
  
  const hideLoader = () => {
    document.getElementById('loader').style.display = 'none';
  };
  
  // Handle the search button click
  document.getElementById('searchBtn').addEventListener('click', async () => {
    const artist = document.getElementById('artistInput').value.trim();
    const title = document.getElementById('songInput').value.trim();
  
    // Ensure both fields have values
    if (!artist || !title) {
      alert("Please enter both artist and song title.");
      return;
    }
  
    showLoader();
  
    try {
      const lyrics = await fetchLyrics(artist, title);
      displayLyrics(lyrics, artist, title);
    } catch (err) {
      showError("Could not fetch lyrics.");
    } finally {
      hideLoader();
    }
  });
  
  // Function to fetch lyrics from the API
  async function fetchLyrics(artist, title) {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (!res.ok) {
      throw new Error("Lyrics not found.");
    }
    const data = await res.json();
    return data.lyrics;
  }
  
  // Function to display lyrics on the page
  function displayLyrics(lyrics, artist, title) {
    document.getElementById('lyricsTitle').textContent = `${title} by ${artist}`;
    document.getElementById('lyricsText').textContent = lyrics;
    document.getElementById('lyricsSection').style.display = 'block';
  }
  
  // Function to show an error message
  function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorSection').style.display = 'block';
  }
  