let videos = [];
let index = 0;

function search() {
    const query = document.getElementById("searchInput").value;

    fetch(`http://localhost:3000/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
            if (data.videos) {
                videos = data.videos;
                index = 0;
                playVideo();
            } else {
                alert("No results found");
            }
        });
}

function playVideo() {
    if (videos.length === 0) return;

    const videoId = videos[index].videoId;

    document.getElementById("playerBox").innerHTML = `
       <iframe width="560" height="315" src="https://www.youtube.com/embed/Egbt2Hr1KE0?si=WCYwEgugwYiLqYrC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    `;
}

function nextVideo() {
    if (index < videos.length - 1) {
        index++;
        playVideo();
    }
}

function prevVideo() {
    if (index > 0) {
        index--;
        playVideo();
    }
}
