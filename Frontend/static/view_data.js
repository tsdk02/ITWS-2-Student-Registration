var viewData = document.querySelector(".view-data");

function goToStudent(roll_id){
    console.log(roll_id);
    localStorage.setItem("enroll_no", JSON.stringify(roll_id));
    window.location.replace("./student_verification.html");
}

async function collect_data(semester, branch) {
    const args = {
        semester: semester,
        branch: branch,
    };  
   
    const response = await fetch("http://localhost:4009/semester_branch", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
    })
    const data = await response.json()
    // .then((resp)=> resp.json())
    // .then((resp)=>{
    //     console.log(data);
    // })
        // .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp);
            viewData.innerHTML = "";
            function sortByRoll(a, b) {
                if (a.roll_no< b.roll_no) {
                    return -1;
                }
                if (a.roll_no > b.roll_no) {
                    return 1;
                }
                return 0;
            }
            resp.users.sort(sortByRoll);
            var table = document.createElement("table");
            var row_1 = document.createElement("tr");
            
            table.setAttribute("class", "view-data-table");
            row_1.setAttribute("class", "view-data-row_1");
            const headers = ["#", "Enrollment No", "Name", "Gender", "DOB","Semester", "Branch", "CGPA","Contact No", "Parent Contact No", "Registration", "Fee Payment", "Verification"];
            for (var i = 0; i < 13; i++) {
                var th = document.createElement("th");
                th.setAttribute("class", "view-data-th");
                th.innerHTML = headers[i];
                row_1.appendChild(th);
            }
            table.appendChild(row_1);
            var body = document.createElement("tbody");
            body.setAttribute("class", "view-data-body");
            resp.users.forEach((record, i) => {
                var tr = document.createElement("tr");
                tr.setAttribute("class", "view-data-tr");
                const cells = [i + 1, record.roll_no, record.name, record.gender, record.dob.substring(0,10), record.semester, record.branch, record.cgpa, record.contact_no, record.parent_contact_number, record.registration, record.fee_payment, record.verification]
                for (var j = 0; j < 13; j++) {
                    var td = document.createElement("td");
                    if(j == 0){
                        td.innerHTML = cells[j];
                        td.setAttribute("class", "view-data-first-column");
                    }
                    else if(j == 1){
                        var div = document.createElement("div");
                        div.innerHTML = cells[j];
                        div.addEventListener("click", function(){goToStudent(record.roll_no)});
                        div.setAttribute("class", "links-text");
                        td.setAttribute("class", "view-data-td");
                        td.append(div);
                    }
                    else if(j == 12){
                        td.innerHTML = cells[j];
                        if(td.innerHTML == "YES"){
                            td.setAttribute("class", "view-data-pass");
                        }
                        else{
                            td.setAttribute("class", "view-data-fail");
                        }
                    }
                    else{
                        td.innerHTML = cells[j];
                        td.setAttribute("class", "view-data-td");
                    }
                    tr.appendChild(td);;
                }
                body.appendChild(tr);
            });
            table.appendChild(body);
            viewData.appendChild(table);
        })
        .catch((error) => console.log(error));
}

function get_data(e) {
    e.preventDefault();
    var semester= document.getElementById("semester").value;
    var branch = document.getElementById("branch").value;
    if (semester === "default" || branch === "default") {
        alert("Please select both Semester and Branch!");
    } else {
        console.log(semester+ " " + branch);
        collect_data(semester, branch);
    }
}
