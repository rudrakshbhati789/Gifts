// TIME
setInterval(()=>{
 let d=new Date();
 let t=d.getHours()+":"+d.getMinutes().toString().padStart(2,"0");
 let time=document.getElementById("time");
 let clock=document.getElementById("clock");
 if(time) time.innerText=t;
 if(clock) clock.innerText=t;
},1000);

// LOVE DAYS (change date here ❤️)
let start = new Date("2024-11-25");
let now = new Date();
let days = Math.floor((now-start)/(1000*60*60*24));
let dEl=document.getElementById("days");
if(dEl) dEl.innerText=days;

// SWIPE UNLOCK
let lock=document.querySelector(".lock-screen");
let startY=0;
if(lock){
 lock.addEventListener("touchstart",e=>startY=e.touches[0].clientY);
 lock.addEventListener("touchend",e=>{
  if(startY-e.changedTouches[0].clientY>80){
   location.href="/romantic-os/home.html";
   navigator.vibrate(60);
  }
 });
}

// HEART EFFECT ON TAP
document.addEventListener("touchstart", e=>{
  if(e.target.closest("a, button")) return;
  let h=document.createElement("div");
  h.className="heart";
  h.innerText="💖";
  h.style.left=e.touches[0].clientX+"px";
  h.style.top=e.touches[0].clientY+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),800);
});

// WALLPAPER SYSTEM (ALL PAGES)
window.addEventListener("load",()=>{
  let wallpaper = localStorage.getItem("loveOSWallpaper");
  if(wallpaper){
    document.body.style.backgroundImage=`url('${wallpaper}')`;
  }

  // LIVE CLOCK
  updateTime();
  setInterval(updateTime,1000);

  // LOVE COUNTER (example: since 2025-01-01)
  let startDate = new Date("2025-01-01");
  let today = new Date();
  let diff = Math.floor((today - startDate)/(1000*60*60*24));
  document.getElementById("days").innerText = diff;
});

// FUNCTION TO UPDATE TIME
function updateTime(){
  let t = new Date();
  let h = t.getHours().toString().padStart(2,"0");
  let m = t.getMinutes().toString().padStart(2,"0");
  let timeSpan = document.getElementById("time");
  if(timeSpan) timeSpan.innerText = `${h}:${m}`;
}