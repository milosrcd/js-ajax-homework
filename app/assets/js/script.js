document.getElementById("addCandidate").addEventListener("click", function () {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    fetch("http://localhost:3000/candidates", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName
        })
    }).then(function (data) {
        alert("Candidate added!");

        renderCandidates();
    })
});



function renderCandidates() {
    fetch("http://localhost:3000/candidates", {
        method: "GET"
    }).then(function (data) {
        return data.json();
    }).then(function (candidates) {
        console.log(candidates);

        document.getElementById("tableBody").innerHTML = "";

        for (let candidate of candidates) {
            const tableRow = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = candidate.id;

            const tdFirstName = document.createElement("td");
            tdFirstName.textContent = candidate.firstName;

            const tdLastName = document.createElement("td");
            tdLastName.textContent = candidate.lastName;

            const tdEdit = document.createElement("td");
            const tdEditLink = document.createElement("a");
            tdEditLink.textContent = "Edit";
            tdEditLink.href = "#";
            tdEditLink.classList.add("edit");
            tdEditLink.setAttribute("data-candidate-id", candidate.id);

            tdEdit.appendChild(tdEditLink);

            const tdDelete = document.createElement("td");
            const tdDeleteLink = document.createElement("a");
            tdDeleteLink.textContent = "Delete";
            tdDeleteLink.href = "#";
            tdDeleteLink.classList.add("delete");
            tdDeleteLink.setAttribute("data-candidate-id", candidate.id);

            tdDelete.appendChild(tdDeleteLink);

            tableRow.appendChild(tdId);
            tableRow.appendChild(tdFirstName);
            tableRow.appendChild(tdLastName);
            tableRow.appendChild(tdEdit);
            tableRow.appendChild(tdDelete);

            document.getElementById("tableBody").appendChild(tableRow);
        }

        const deleteLinks = document.getElementsByClassName("delete");

        for (let deleteLink of deleteLinks) {
            deleteLink.addEventListener("click", function (event) {
                event.preventDefault();

                const id = event.target.getAttribute("data-candidate-id");

                fetch("http://localhost:3000/candidates/" + id, {
                    method: "DELETE"
                }).then(function(){
                    alert("Candidate deleted!");
                    renderCandidates();
                })
            })
        }

        const editLinks = document.getElementsByClassName("edit");

        for(let editLink of editLinks){
            editLink.addEventListener("click", function(event){
                event.preventDefault();

                const id = event.target.getAttribute("data-candidate-id");

                fetch("http://localhost:3000/candidates/" + id, {
                    method: "GET"
                }).then(function(data){
                    return data.json();
                }).then(function(candidate){
                    console.log(candidate);

                    document.getElementById("firstName").value = candidate.firstName;
                    document.getElementById("lastName").value = candidate.lastName;
                })
            })
        }
    })
}
window.onload = function () {
    renderCandidates();
}

