// Your web app's Firebase configuration
var firebaseConfig = {
    databaseURL: "https://logger-5727c-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyC2j-fqEcSd_IYYiVBlgnUJpFvxaHoCHQI",
    authDomain: "logger-5727c.firebaseapp.com",
    projectId: "logger-5727c",
    storageBucket: "logger-5727c.appspot.com",
    messagingSenderId: "72610148853",
    appId: "1:72610148853:web:41ebfe06d7a9ef8a61b0bc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
var database = firebase.database();

// Read the visitor count from the database and display it
database.ref("visitorCount").on("value", function (snapshot) {
    var count = snapshot.val();
    console.log("count : " + count);
    if (count === null) {
        count = 0;
    }
    set_visitor_count(count);
});

// Function to set current date in datepicker
function setCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    if(document.getElementById("datepicker")){
        document.getElementById("datepicker").value = formattedDate;
    }
}

// Call setCurrentDate function when page loads
window.addEventListener("load", init);

const loading = document.getElementById('loading-container');
const myTable = document.getElementById('myTable');
const mainContainer = document.getElementById('main-container');
const no_data = document.getElementById('no_data');
let selected_month = [1672511400000, 1675189799000];

function init() {
    selected_user = localStorage.getItem("selected_teammember") || 0;
    setCurrentDate();
    setUserDropdown();
    setMonthDropdown();
    loading.style.display = 'none';
    if(myTable){
        myTable.style.display = 'none';
    }
}

function increment_visitor_count() {
    // Increment the visitor count in the database on every page load
    database.ref("visitorCount").transaction(function (count) {
        if (count != null) {
            set_visitor_count(count);
        }
        return count + 1;
    });
}

function set_visitor_count(count) {
    document.getElementById("visitor-count").innerHTML = "Insights Obtained " + count + " times";
}
var start_date = 0;
var end_date = 0;
var interval;
var breakData;
const totalDailyHours = 9;
const users = ["Aakash", "Chirag", "Jaydip", "Dhyey", "Vishal", "Tejash", "Shubham"];
var selected_user = 0;
var timeline = document.getElementById("timeline");
var totalDuration = totalDailyHours * 60 * 60 * 1000;

const config = [
    {
        accountId: "538403e43f2e415496e3736622e3bd0c",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjUzODQwM2U0M2YyZTQxNTQ5NmUzNzM2NjIyZTNiZDBjIiwiYXVkIjoic2VydmVyIn0.yWm2YCqy4AD84nHyyxGUG9IcxOKvsdQ1FWUlKlsp3iE",
    },
    {
        accountId: "ddf334d6d3104190aac2ba7b555ed282",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6ImRkZjMzNGQ2ZDMxMDQxOTBhYWMyYmE3YjU1NWVkMjgyIiwiYXVkIjoic2VydmVyIn0.U5ug4egWWmY7LkVZvxO3nF4Nx7tXdHsWip41ZwthONk",
    },
    {
        accountId: "ef7966c746af410d9332d04dd93a35d6",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6ImVmNzk2NmM3NDZhZjQxMGQ5MzMyZDA0ZGQ5M2EzNWQ2IiwiYXVkIjoic2VydmVyIn0.KYUheMSdzeN7BRuG_9XzNrJJ-9afu4jGNvk_z7kVmO8",
    },
    {
        accountId: "0c2695c5a4f34e5787418191f31ce924",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjBjMjY5NWM1YTRmMzRlNTc4NzQxODE5MWYzMWNlOTI0IiwiYXVkIjoic2VydmVyIn0.4Fx4Kui89TeUx3sBAtKLzkcadfO64SCiQDs1ahT0IyY",
    },
    {
        accountId: "40c3f8112c80470c8c9a47894aded0e5",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjQwYzNmODExMmM4MDQ3MGM4YzlhNDc4OTRhZGVkMGU1IiwiYXVkIjoic2VydmVyIn0.p1fPED6o0HnhZhvJbkjJgz_Nkx64jozCyCu1IDUkBZk",
    },
    {
        accountId: "c5d2d8d731674a7086627adf7bb4f8a9",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6ImM1ZDJkOGQ3MzE2NzRhNzA4NjYyN2FkZjdiYjRmOGE5IiwiYXVkIjoic2VydmVyIn0.oHFiG9QNf_X64elcyO5K50xq_6jRFMNGtsMneNO2AEY",
    },
    {
        accountId: "add053c09e694d58b81b5db75bad60b3",
        authToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6ImFkZDA1M2MwOWU2OTRkNThiODFiNWRiNzViYWQ2MGIzIiwiYXVkIjoic2VydmVyIn0.rWxPdqX8LzYbawJkH8650QZlSJkzJ82Dh-WYfgpqG_M",
    },
];
const populateTimeline = (breakData) => {
    timeline.innerHTML = "";
    totalDuration = breakData[breakData.length - 1].endTime - breakData[0].startTime;
    if (totalDuration < totalDailyHours * 60 * 60 * 1000) {
        totalDuration = totalDailyHours * 60 * 60 * 1000;
    }
    // Loop through the sessions array and create a timeline element for each session
    for (var i = 0; i < breakData.length; i++) {
        var session = breakData[i];

        // Calculate the session duration and total duration including break time
        var sessionDuration = new Date(session.endTime) - new Date(session.startTime);
        // var totalDuration = sessionDuration + session.breakTime * 60 * 60 * 1000;

        // Calculate the start and end positions of the session in the timeline
        var startPosition = ((session.startTime - breakData[0].startTime) / totalDuration) * 100;
        var endPosition = ((session.endTime - breakData[0].startTime) / totalDuration) * 100;

        // Create a div element for the session and set its position and width
        var sessionElement = document.createElement("div");
        sessionElement.style.left = startPosition + "%";
        sessionElement.style.width = endPosition - startPosition + "%";

        // Add the active hours as text content to the session element
        sessionElement.title = getFormatedTime(session.startTime) + " - " + getFormatedTime(session.endTime) + " " + session.notes;

        // Add the session element to the timeline
        timeline.appendChild(sessionElement);
    }
    timeline.style.display = "block";
};

function getFormatedTime(time) {
    const sessionEndTime = new Date(time);
    const hours = sessionEndTime.getHours() > 12 ? sessionEndTime.getHours() - 12 : sessionEndTime.getHours();
    const minutes = sessionEndTime.getMinutes();
    const ampm = sessionEndTime.getHours() >= 12 ? "PM" : "AM";
    const endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;

    return endTimeStr;
}
function getFormatedTimeFromNum(num) {

    // Extract the hours and minutes
    const hours = Math.floor(num);
    const minutes = Math.round((num - hours) * 60);

    // Convert to a string in the desired format
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return timeStr;
}

function getFormatedTime24(time) {
    const sessionEndTime = new Date(time);
    const hours = sessionEndTime.getHours();
    const minutes = sessionEndTime.getMinutes();
    const ampm = sessionEndTime.getHours() >= 12 ? "PM" : "AM";
    const endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return endTimeStr;
}
const setUserDropdown = () => {
    const dropdown = document.getElementById("user-dropdown");
    console.log(dropdown);
    for (let i = 0; i < users.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = users[i];
        if (i == selected_user) {
            option.selected = true;
        }
        dropdown.appendChild(option);
    }

    dropdown.addEventListener("change", () => {
        selected_user = dropdown.value;
        localStorage.setItem("selected_teammember", selected_user);
        console.log("selected_user : " + selected_user);
    });
};

const setMonthDropdown = () => {
    
    const selectMonth = document.getElementById("month-dropdown");
    if(selectMonth){
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
    
        for (let month = 0; month <= currentMonth; month++) {
            const option = document.createElement('option');
            option.value = `${month}-${currentYear}`;
            option.text = new Date(currentYear, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            selectMonth.appendChild(option);
        }

        selectMonth.addEventListener('change', () => {
            const [month, year] = selectMonth.value.split('-');
            console.log(month);
            console.log(year);
    
            const startDate = new Date(year, month , 1);
            console.log(startDate+"")
    
            const endDay = new Date(year, +month+1, 0).getDate(); // Get number of days in current month
            console.log(endDay)
    
            const endDate = new Date(year, month, endDay, 23, 59, 59); // Set end date to last day of month at 11:59:59 PM
            console.log(endDate+"")
    
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();
            selected_month = [startTimestamp, endTimestamp];
            console.log(selected_month);
          });
    }
};

const calculateEndTime = async () => {
    console.log(" *** calculateEndTime");
    localStorage.setItem("selected_teammember", selected_user);
    console.log("selected_user : " + selected_user);
    if (interval) {
        clearInterval(interval);
    }
    getDate();

    let url = `https://api2.teamlogger.com/api/companies/278350e941c540cfb10c2010337f9385/approved_worksessions?startTime=` + start_date + `&endTime=` + end_date + `&accountId=` + config[selected_user].accountId;
    loading.style.display = 'flex';
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${config[selected_user].authToken}`,
        },
    });
    loading.style.display = 'none';

    breakData = await response.json();

    if(breakData.length == 0){
        mainContainer.style.display = 'none';
        no_data.style.display = 'inline';
    }else{
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
        const endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;
    
        document.getElementById("end-time").innerText = `Wrap up at ${endTimeStr}`;
        updateCountdown(sessionEndTime);
        interval = setInterval(() => {
            updateCountdown(sessionEndTime);
        }, 1000);
        increment_visitor_count();
        populateTimeline(breakData);
        show_activity_breakdown(breakData);
        mainContainer.style.display = 'inline';
        no_data.style.display = 'none';

    }
};

function updateCountdown(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (breakData[breakData.length - 1].stopped == false) {
        if (distance < 0) {
            countdownElement.innerHTML = "Go Home!!!";
        } else {
            countdownElement.innerHTML = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + " remains";
        }
    } else {
        let sessionEndTime = new Date(breakData[breakData.length - 1].endTime);
        let hours = sessionEndTime.getHours() > 12 ? sessionEndTime.getHours() - 12 : sessionEndTime.getHours();
        let minutes = sessionEndTime.getMinutes();
        let ampm = sessionEndTime.getHours() >= 12 ? "PM" : "AM";
        let endTimeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;

        if (breakData[breakData.length - 1].notes.length > 0) {
            countdownElement.innerHTML = `Timer stopped At ` + endTimeStr + `<br><span class="reason">Reason : ` + breakData[breakData.length - 1].notes + `</span>`;
        } else {
            countdownElement.innerHTML = "Timer stopped At " + endTimeStr;
        }
    }
}

// Update the countdown every second

function getDate() {
    var date = document.getElementById("datepicker").value; 

    console.log(new Date(date))
    var milliseconds = new Date(date).getTime();
    start_date = milliseconds;
    end_date = start_date + 86400000;
}

if(document.getElementById("calculate-btn")){
    document.getElementById("calculate-btn").addEventListener("click", calculateEndTime);
}



// Get the stats button and visitor count elements
const statsButton = document.querySelector("#visitor-count-container");
const visitorCount = document.querySelector("#visitor-count");

if(statsButton){
    // Show/hide the visitor count element on mouseover/mouseout of the stats button
    statsButton.addEventListener("mouseover", function () {
        visitorCount.style.display = "block";
    });
    
    statsButton.addEventListener("mouseout", function () {
        visitorCount.style.display = "none";
    });
}

function show_activity_breakdown(json) {
    let tableBody = document.querySelector("#myTable tbody");
    tableBody.innerHTML = "";
    json.forEach((element) => {
        let period = getFormatedTime24(element.startTime) + " - " + getFormatedTime24(element.endTime).toLocaleString();
        let duration = decimalHoursToHoursMinutes(element.activeHours);
        
        if(duration != "0h 0m"){
            if(duration.substr(0,2) == "0h"){
                duration = duration.substr(3,)
            }
            let activityLevel = element.activityLevel != "NA" ? " (" + element.activityLevel + "%)" : "";
            let task = element.projectName + ": " + element.projectTaskName + activityLevel;
            let notes = element.notes;
    
            let newRow = tableBody.insertRow();
            if (element.mmode == true) {
                newRow.className = "meeting";
            }
    
            let cell1 = newRow.insertCell(0);
            cell1.innerHTML = period;
    
            let cell2 = newRow.insertCell(1);
            cell2.innerHTML = duration;
    
            let cell3 = newRow.insertCell(2);
            cell3.innerHTML = task;
    
            let cell4 = newRow.insertCell(3);
            cell4.innerHTML = notes;
        }
    });
    myTable.style.display = 'inline';

}

function decimalHoursToHoursMinutes(decimalHours) {
    let hours = Math.floor(decimalHours);
    let minutes = Math.round((decimalHours - hours) * 60);
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }
    let hoursText = hours > 1 ? "h" : "h";
    let minutesText = minutes > 1 ? "m" : "m";
    return hours + "" + hoursText + " " + minutes + "" + minutesText;
}


/* Calender view  */

const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

const formatDate = (date) => {
    date = new Date(date)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
};

const formatDateInTime = (timestamp) => {
    // Create a new Date object from the timestamp
    const dateObj = new Date(timestamp);
    // Convert to a string in the desired time zone
    const timeZone = 'Asia/Kolkata'; // Example time zone
    const timeStr = dateObj.toLocaleTimeString('en-US', { timeZone, hour12: true });
    console.log(timeStr);
    // Extract hours and minutes and format as "hh:mm AM/PM"
    const [hours,ampm] = timeStr.split(' ');
    console.log(ampm);
    const [hh, mm] = hours.split(':');
    const formattedTime = `${hh.padStart(2, '0')}:${mm} ${ampm}`;
    return formattedTime
};

const showCalenderData = async () => {
    // let start_date = 1680287400000
    // let end_date = 1682879399000

    console.log(selected_month);



    let start_date = +selected_month[0]
    let end_date = +selected_month[1]

    let url = `https://api2.teamlogger.com/api/companies/278350e941c540cfb10c2010337f9385/reports_new2?includeLeaves=true&startTime=`+start_date+`&endTime=`+end_date+`&dayStartCutOff=14400000&dayEndCutOff=14399999&suppressDetails=false&groupId=ALL&includeSessionTimings=true`

    // let url = `https://api2.teamlogger.com/api/companies/278350e941c540cfb10c2010337f9385/approved_worksessions?startTime=` + start_date + `&endTime=` + end_date + `&accountId=` + config[selected_user].accountId;
    loading.style.display = 'flex';
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${config[selected_user].authToken}`,
        },
    });
    loading.style.display = 'none';

    data = await response.json();

    const calendar = document.getElementById('calendar');
    const dates = data.daywiseSummary.daywiseSummaryDetails.map(d => { console.log(d.firstSessionStartTime); formatDate(new Date(d.firstSessionStartTime))});
    const uniqueDates = [...new Set(dates)];

    // Create the table header
    const headerRow = document.createElement('tr');
    uniqueDates.forEach(date => {
        const headerCell = document.createElement('th');
        headerCell.textContent = date;
        headerRow.appendChild(headerCell);
    });
    calendar.appendChild(headerRow);


    // const empDetail = document.getElementById('emp_detail');
    // const monthDetail = document.getElementById('monthDetail');

    // empDetail.innerHTML = ``;
    // monthDetail.innerHTML = `<span>`+data[0]["Employee Name"]+`</span>`;

    // Create the table body
    const nameToRow = new Map();

        const today = new Date(data.startTime);
        console.log("today : "+today);
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const daysInCurrentMonth = daysInMonth(currentYear, currentMonth);
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const emp_name = data.daywiseSummary.daywiseSummaryDetails ? data.daywiseSummary.daywiseSummaryDetails[0].employeeName : "";
        let html = `<table><tr><th style="background-color: white;color: black;border: solid #555555;">`+new Date(data.startTime).toLocaleString('default', { month: 'long' })+ ` `+ new Date(data.startTime).getFullYear() +`</th><th colspan="6" style="background-color: white;color: black;border: solid #555555;">`+emp_name+`</th></tr>`;
        html += "<tr style='border: 1px solid;'><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>";

        let date = 1;
        for (let i = 0; i < 5; i++) {
            html += "<tr>";
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    html += "<td></td>";
                } else if (date > daysInCurrentMonth) {
                    html += "<td></td>";
                } else {

                    
                    const formattedDate = formatDate(new Date(currentYear, currentMonth, date));
                    const dayData = data.daywiseSummary.daywiseSummaryDetails.find(d => formatDate(d.firstSessionStartTime) === formattedDate);
                    const attendanceFlag = dayData ? dayData["Attendance Flag"] : "-";
                    
                    console.log(dayData)
                    if(dayData){
                        console.log(dayData.totalHours)
                    }

                    // const timerValue = dayData ? dayData["Timer"] : "-";
                    // const idleValue = dayData ? dayData["Idle"] : "-";
                    // const inclusuveIdleValue = dayData ? dayData["Total Inc Idle"] : "-";
                    // const punchInValue = dayData ? dayData["Punch In"] : "-";
                    // const punchOutValue = dayData ? dayData["Punch Out"] : "-";

                    const timerValue = dayData ? getFormatedTimeFromNum(dayData.totalHours) : "-"; ;
                    const idleValue = dayData ? getFormatedTimeFromNum(dayData.idleHours) : 0; ;
                    const inclusuveIdleValue = dayData ? "0" : "00:00"; ;

                    const punchInValue = dayData ? formatDateInTime(dayData.firstSessionStartTime) : "-"; ;
                    const punchOutValue = dayData ? formatDateInTime(dayData.lastSessionEndTime) : "-"; ;

                    console.log("timerValue  : "+timerValue);
                    if (dayData) {
                        if(idleValue != "00:00"){

                           
                            console.log("here 1");

                            html += `<td class="idle">${date}`
                            if(timerValue != "-"){
                                html += `<br> ${timerValue}`;
                            }
                            if(idleValue != "00:00"){
                                html += `<br>Idle: ${idleValue}`;
                            }
                            if(inclusuveIdleValue != "00:00"){
                                html += `<br><div class="tooltip">Inc: ${inclusuveIdleValue} 
                                                                            <span class="tooltiptext">${timerValue}<br>Inc: ${inclusuveIdleValue}<br>Idle: ${idleValue}<br>Punch In: ${punchInValue}<br>Punch Out: ${punchOutValue}</span>
                                                                        </div>`;
                            }
                            html += `</td>`;
                        }else{

                            const timeString = timerValue;
                            const [hours, minutes] = timeString.split(":");
                            const seconds = hours * 60 * 60 + minutes * 60;
                            const nineHoursInSeconds = 9 * 60 * 60;


                            const halfHoursInSeconds = 4.5 * 60 * 60;


                            if (seconds > nineHoursInSeconds-1) {
                                html += `<td class="present1">${date}`
                                if(timerValue != "-"){
                                    html += `<div class="tooltip"> ${timerValue} 
                                                                            <span class="tooltiptext">${timerValue}<br>Inc: ${inclusuveIdleValue}<br>Idle: ${idleValue}<br>Punch In: ${punchInValue}<br>Punch Out: ${punchOutValue}</span>
                                                                        </div>`;
                                }
                                html += `</td>`;
                            } else if (seconds > halfHoursInSeconds-1) {
                                html += `<td class="present">${date}`
                                if(timerValue != "-"){
                                    html += `<div class="tooltip"> ${timerValue} 
                                                <span class="tooltiptext">${timerValue}<br>Inc: ${inclusuveIdleValue}<br>Idle: ${idleValue}<br>Punch In: ${punchInValue}<br>Punch Out: ${punchOutValue}</span>
                                            </div>`;
                                }
                                html += `</td>`;
                            }else {
                                html += `<td class="present2">${date}`
                                if(timerValue != "-"){
                                    html += `<div class="tooltip"> ${timerValue}  <br>(Half Day)
                                                <span class="tooltiptext">${timerValue}<br>Inc: ${inclusuveIdleValue}<br>Idle: ${idleValue}<br>Punch In: ${punchInValue}<br>Punch Out: ${punchOutValue}</span>
                                            </div>`;
                                }
                                html += `</td>`;
                                    
                            }

                            
                        }

                    } else {
                        html += `<td class="absent">${date}`
                        // if(timerValue != "-"){
                        //     html += `<br>Timer: ${timerValue}`;
                        // }
                        // if(idleValue != "-"){
                        //     html += `<br>Idle: ${idleValue}`;
                        // }
                        html += `</td>`;
                    }
                    date++;
                }
            }
            html += "</tr>";
        }

        html += "</table>";
        calendar.innerHTML = html;

}
if(document.getElementById("get_calender_data")){
    document.getElementById("get_calender_data").addEventListener("click", showCalenderData);
}