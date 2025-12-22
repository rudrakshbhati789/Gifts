// 🔴 APNI SUPABASE DETAILS YAHA DALO
const SUPABASE_URL = "https://cilgmjkohnkwdrxbhpfl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbGdtamtvaG5rd2RyeGJocGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNTc1OTAsImV4cCI6MjA4MTYzMzU5MH0.IXjZnRznlHx1OpyS7yWsKoeEpSyhKWGoUekjKR8PIco";




const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ======================
// LOAD REELS
// ======================
async function loadReels(){
  const box = document.getElementById("reels");
  box.innerHTML = "Loading...";

  const { data, error } = await supabaseClient
    .from("reels")
    .select("*")
    .order("id",{ascending:false});

  if(error){
    box.innerHTML="❌ Error loading reels";
    return;
  }

  if(!data || data.length===0){
    box.innerHTML="<p style='text-align:center'>No reels yet ❤️</p>";
    return;
  }

  box.innerHTML="";

  data.forEach(r=>{
    let div=document.createElement("div");

    let embed = r.reel_link
      .replace("www.instagram.com","www.instagram.com")
      .replace("/reel/","/reel/embed/");

    div.innerHTML = `
      <iframe src="${embed}" allowfullscreen></iframe>
    `;
    box.appendChild(div);
  });
}

// ======================
// ADD REEL
// ======================
async function addReel(){
  let link = document.getElementById("link").value.trim();
  if(!link) return alert("Reel link daalo ❤️");

  await supabaseClient.from("reels").insert([
    { reel_link: link }
  ]);

  document.getElementById("link").value="";
  loadReels(); // 🔥 refresh automatically
}
