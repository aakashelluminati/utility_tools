       
// Your web app's Firebase configuration
var firebaseConfig = {
    databaseURL: "https://logger-5727c-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyC2j-fqEcSd_IYYiVBlgnUJpFvxaHoCHQI",
    authDomain: "logger-5727c.firebaseapp.com",
    projectId: "logger-5727c",
    storageBucket: "logger-5727c.appspot.com",
    messagingSenderId: "72610148853",
    appId: "1:72610148853:web:41ebfe06d7a9ef8a61b0bc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
var database = firebase.database();

// Read the visitor count from the database and display it
database.ref('visitorCount').on('value', function(snapshot) {
    var count = snapshot.val();
    console.log("count : "+count);
    if (count === null) {
        count = 0;
    }
    set_visitor_count(count)
});

// Function to set current date in datepicker
function setCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    document.getElementById('datepicker').value = formattedDate;
}

// Call setCurrentDate function when page loads
window.addEventListener('load', init);

function init(){
    selected_user = localStorage.getItem("selected_user") || 0;
    setCurrentDate();
    setUserDropdown();
}

function increment_visitor_count(){
    // Increment the visitor count in the database on every page load
    database.ref('visitorCount').transaction(function(count) {
        if (count != null) {
            set_visitor_count(count)
        }
        return count + 1;
    });
}

function set_visitor_count(count){
    document.getElementById('visitor-count').innerHTML = "Insights Obtained " + count + " times";
}
var start_date = 0;
var end_date = 0;
var interval;
var breakData;
const totalDailyHours = 9
const users = [
    "Aakash",
    "Chirag",
    "Jaydip",
    "Dhyey",
    "Vishal"
]
var selected_user = 0;
var timeline = document.getElementById("timeline");
var totalDuration = totalDailyHours * 60 * 60 * 1000;

const config = [
    {
        accountId: "538403e43f2e415496e3736622e3bd0c",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjUzODQwM2U0M2YyZTQxNTQ5NmUzNzM2NjIyZTNiZDBjIiwiYXVkIjoic2VydmVyIn0.yWm2YCqy4AD84nHyyxGUG9IcxOKvsdQ1FWUlKlsp3iE"
    },
    {
        accountId: "ddf334d6d3104190aac2ba7b555ed282",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6ImRkZjMzNGQ2ZDMxMDQxOTBhYWMyYmE3YjU1NWVkMjgyIiwiYXVkIjoic2VydmVyIn0.U5ug4egWWmY7LkVZvxO3nF4Nx7tXdHsWip41ZwthONk"
    },
    {
        accountId: "ef7966c746af410d9332d04dd93a35d6",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6ImVmNzk2NmM3NDZhZjQxMGQ5MzMyZDA0ZGQ5M2EzNWQ2IiwiYXVkIjoic2VydmVyIn0.KYUheMSdzeN7BRuG_9XzNrJJ-9afu4jGNvk_z7kVmO8"
    },
    {
        accountId: "0c2695c5a4f34e5787418191f31ce924",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjBjMjY5NWM1YTRmMzRlNTc4NzQxODE5MWYzMWNlOTI0IiwiYXVkIjoic2VydmVyIn0.4Fx4Kui89TeUx3sBAtKLzkcadfO64SCiQDs1ahT0IyY"
    },
    {
        accountId: "40c3f8112c80470c8c9a47894aded0e5",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjQwYzNmODExMmM4MDQ3MGM4YzlhNDc4OTRhZGVkMGU1IiwiYXVkIjoic2VydmVyIn0.p1fPED6o0HnhZhvJbkjJgz_Nkx64jozCyCu1IDUkBZk"
    }
]
const populateTimeline = (breakData) => {
    timeline.innerHTML = ""
    totalDuration = breakData[breakData.length - 1].endTime - breakData[0].startTime
    if(totalDuration < (totalDailyHours * 60 * 60 * 1000)){
        totalDuration = totalDailyHours * 60 * 60 * 1000
    }
    // Loop through the sessions array and create a timeline element for each session
    for (var i = 0; i < breakData.length; i++) {
        var session = breakData[i];
        
        // Calculate the session duration and total duration including break time
        var sessionDuration = new Date(session.endTime) - new Date(session.startTime);
        // var totalDuration = sessionDuration + session.breakTime * 60 * 60 * 1000;
        
        // Calculate the start and end positions of the session in the timeline
        var startPosition = (session.startTime - breakData[0].startTime) / totalDuration * 100;
        var endPosition = (session.endTime -breakData[0].startTime) / totalDuration * 100;
        
        // Create a div element for the session and set its position and width
        var sessionElement = document.createElement("div");
        sessionElement.style.left = startPosition + "%";
        sessionElement.style.width = (endPosition - startPosition) + "%";
        
        // Add the active hours as text content to the session element
        sessionElement.title = getFormatedTime(session.startTime) + " - " + getFormatedTime(session.endTime) + " " + session.notes;
        
        // Add the session element to the timeline
        timeline.appendChild(sessionElement);
    }
    timeline.style.display = "block";

}

function getFormatedTime(time){
    const sessionEndTime = new Date(time);
    const hours = sessionEndTime.getHours() > 12 ? sessionEndTime.getHours() - 12 : sessionEndTime.getHours();
    const minutes = sessionEndTime.getMinutes();
    const ampm = sessionEndTime.getHours() >= 12 ? "PM" : "AM";
    const endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

    return endTimeStr;
}
const setUserDropdown = () => {
    const dropdown = document.getElementById("user-dropdown");
    console.log(dropdown)
    for (let i = 0; i < users.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = users[i];
        if(i == selected_user){
            option.selected = true;
        }
        dropdown.appendChild(option);
    }

    dropdown.addEventListener("change", () => {
        selected_user = dropdown.value;
        localStorage.setItem("selected_user", selected_user);
        console.log("selected_user : "+selected_user)
    });
};

const calculateEndTime = async () => {
    console.log(" *** calculateEndTime")
    localStorage.setItem("selected_user", selected_user);
        console.log("selected_user : "+selected_user)
    if(interval){
        clearInterval(interval);
    }
    getDate();

    let url = `https://api2.teamlogger.com/api/companies/278350e941c540cfb10c2010337f9385/approved_worksessions?startTime=` + start_date + `&endTime=` + end_date + `&accountId=` + config[selected_user].accountId;

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${config[selected_user].authToken}`
        }
    });

    breakData = await response.json();
    console.log(breakData)

    const startTime = new Date(breakData[0].startTime);

    let totalBreakTime = 0;

    for (let i = 1; i < breakData.length; i++) {
        const breakStartTime = new Date(breakData[i - 1].endTime);
        const breakEndTime = new Date(breakData[i].startTime);
        const breakDuration = breakEndTime - breakStartTime;
        totalBreakTime += breakDuration;
    }

    const totalSessionTime = totalDailyHours * 60 * 60 * 1000; // 9 hours in milliseconds
    const sessionEndTime = new Date(startTime.getTime() + totalSessionTime + totalBreakTime);

    const hours = sessionEndTime.getHours() > 12 ? sessionEndTime.getHours() - 12 : sessionEndTime.getHours();
    const minutes = sessionEndTime.getMinutes();
    const ampm = sessionEndTime.getHours() >= 12 ? "PM" : "AM";
    const endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

    document.getElementById("end-time").innerText = `Wrap up at ${endTimeStr}`;
    updateCountdown(sessionEndTime)
    // interval = setInterval(() => {
    //     updateCountdown(sessionEndTime)
    // }, 1000);
    increment_visitor_count();
    populateTimeline(breakData);

};


function updateCountdown(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');

    if(breakData[breakData.length - 1].stopped == false){
        if(distance < 0){
            countdownElement.innerHTML = "Go Home!!!";
        }else{
            countdownElement.innerHTML = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ':' + seconds.toString().padStart(2, "0") + ' remains';
        }
    }else{
        let sessionEndTime = new Date(breakData[breakData.length - 1].endTime);
        let hours = sessionEndTime.getHours() > 12 ? sessionEndTime.getHours() - 12 : sessionEndTime.getHours();
        let minutes = sessionEndTime.getMinutes();
        let ampm = sessionEndTime.getHours() >= 12 ? "PM" : "AM";
        let endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;

        if(breakData[breakData.length - 1].notes.length > 0){
            countdownElement.innerHTML = `Timer stopped At `+endTimeStr+`<br><span class="reason">Reason : `+breakData[breakData.length - 1].notes + `</span>`;
        }else{


            
                
            countdownElement.innerHTML = 'Timer stopped At '+endTimeStr;
        }
    }
}

// Update the countdown every second

function getDate() {
    var date = document.getElementById("datepicker").value;
    var milliseconds = new Date(date).getTime();
    start_date = milliseconds
    end_date = start_date + 86400000;
}

document.getElementById("calculate-btn").addEventListener("click", calculateEndTime);


// Get the stats button and visitor count elements
const statsButton = document.querySelector('#visitor-count-container');
const visitorCount = document.querySelector('#visitor-count');

 
  // Show/hide the visitor count element on mouseover/mouseout of the stats button
  statsButton.addEventListener('mouseover', function() {
    visitorCount.style.display = 'block';
  });
  
  statsButton.addEventListener('mouseout', function() {
    visitorCount.style.display = 'none';
  });