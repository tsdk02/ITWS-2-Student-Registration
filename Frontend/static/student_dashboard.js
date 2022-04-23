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
            document.getElementById("student-dob").innerHTML = res.authenticatedUser.dob;
            document.getElementById("student-id").innerHTML = res.authenticatedUser.roll_no;
            document.getElementById("student-grade").innerHTML = res.authenticatedUser.semester;
            document.getElementById("student-section").innerHTML = res.authenticatedUser.branch;
            // document.getElementById("physics").innerHTML = resp.student[0].phy;
            // document.getElementById("chemistry").innerHTML = resp.student[0].chem;
            // document.getElementById("mathematics").innerHTML = resp.student[0].ma;
            // document.getElementById("computer").innerHTML = resp.student[0].comp;
            // document.getElementById("english").innerHTML = resp.student[0].eng;
            // document.getElementById("total").innerHTML = resp.student[0].total;
            // document.getElementById("percentage-data").innerHTML = resp.student[0].percent;
            // document.getElementById("status-data").innerHTML = resp.student[0].status;
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