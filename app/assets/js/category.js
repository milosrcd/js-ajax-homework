document.getElementById("addCategory").addEventListener("click", function () {
    const categoryName = document.getElementById("categoryName").value;

    fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoryName: categoryName,

        })
    }).then(function (data) {
        alert("Category added!");

        renderCategories();
    })
});

function renderCategories() {
    fetch("http://localhost:3000/categories", {
        method: "GET"
    }).then(function (data) {
        return data.json();
    }).then(function (categories) {
        console.log(categories);

        document.getElementById("tableCategoryBody").innerHTML = "";

        for (let category of categories) {
            const tableRow = document.createElement("tr");

            const tdId = document.createElement("td");
            tdId.textContent = category.id;

            const tdCategoryName = document.createElement("td");
            tdCategoryName.textContent = category.categoryName;

            const tdDelete = document.createElement("td");
            const tdDeleteLink = document.createElement("a");
            tdDeleteLink.textContent = "Delete";
            tdDeleteLink.href = "#";
            tdDeleteLink.classList.add("delete");
            tdDeleteLink.setAttribute("data-category-id", category.id);

            tdDelete.appendChild(tdDeleteLink);

            tableRow.appendChild(tdId);
            tableRow.appendChild(tdCategoryName);
            tableRow.appendChild(tdDelete);

            document.getElementById("tableCategoryBody").appendChild(tableRow);
        }

        const deleteLinks = document.getElementsByClassName("delete");

        for (let deleteLink of deleteLinks) {
            deleteLink.addEventListener("click", function (event) {
                event.preventDefault();

                const id = event.target.getAttribute("data-category-id");

                fetch("http://localhost:3000/categories/" + id, {
                    method: "DELETE"
                }).then(function () {
                    alert("Category deleted!");
                    renderCategories();
                })
            })
        }


    })
}
window.onload = function () {
    renderCategories();
}
