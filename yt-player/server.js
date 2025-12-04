const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const API_KEY = "YOUR_YOUTUBE_API_KEY";

app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json({ error: "No query provided" });

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items) return res.json({ error: "No results" });

        const videos = data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title
        }));

        res.json({ videos });

    } catch (error) {
        res.json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on 3000"));
