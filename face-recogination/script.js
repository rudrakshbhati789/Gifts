const video = document.getElementById("video");

// Load models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/face-recogination/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/face-recogination/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/face-recogination/models")
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(err => console.error("Camera Error:", err));
}

video.addEventListener("playing", async () => {
    const wifeImage = await faceapi.fetchImage("wife.jpg");

    // Encode wife's face
    const wifeDescriptor = await faceapi
        .detectSingleFace(wifeImage)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (!wifeDescriptor) {
        console.log("Wife face not detected in reference image!");
        return;
    }

    const matcher = new faceapi.FaceMatcher(wifeDescriptor, 0.45);

    setInterval(async () => {
        const detection = await faceapi
            .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detection) {
            const match = matcher.findBestMatch(detection.descriptor);

            if (match.distance < 0.45) {
                console.log("Wife detected!");
                window.location.href = "/yt-player/index.html"; // ← OPEN NEXT PAGE
            }
        }
    }, 500);
});
