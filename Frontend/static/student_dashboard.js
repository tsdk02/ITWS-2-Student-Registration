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
            
         
            // if(resp.student[0].status == "Pass"){
            //     document.getElementById("status-data").style.color = "green";
            // }
            // else{
            //     document.getElementById("status-data").style.color = "#c9060d";
            // }
            // if(resp.student[0].status == "Pass"){
            //     document.getElementById("percentage-data").style.color = "green";
            // }
            // else{
            //     document.getElementById("percentage-data").style.color = "#c9060d";
            // }
            // if(resp.student[0].status == "Pass"){
            //     var img = document.getElementById("pass-fail-image");
            //     img.innerHTML="<img src=../resources/pass.png width=\"50px\">";
            // }
            // else{
            //     var img = document.getElementById("pass-fail-image");
            //     img.innerHTML="<img src=../resources/fail.png width=\"50px\">";
            // }
            
        })
        .catch((error) => console.log(error));

    

}