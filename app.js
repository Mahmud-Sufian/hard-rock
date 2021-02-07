const searchSong = () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getSongs(data.data))
};

const getSongs = (songs) => {
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
                                    <source src="${song.preview}" type="audio/ogg">   
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
    console.log(songLyric);
}