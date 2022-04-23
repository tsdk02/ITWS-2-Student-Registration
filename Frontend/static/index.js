// Login Information
var username = "admin";
var password = "admin";

function goToLogin(){
    if(JSON.parse(localStorage.getItem("isUserLoggedIn")) === true){
        localStorage.setItem("isUserLoggedIn", false);
        window.location.replace("./login.html");
    }
}

function checkLoginStatus(e){
    e.preventDefault();
    if(JSON.parse(localStorage.getItem("isUserLoggedIn")) === null || JSON.parse(localStorage.getItem("isUserLoggedIn")) === false){
        localStorage.setItem("isUserLoggedIn", false);
        window.location.replace("./login.html");
    }
    else{
        console.log(document.cookie);
        let username=document.cookie.split("=");
        console.log(username);
        document.getElementById("login").innerHTML = username[1] + ", Logout";
    }
}

const getUser = async ()=>{
    const res = await fetch("http://localhost:4009/authenticatedUser")

    const data = await res.json() 

    console.log(data);

    

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

    console.log(data.loggedInUser.name)

        // .then((resp) => resp.json()
        //     // if(resp.status === 200){
        //     //     console.log("authentication comp.")
        //     // }
        // )
        // .then((data) => {
        //     console.log("hello");
        //     console.log(data);

        //     // viewData.innerHTML = "";
        //     // function sortByRoll(a, b) {
        //     //     if (a.roll_id < b.roll_id) {
        //     //         return -1;
        //     //     }
        //     //     if (a.roll_id > b.roll_id) {
        //     //         return 1;
        //     //     }
        //     //     return 0;
        //     // }
        //     // resp.students.sort(sortByRoll);
        //     // var table = document.createElement("table");
        //     // var row_1 = document.createElement("tr");
            
        //     // table.setAttribute("class", "view-data-table");
        //     // row_1.setAttribute("class", "view-data-row_1");
        //     // const headers = ["#", "ID", "Name", "Grade", "Section", "Physics", "Chemistry", "Maths", "Computer", "English", "Total Marks", "Max Marks", "Percentage", "Status"];
        //     // for (var i = 0; i < 14; i++) {
        //     //     var th = document.createElement("th");
        //     //     th.setAttribute("class", "view-data-th");
        //     //     th.innerHTML = headers[i];
        //     //     row_1.appendChild(th);
        //     // }
        //     // table.appendChild(row_1);
        //     // var body = document.createElement("tbody");
        //     // body.setAttribute("class", "view-data-body");
        //     // resp.students.forEach((record, i) => {
        //     //     var tr = document.createElement("tr");
        //     //     tr.setAttribute("class", "view-data-tr");
        //     //     const cells = [i + 1, record.roll_id, record.name, record.grade, record.section, record.phy, record.chem, record.ma, record.comp, record.eng, record.total, record.max, record.percent, record.status]
        //     //     for (var j = 0; j < 14; j++) {
        //     //         var td = document.createElement("td");
        //     //         if(j == 0){
        //     //             td.innerHTML = cells[j];
        //     //             td.setAttribute("class", "view-data-first-column");
        //     //         }
        //     //         else if(j == 1){
        //     //             var div = document.createElement("div");
        //     //             div.innerHTML = cells[j];
        //     //             div.addEventListener("click", function(){goToStudent(record.roll_id)});
        //     //             div.setAttribute("class", "links-text");
        //     //             td.setAttribute("class", "view-data-td");
        //     //             td.append(div);
        //     //         }
        //     //         else if(j == 13){
        //     //             td.innerHTML = cells[j];
        //     //             if(td.innerHTML == "Pass"){
        //     //                 td.setAttribute("class", "view-data-pass");
        //     //             }
        //     //             else{
        //     //                 td.setAttribute("class", "view-data-fail");
        //     //             }
        //     //         }
        //     //         else{
        //     //             td.innerHTML = cells[j];
        //     //             td.setAttribute("class", "view-data-td");
        //     //         }
        //     //         tr.appendChild(td);;
        //     //     }
        //     //     body.appendChild(tr);
        //     // });
        //     // table.appendChild(body);
        //     // viewData.appendChild(table);
        // })
        // .catch((error) => console.log(error));
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

document.onkeydown=function(e){
    if(e.keyCode === 13){
        alert("Form submitted successfully!");
        window.location.replace("./index.html");
    }
}

function mouseIn(){
    // console.log("Mouse In");
    var element = document.getElementById("login");
    element.setAttribute("class", "box button2 hover");
}

function mouseOut(){
    // console.log("Mouse Out");
    var element = document.getElementById("login");
    element.classList.remove("hover");
}