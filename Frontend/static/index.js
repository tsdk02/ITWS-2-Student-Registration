// Login Information
var username = "admin";
var password = "admin";

function goToLogin() {
  window.location.replace("./login.html");
}
function goToStudentDashboard() {
  window.location.replace("./student_dashboard.html");
}
function goToAdminDashboard() {
  window.location.replace("./admin_dashboard.html");
}

function checkLoginStatus(e) {
  e.preventDefault();
  if (
    JSON.parse(localStorage.getItem("isUserLoggedIn")) === null ||
    JSON.parse(localStorage.getItem("isUserLoggedIn")) === false
  ) {
    localStorage.setItem("isUserLoggedIn", false);
    // window.location.replace("./login_admin.html");
  } else {
    console.log(document.cookie);
    let username = document.cookie.split("=");
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
  });

  const data = await response.json();
  // console.log("Data is : " + uname);

  if (uname === "admin" && pword === "admin") {
    document.cookie = "username=" + uname;
    localStorage.setItem("isUserLoggedIn", true);
    window.location.replace("./index.html");
    goToAdminDashboard();
  } else {
    goToStudentDashboard();
  }
}

function login(e) {
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

function loginAdmin(e) {
  e.preventDefault();
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  if (user === username && pass === password) {
    document.cookie = "username=" + user;
    localStorage.setItem("isUserLoggedIn", true);
    window.location.replace("./index.html");
  } else {
    alert("Username or password is incorrect");
  }
  console.log(user + " " + pass);
  // check(uname, pword);
}

document.onkeydown = function (e) {
  if (e.keyCode === 13) {
    alert("Form submitted successfully!");
    window.location.replace("./index.html");
  }
};

function mouseInStudent() {
  // console.log("Mouse In");
  var element = document.getElementById("student-login");
  element.setAttribute("class", "box button2 hover");
}
function mouseInAdmin() {
  // console.log("Mouse In");
  var element = document.getElementById("admin-login");
  element.setAttribute("class", "box button2 hover");
}

function mouseOutStudent() {
  // console.log("Mouse Out");
  var element = document.getElementById("student-login");
  element.classList.remove("hover");
}
function mouseOutAdmin() {
  // console.log("Mouse Out");
  var element = document.getElementById("admin-login");
  element.classList.remove("hover");
}

function verification(e) {
  e.preventDefault();
  var roll_no = localStorage.getItem("enroll_no");
  getUserVerification(roll_no);
}

async function getUserVerification(roll_no) {
  const args = {
    roll_no: roll_no,
  };

  console.log("get user ver");

  const response = await fetch(`http://localhost:4009/users/${roll_no}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  console.log(res);

  document.getElementById("student-name").innerHTML = res.user[0].name;
  document.getElementById("student-gender").innerHTML = res.user[0].gender;
  document.getElementById("student-dob").innerHTML = res.user[0].dob.substring(
    0,
    10
  );
  document.getElementById("student-id").innerHTML = res.user[0].roll_no;
  document.getElementById("student-grade").innerHTML = res.user[0].semester;
  document.getElementById("student-section").innerHTML = res.user[0].branch;
  document.getElementById("student-email-id").innerHTML = res.user[0].email_id;
  document.getElementById("student-contact-no").innerHTML =
    res.user[0].contact_no;
  document.getElementById("parent-contact-no").innerHTML =
    res.user[0].parent_contact_number;
  document.getElementById("student-cgpa").innerHTML = res.user[0].cgpa;
  if (res.user[0].registration === "YES" && res.user[0].fee_payment === "FULL PAY" && res.user[0].verification === "YES") {
    document.getElementById("registration-msg").innerHTML = "Student's Verification is successful!";
    var btn = document.getElementById("verify-button");
    btn.classList.add("hidden");
  }
  else if (res.user[0].registration === "YES" && res.user[0].fee_payment === "FULL PAY") {
    document.getElementById("registration-msg").innerHTML = "Please verify the Student's Registration and Payment!";
    var btn = document.getElementById("verify-button");
    btn = addEventListener("click", function () {
      verify_btn(res.user[0].roll_no);
    });
  }
  else{
    document.getElementById("registration-msg").innerHTML = "The Student has not completed the Registration and Fee Payment yet!";
    var btn = document.getElementById("verify-button");
    btn.classList.add("disabled");

  }

  //   if (
  //     res.authenticatedUser.registration === "YES" &&
  //     res.authenticatedUser.fee_payment === "FULL PAY"
  //   ) {
  //     document.getElementById("registration-msg").innerHTML =
  //       "Please verify the Student!";
  //     var btn = document.getElementById("registration-btn");
  //     btn.addEventListener("click", function () {
  //       verifyStudent(res.authenticatedUser.roll_no);
  //     });
  //   }
  // })
  // .catch((error) => console.log(error));
}

function verifyStudent(e) {
  e.preventDefault();
  verification_of_Student();
}

async function verify_btn(roll_no) {
  const args = {
    roll_no: roll_no,
  };
  const response = await fetch("http://localhost:4009/verify_student", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  const data = await response.json()
  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log(error));
}


async function verification_of_Student(roll_no) {
  const args = {
    roll_no: roll_no,
  };
  const response = await fetch(`http://localhost:4009/users/${roll_no}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  console.log(res);
}
