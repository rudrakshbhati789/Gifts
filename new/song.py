from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)

# Convert YouTube video ID to MP3 direct URL
def get_mp3_url(video_id):
    url = f"https://www.youtube.com/watch?v={video_id}"

    ydl_opts = {
        "format": "bestaudio/best",
        "quiet": True,
        "nocheckcertificate": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        return info["url"]  # this is the real MP3 link

@app.get("/search")
def search():
    query = request.args.get("q", "")
    if not query:
        return jsonify({"error": "no-query"})

    # Search YouTube
    search_opts = {
        "quiet": True,
        "extract_flat": "in_playlist",
        "default_search": "ytsearch5"
    }

    with yt_dlp.YoutubeDL(search_opts) as ydl:
        results = ydl.extract_info(query, download=False)

    if "entries" not in results or len(results["entries"]) == 0:
        return jsonify({"error": "no-results"})

    # Get first video ID
    video_id = results["entries"][0]["id"]

    # Convert to MP3 URL
    mp3_url = get_mp3_url(video_id)

    return jsonify({
        "title": results["entries"][0]["title"],
        "video_id": video_id,
        "mp3": mp3_url
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
