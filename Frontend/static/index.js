// Login Information
var username = "admin";
var password = "admin";

function goToLogin(){
    window.location.replace("./login.html");
}
function goToStudentDashboard(){
    window.location.replace("./student_dashboard.html");
}
function goToAdminDashboard(){
    window.location.replace("./admin_dashboard.html");
}


function checkLoginStatus(e){
    e.preventDefault();
    if(JSON.parse(localStorage.getItem("isUserLoggedIn")) === null || JSON.parse(localStorage.getItem("isUserLoggedIn")) === false){
        localStorage.setItem("isUserLoggedIn", false);
        // window.location.replace("./login_admin.html");
    }
    else{
        console.log(document.cookie);
        let username=document.cookie.split("=");
        console.log(username);
        document.getElementById("login").innerHTML = username[1] + ", Logout";
    }
}

async function check(uname, pword) {
    const args = {
        uname: uname,
        pword: pword,
    };
    const response = await fetch("http://localhost:4009/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })

    const data = await response.json()
    // console.log("Data is : " + uname);

    if(uname === "admin" && pword === "admin"){
        document.cookie = "username=" + uname;
        localStorage.setItem("isUserLoggedIn", true);
        window.location.replace("./index.html");
        goToAdminDashboard();
    }else{
        goToStudentDashboard();
    }

}

function login(e){
    e.preventDefault();
    var uname = document.getElementById("username").value;
    var pword = document.getElementById("password").value;
    // if(uname === username && pword === password){
    //     document.cookie = "username=" + uname;
    //     localStorage.setItem("isUserLoggedIn", true);
    //     window.location.replace("./index.html");
    // }        
    // else{
    //     alert("Username or password is incorrect")
    // }
    console.log(uname + " " + pword);
    check(uname, pword);

}

function loginAdmin(e){
    e.preventDefault();
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    if(user === username && pass === password){
        document.cookie = "username=" + user;
        localStorage.setItem("isUserLoggedIn", true);
        window.location.replace("./index.html");
    }        
    else{
        alert("Username or password is incorrect")
    }
    console.log(user + " " + pass);
    // check(uname, pword);

}

document.onkeydown=function(e){
    if(e.keyCode === 13){
        alert("Form submitted successfully!");
        window.location.replace("./index.html");
    }
}

function mouseInStudent(){
    // console.log("Mouse In");
    var element = document.getElementById("student-login");
    element.setAttribute("class", "box button2 hover");
}
function mouseInAdmin(){
    // console.log("Mouse In");
    var element = document.getElementById("admin-login");
    element.setAttribute("class", "box button2 hover");
}

function mouseOutStudent(){
    // console.log("Mouse Out");
    var element = document.getElementById("student-login");
    element.classList.remove("hover");
}
function mouseOutAdmin(){
    // console.log("Mouse Out");
    var element = document.getElementById("admin-login");
    element.classList.remove("hover");
}