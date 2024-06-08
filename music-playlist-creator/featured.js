// Get references to the HTML elements we need to modify
const playlistCover = document.getElementById('playlist-cover');
const songList = document.getElementById('song-list');
const playlistName = document.querySelector('#box1 h2');
const playlistCreator = document.querySelector('#box1 p');

// Get a random playlist from the data
const randomPlaylist = getRandomPlaylist(data);

// Set the playlist cover image source
playlistCover.src = randomPlaylist.playlist_art;

// Set the playlist name and creator text
playlistName.textContent = randomPlaylist.playlist_name;
playlistCreator.textContent = `Created by: ${randomPlaylist.playlist_creator}`;

// Populate the song list with the playlist's songs
for (const song of randomPlaylist.songs) {
  const li = document.createElement('li');
  li.className = 'song';
  li.innerHTML = `
      <img src="${song.cover_art}" alt="" class="song-image">
          <div class="song-info">
              <h3>${song.title}</h3>
              <p>Artist: ${song.artist}</p>
              <p>Album: ${song.album}</p>
          </div>
          <p class="song-length">${song.duration}</p>
      `;
  songList.appendChild(li);
}

// Helper function to get a random playlist from the given data
function getRandomPlaylist(data) {
  const playlists = data.playlists;
  const randomIndex = Math.floor(Math.random() * playlists.length);
  return playlists[randomIndex];
}