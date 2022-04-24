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
                    var full = document.getElementById("full-pay-btn");
                    full.classList.add("disabled");
                    document.getElementById("verify-msg").innerHTML = "Partial Payment is successful.  Please complete the remaining payment!"
                }
                else if(res.authenticatedUser.fee_payment === "NO PAY"){
                    document.getElementById("payment-msg").innerHTML = "Please choose either Full Payment or Partial Payment!"
                    var partial = document.getElementById("partial-pay-btn");
                    partial.addEventListener("click", function(){enableOtpTextPartial()});
                    var full = document.getElementById("full-pay-btn");
                    full.addEventListener("click", function(){enableOtpTextFull()});
                }
                // document.getElementByClassName("disabled").disabled=true;
            }
            
        })
        .catch((error) => console.log(error));
}
function enableOtpTextPartial(){
    // e.preventDefault();
    console.log("hello");
    var otpBtnPartial = document.getElementById("otp-box-partial")
    otpBtnPartial.classList.remove("hidden");  
    // console.log(typeof otpBoxPartial);
    // otpBoxPartial.classList.remove("hidden", 'primary'); 
}
function enableOtpTextFull(){
    // e.preventDefault();
    console.log("hello");
    var otpBtnFull = document.getElementById("otp-box-full")
    otpBtnFull.classList.remove("hidden");  
    // console.log(typeof otpBoxPartial);
    // otpBoxPartial.classList.remove("hidden", 'primary'); 
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