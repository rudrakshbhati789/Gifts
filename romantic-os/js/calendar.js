let date = new Date();
let selectedDate = "";

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const modal = document.getElementById("eventModal");
const eventText = document.getElementById("eventText");

const events = JSON.parse(localStorage.getItem("loveEvents") || "{}");

function renderCalendar(){
  calendar.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.innerText =
    date.toLocaleString("default",{month:"long"}) + " " + year;

  const firstDay = new Date(year,month,1).getDay();
  const days = new Date(year,month+1,0).getDate();

  for(let i=0;i<firstDay;i++){
    calendar.appendChild(document.createElement("div"));
  }

  for(let d=1; d<=days; d++){
    const cell = document.createElement("div");
    const key = `${year}-${month}-${d}`;
    cell.innerText = d;

    if(events[key]){
      cell.classList.add("heart");
      cell.title = events[key];
    }

    cell.onclick = ()=>{
      selectedDate = key;
      eventText.value = events[key] || "";
      modal.style.display="flex";
    };

    calendar.appendChild(cell);
  }
}

function saveEvent(){
  if(eventText.value.trim()){
    events[selectedDate] = eventText.value;
  }else{
    delete events[selectedDate];
  }
  localStorage.setItem("loveEvents", JSON.stringify(events));
  closeModal();
  renderCalendar();
}

function closeModal(){
  modal.style.display="none";
}

function prevMonth(){
  date.setMonth(date.getMonth()-1);
  renderCalendar();
}

function nextMonth(){
  date.setMonth(date.getMonth()+1);
  renderCalendar();
}

renderCalendar();
