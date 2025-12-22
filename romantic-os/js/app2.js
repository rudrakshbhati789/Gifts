// 🔥 Firebase Config (yaha apni key daalo)
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT"
});

const db = firebase.firestore();

let localStream;
let peer;
const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

async function startCall(){
  localStream = await navigator.mediaDevices.getUserMedia({ audio:true });
  peer = new RTCPeerConnection(servers);

  localStream.getTracks().forEach(track=>{
    peer.addTrack(track, localStream);
  });

  peer.ontrack = e=>{
    const audio = document.createElement("audio");
    audio.srcObject = e.streams[0];
    audio.autoplay = true;
  };

  const callDoc = db.collection("calls").doc("loveCall");
  const offerCandidates = callDoc.collection("offerCandidates");

  peer.onicecandidate = e=>{
    if(e.candidate){
      offerCandidates.add(e.candidate.toJSON());
    }
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  await callDoc.set({ offer });

  callDoc.onSnapshot(snapshot=>{
    const data = snapshot.data();
    if(data?.answer && !peer.currentRemoteDescription){
      peer.setRemoteDescription(new RTCSessionDescription(data.answer));
    }
  });

  callDoc.collection("answerCandidates").onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
      if(change.type==="added"){
        peer.addIceCandidate(new RTCIceCandidate(change.doc.data()));
      }
    });
  });

  alert("📞 Calling...");
}

async function endCall(){
  peer.close();
  alert("❌ Call Ended");
}
