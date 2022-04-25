function getStudentDetails(e){
    e.preventDefault();
    getUser();
}

const getUser = async ()=>{
    const res = await fetch ("http://localhost:4009/authenticatedUser", {credentials: "include"})

    const data = await res.json() 

    // console.log(data.authenticatedUser.cgpa);
    // .   then((res) => res.json())
        .then((res) => {
            console.log(res);
            console.log(res.authenticatedUser.registration);

            document.getElementById("student-name").innerHTML = res.authenticatedUser.name;
            document.getElementById("student-gender").innerHTML = res.authenticatedUser.gender;
            document.getElementById("student-dob").innerHTML = res.authenticatedUser.dob.substring(0,10);
            document.getElementById("student-id").innerHTML = res.authenticatedUser.roll_no;
            document.getElementById("student-grade").innerHTML = res.authenticatedUser.semester;
            document.getElementById("student-section").innerHTML = res.authenticatedUser.branch;
            document.getElementById("student-email-id").innerHTML = res.authenticatedUser.email_id;
            document.getElementById("student-contact-no").innerHTML = res.authenticatedUser.contact_no;
            document.getElementById("parent-contact-no").innerHTML = res.authenticatedUser.parent_contact_number;
            document.getElementById("student-cgpa").innerHTML = res.authenticatedUser.cgpa;
            
            if(res.authenticatedUser.registration === "NO"){
                document.getElementById("registration-msg").innerHTML = "Please register yourself for the next semester by clicking the Register Button!"
                var btn = document.getElementById("registration-btn");
                btn.addEventListener("click", function(){updateRegistration(res.authenticatedUser.roll_no)});
                document.getElementById("payment-msg").innerHTML = "Please complete the Registration first before Payment!"
                var partial = document.getElementById("partial-pay-btn");
                partial.classList.add("disabled");
                // partial.addEventListener("click", function(){enableOtpTextPartial()});
                
                var full = document.getElementById("full-pay-btn");
                full.classList.add("disabled");
                full.addEventListener("click", function(){enableOtpTextFull()});

            }       
            else if(res.authenticatedUser.registration === "YES"){
                document.getElementById("registration-msg").innerHTML = "You have successfully registered for the next semester!"
                var btn = document.getElementById("registration-btn");
                btn.classList.add("disabled");
                if(res.authenticatedUser.fee_payment === "FULL PAY"){
                    var partial = document.getElementById("partial-pay-btn");
                    partial.classList.add("disabled");
                    var full = document.getElementById("full-pay-btn");
                    full.classList.add("disabled");
                    if(res.authenticatedUser.verification === "NO"){
                        document.getElementById("verify-msg").innerHTML = "Full Payment is successful. Verification is under progress!"
                    }
                    else if(res.authenticatedUser.verification === "YES"){
                        document.getElementById("verify-msg").innerHTML = "Full Payment is successful. Verification is completed!"
                    }
                }
                else if(res.authenticatedUser.fee_payment === "PARTIAL PAY"){
                    var full = document.getElementById("full-btn");
                    // full.classList.add("hidden");
                    full.innerHTML="Remaining Payment"
                    var partial = document.getElementById("partial-pay-btn");
                    partial.classList.add("hidden");
                    full.addEventListener("click", function(){enableOtpTextFull()});
                    // partial.addEventListener("click", function(){generateOTP_partial()});
                    full.addEventListener("click", function(){generateOTP_full()});
                    document.getElementById("verify-msg").innerHTML = "Partial Payment is successful.  Please complete the remaining payment!"
                }
                else if(res.authenticatedUser.fee_payment === "NO PAY"){
                    document.getElementById("payment-msg").innerHTML = "Please choose either Full Payment or Partial Payment!"
                    var partial = document.getElementById("partial-btn");
                    partial.addEventListener("click", function(){enableOtpTextPartial()});
                    partial.addEventListener("click", function(){generateOTP_partial()});
                    var full = document.getElementById("full-btn");
                    full.addEventListener("click", function(){enableOtpTextFull()});
                    full.addEventListener("click", function(){generateOTP_full()});
                }
                // document.getElementByClassName("disabled").disabled=true;
            }
            
        })
        .catch((error) => console.log(error));
}

async function sendEmail(otp) {
    const args = {
        otp: otp,
    };
    const response = await fetch("http://localhost:4009/send", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })

}


function enableOtpTextPartial(){
    // e.preventDefault();
    console.log("hello");
    var otpBtnPartial = document.getElementById("otp-box-partial")
    otpBtnPartial.classList.remove("hidden");  
    var submit = document.getElementById("partial-btn-submit");
    submit.classList.remove("hidden");
    var partial = document.getElementById("partial-btn");
    partial.classList.add("disabled");
    var full = document.getElementById("full-btn");
    full.classList.add("disabled");
    full.classList.add("hidden");
    // console.log(typeof otpBoxPartial);
    // otpBoxPartial.classList.remove("hidden", 'primary'); 
}
function enableOtpTextFull(){
    // e.preventDefault();
    console.log("hello");
    var otpBtnFull = document.getElementById("otp-box-full")
    otpBtnFull.classList.remove("hidden");  
    var submit = document.getElementById("full-btn-submit");
    submit.classList.remove("hidden");
    var partial = document.getElementById("partial-btn");
    partial.classList.add("disabled");
    var full = document.getElementById("full-btn");
    full.classList.add("disabled");
    partial.classList.add("hidden");

    // console.log(typeof otpBoxPartial);
    // otpBoxPartial.classList.remove("hidden", 'primary'); 
}
var otp;
function generateOTP_partial(){
    // e.preventDefault();
    otp = Math.floor(Math.random() * (10000 - 1000) ) + 1000;
    console.log(otp);
    sendEmail(otp);
    // validateOTP(otp);
    
}

function generateOTP_full(){
    // e.preventDefault();
    otp = Math.floor(Math.random() * (10000 - 1000) ) + 1000;
    console.log(otp);
    sendEmail(otp);
    // validateOTP(otp);
}

function validateOTP_partial(){
    // e.preventDefault();
    var userOTP = document.getElementById("otp-box-partial").value;
    // console.log(userOTP);
    // console.log(userOTP, otp)
    if(userOTP == otp){
        updatePayment_partial();
    }
}

function validateOTP_full(){
    // e.preventDefault();
    var userOTP = document.getElementById("otp-box-full").value;
    // console.log(userOTP);
    // console.log(userOTP, otp)
    if(userOTP == otp){
        updatePayment_full();
    }
}


const updatePayment_partial = async ()=>{
    const res = await fetch ("http://localhost:4009/partial_payment", {credentials: "include", method: "PATCH"})

    const data = await res.json() 
    // console.log(data);
    // console.log("hello");
    .then((res) => {
        console.log(res.authenticatedUser.fee_payment);
        goToStudentDashboard();
    })

}

const updatePayment_full = async ()=>{
    const res = await fetch ("http://localhost:4009/full_payment", {credentials: "include", method: "PATCH"})

    const data = await res.json() 
    // console.log(data);
    // console.log("hello");
    .then((res) => {
        console.log(res.authenticatedUser.fee_payment);
        goToStudentDashboard();
    })

}

function validateOTP_fulll(){
    // e.preventDefault();
    var userOTP = document.getElementById("otp-box-full").value;
    // console.log(userOTP);
    // console.log(userOTP, otp)
    if(userOTP == otp){
        updatePayment_full();
    }
}

function updateRegistration(roll_no){
    // e.preventDefault();
    console.log(roll_no);
    register();
}
    
const register = async ()=>{
    const res = await fetch ("http://localhost:4009/register_student", {credentials: "include", method: "PATCH"})

    const data = await res.json() 
    // console.log(data);
    // console.log("hello");
    .then((res) => {
        console.log(res.authenticatedUser.registration);
        goToStudentDashboard();
    })

}
function hello(){
    console.log("hello");
}

function goToStudentDashboard(){
    window.location.replace("./student_dashboard.html");
}