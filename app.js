const searchSong = () => {
   
    const searchText = document.getElementById("search-field").value; 
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    document.getElementById("search-field").value = ""; 
    toggleSpinner();
    fetch(url)
        .then(res => res.json())
        .then(data => getSongs(data.data))
};

// document.getElementById("btn").addEventListener("click", function(){
//      const searchText = document.getElementById("search-field").value; 
//     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
//     document.getElementById("search-field").value = ""; 
//     toggleSpinner();
//     fetch(url)
//         .then(res => res.json())
//         .then(data => getSongs(data.data))
// })

document.getElementById("search-field")
    .addEventListener("keypress", function(event) {
     
    if (event.key === 'Enter') {
        document.getElementById("btn").click();
    }
});

const getSongs = (songs) => {
    toggleSpinner();
    document.getElementById("single-container").innerText = "";
    const singleContainer = document.getElementById("single-container");
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = ` 
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${song.title}</h3>
                                <p class="author lead">Album By <span>${song.artist.name}</span></p>
                                <audio controls>
                                    <source src="${song.preview}" type="audio/mpeg">   
                                </audio>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                            `;
        singleContainer.appendChild(songDiv);
        
        
        console.log(song);
    });
};

const getLyric = (artist, title) => { 
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getSingleSongLyric(data.lyrics))
     
}

const getSingleSongLyric = (lyric) => {
    const songLyric = document.getElementById("song-lyric");
    songLyric.innerText = lyric; 
}
 

const toggleSpinner = () => {
    const spinner = document.getElementById("load-spinner");
    const singleContainer = document.getElementById("single-container");
    const singleSong = document.getElementById("song-lyric");
    spinner.classList.toggle("d-none");
    singleContainer.classList.toggle("d-none");
    singleSong.classList.toggle("d-none");
}
 
