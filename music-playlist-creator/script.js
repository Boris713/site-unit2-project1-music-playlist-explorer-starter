
const cardContainer = document.querySelector('.playlist-cards');
function appendCard() {
    for (let playlist of data.playlists) {
        let newPlaylist = document.createElement('div');
        newPlaylist.className = 'card';
        newPlaylist.innerHTML = 
        `
        <img src="${playlist.playlist_art}" alt="Cover image of ${playlist.playlist_name}" class="playlist-cover">
        <h3>${playlist.playlist_name}</h3>
        <p>Created by: ${playlist.playlist_creator}</p>
        <div class="like-info">
            <img src="assets/img/heartEmpty.png" alt="Like" class="like-btn">
            <p class="like-count">${playlist.likeCount}</p>
        </div>
    `;
    let liked = false;

    cardContainer.appendChild(newPlaylist);
    
    
    newPlaylist.addEventListener('click', () => {
        appendSong(playlist.songs, playlist);
    });

    
        const heartBtn = newPlaylist.querySelector('.like-btn');
        heartBtn.addEventListener('click', (event) => {
            updateLike(event, liked, newPlaylist);
        });

}

}

document.addEventListener('DOMContentLoaded', function() {
    appendCard();
});



function appendSong(songs, playlist) {

    const playlistImgs = document.getElementsByClassName("playlist-img");
for (let i = 0; i < playlistImgs.length; i++) {
    playlistImgs[i].src = playlist.playlist_art;
    
    const modalHeaderH1 = document.querySelector('.modal-header h1');
    modalHeaderH1.textContent = playlist.playlist_name;
    const modalHeaderP = document.querySelector('.modal-header p');
    modalHeaderP.textContent = 'Created by: ' + playlist.playlist_creator;


    const songsList = document.querySelector('#songs-list');
    songsList.innerHTML = '';
    for (let song of songs) {
        let newSong = document.createElement('li');
        newSong.className = 'song';
        newSong.innerHTML = `
        <img src="${song.cover_art}" alt="" class="song-image">
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>Artist: ${song.artist}</p>
                <p>Album: ${song.album}</p>
            </div>
            <p class="song-length">${song.duration}</p>
        `;
        songsList.appendChild(newSong);
    };
    document.querySelector('.modal-overlay').style.display = 'flex';
}
}




function closeModal() {
    document.querySelector('.modal-overlay').style.display = 'none';
}


const closeButton = document.querySelector('#close-modal');

    closeButton.addEventListener('click', () => {
        closeModal();
    });




function updateLike(event, liked, newPlaylist) {
    const heart = newPlaylist.querySelector('.like-btn');
    const heartLike = newPlaylist.querySelector('.like-count');
    event.stopPropagation();
    if (liked === false) {
        heart.src = "assets/img/heartFull.png";
        const currentLikeCount = parseInt(heartLike.textContent);
        heartLike.textContent = currentLikeCount + 1;
    }
    
};







let shuffleBtn = document.getElementById('shuffle-btn');

function shuffleSongs() {
    
    const songsList = document.querySelector('#songs-list');
    const songItems = Array.from(songsList.querySelectorAll('.song'));

    for (let i = songItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songItems[i], songItems[j]] = [songItems[j], songItems[i]];
    }

    songsList.innerHTML = '';

    for (const songItem of songItems) {
        songsList.appendChild(songItem);
    }
}

shuffleBtn.addEventListener('click', shuffleSongs);
