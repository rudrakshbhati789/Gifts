const SUPABASE_URL = "https://cilgmjkohnkwdrxbhpfl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpbGdtamtvaG5rd2RyeGJocGZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNTc1OTAsImV4cCI6MjA4MTYzMzU5MH0.IXjZnRznlHx1OpyS7yWsKoeEpSyhKWGoUekjKR8PIco";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {

const chatBox = document.getElementById("chatBox");
const msgInput = document.getElementById("messageInput");

let username = localStorage.getItem("loveChatUser");
if (!username) {
  username = prompt("Enter your name ❤️") || "Love";
  localStorage.setItem("loveChatUser", username);
}

const renderedIds = new Set();

/* LOAD MESSAGES (FIXED) */
async function loadMessages(){
  const { data, error } = await client
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if(error){
    console.error(error);
    return;
  }

  chatBox.innerHTML = "";
  renderedIds.clear();

  data.forEach(m => renderMessage(m));
  scrollBottom();
}

/* 🔥 IMPORTANT FIX */
window.onload = () => {
  setTimeout(loadMessages, 500);
};

/* REALTIME */
client
  .channel("love-chat")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    payload => {
      if(!renderedIds.has(payload.new.id)){
        renderMessage(payload.new);
        scrollBottom();
      }
    }
  )
  .subscribe();

/* SEND MESSAGE */
window.sendMessage = async function(){
  const text = msgInput.value.trim();
  if(!text) return;

  msgInput.value = "";

  const { error } = await client
    .from("messages")
    .insert({
      user_name: username,
      text: text
    });

  if(error){
    alert("Send failed ❌");
    console.error(error);
  }
};

/* RENDER MESSAGE */
function renderMessage(msg){
  if(renderedIds.has(msg.id)) return;
  renderedIds.add(msg.id);

  const div = document.createElement("div");
  div.className = "message " + (msg.user_name === username ? "sent" : "received");
  div.innerHTML = `<div class="text">${msg.text}</div>`;
  chatBox.appendChild(div);
}

/* SCROLL */
function scrollBottom(){
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* DELETE */
window.clearChat = async function(){
  if(!confirm("Delete chat? 💔")) return;
  await client.from("messages").delete().neq("id",0);
  chatBox.innerHTML="";
};

});
