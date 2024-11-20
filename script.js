document.addEventListener('DOMContentLoaded', () => {
    const trackList = document.getElementById('trackList');
    const audioPlayer = document.getElementById('audioPlayer');
    const searchBar = document.getElementById('searchBar');

    // Fetch tracks from JSON
    fetch('data/tracks.json')
        .then(response => response.json())
        .then(data => {
            displayTracks(data);

            // Search functionality
            searchBar.addEventListener('input', () => {
                const query = searchBar.value.toLowerCase();
                const filteredTracks = data.filter(track =>
                    track.title.toLowerCase().includes(query) ||
                    track.artist.toLowerCase().includes(query) ||
                    track.album.toLowerCase().includes(query)
                );
                displayTracks(filteredTracks);
            });
        });

    function displayTracks(tracks) {
        trackList.innerHTML = '';
        tracks.forEach(track => {
            const trackElement = document.createElement('div');
            trackElement.classList.add('track');
            trackElement.innerHTML = `
                <img src="${track.cover}" alt="${track.title}">
                <div>
                    <h4>${track.title}</h4>
                    <p>${track.artist} - ${track.album}</p>
                </div>
            `;
            trackElement.addEventListener('click', () => {
                audioPlayer.src = track.audio;
                audioPlayer.play();
            });
            trackList.appendChild(trackElement);
        });
    }
});
