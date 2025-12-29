function unlock(){
  let p=document.getElementById("pass").value.toLowerCase();
  if(p==="biwii"||p==="bubuuu"){
    document.getElementById("lock").style.display="none";
    document.getElementById("world").classList.remove("hidden");
    typeLetter();
  }else{
    document.getElementById("error").innerText="Sirf Bubuuu allowed ❤️";
  }
}

/* Slideshow */
let i=1;
setInterval(()=>{
  i=i%10+1;
  document.getElementById("slide").src="photos/"+i+".jpg";
},2500);

/* Typing letter */
let text=`Tum bimar hoti ho na…
toh mujhe lagta hai
meri duniya ruk si gayi hai.

Jaldi theek ho jao Bubuuu,
kyunki meri duniya
sirf tumse chalti hai ❤️`;
let idx=0;
function typeLetter(){
  if(idx<text.length){
    document.getElementById("typing").innerHTML+=text.charAt(idx);
    idx++;
    setTimeout(typeLetter,60);
  }
}

/* Healing */
let healCount=0;
function heal(){
  healCount++;
  let msgs=[
    "Thoda aur… 🌸",
    "Ho raha hai 💖",
    "Dekha tumhari smile strongest hai 😘"
  ];
  document.getElementById("healText").innerText=
    msgs[Math.min(healCount-1,2)];
}

/* Forever */
function forever(){
  let lines=[
    "Main hoon hamesha tumhare saath ❤️",
    "Tum meri sabse pyari aadat ho 🫶",
    "Is duniya me sabse safe jagah tum ho"
  ];
  document.getElementById("foreverText").innerText=
    lines[Math.floor(Math.random()*lines.length)];
}
