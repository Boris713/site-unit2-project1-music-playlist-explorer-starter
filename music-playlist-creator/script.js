
const cardContainer = document.querySelector('.playlist-cards');
function appendCard() {
    for (let playlist of data.playlists) {
        let newPlaylist = document.createElement('div');
        newPlaylist.className = 'card';
        newPlaylist.innerHTML = 
        `
        <span id="delete-card">&times;</span>   
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

        const deleteBtm = newPlaylist.querySelector('#delete-card');
       deleteBtm.addEventListener('click', (event) => {
           deleteCard(event, cardContainer, newPlaylist);
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



function deleteCard(event, cardContainer, newPlaylist) {
    event.stopPropagation();
    cardContainer.removeChild(newPlaylist);
 
 
    const playlistIndex = data.playlists.findIndex(playlist => playlist.playlist_name === newPlaylist.querySelector('h3').innerText);
    data.playlists.splice(playlistIndex, 1);
 }
 





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





const searchInput = document.querySelector('#search-bar');
searchInput.addEventListener('input', filterPlaylists);


function filterPlaylists(event) {
  
   const searchTerm = event.target.value.toLowerCase();
    const playlistCards = document.querySelectorAll('.card');
    playlistCards.forEach((card) => {
       card.classList.remove('hide');
     });


   if (searchTerm === '') {
     return;
   }
  
   // Loop through each card and check if it matches the search term
   playlistCards.forEach((card) => {


     const playlistName = card.querySelector('h3').textContent.toLowerCase();
     const playlistCreator = card.querySelector('p').textContent.toLowerCase();
    
     if (!(playlistName.includes(searchTerm)) && !(playlistCreator.includes(searchTerm))) {
       card.classList.add('hide');
     }
     else {
       card.classList.remove('hide');
     }
   });
 }




const sortBtn = document.getElementById('sort-btn');
let sortMenu = document.getElementById('sort-menu')


function sort() {
   sortOption = sortMenu.options[sortMenu.selectedIndex].value;
   console.log(sortOption);
  
   const playlistCards = Array.from(document.querySelectorAll('.card'));
   console.log(sortOption)
   if (sortOption === 'name') {
       playlistCards.sort(function(a, b) {
           const nameA = a.querySelector('h3').textContent.toLowerCase();
           const nameB = b.querySelector('h3').textContent.toLowerCase();
           if (nameA < nameB) {
               return -1;
           }
           if (nameA > nameB) {
               return 1;
           }
           return 0;
       });
   } else {
       playlistCards.sort(function(a, b) {
           const likesA = parseInt(a.querySelector('.like-count').textContent);
           const likesB = parseInt(b.querySelector('.like-count').textContent);
           return likesB - likesA;
       });
   }
  
   // Remove all playlist cards from the DOM
   playlistCards.forEach((card) => {
       card.remove();
   });
  
   // Add sorted playlist cards back to the DOM
   const container = document.querySelector('.playlist-cards');
   playlistCards.forEach((card) => {
       container.appendChild(card);


    });
}


sortBtn.addEventListener('click', () =>{
    sort();
});