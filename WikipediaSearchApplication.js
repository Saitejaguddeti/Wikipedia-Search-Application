function displayWeb()
{

let inputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function displaySearchResults(searchResults) {
    searchResultsEl.classList.remove("d-none");
    spinnerEl.classList.add("d-none");
    let {
        link,
        title,
        description
    } = searchResults;

    let serachResultContainer = document.createElement("div");
    serachResultContainer.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    serachResultContainer.appendChild(titleEl);

    let breakEl = document.createElement("br");
    titleEl.appendChild(breakEl);

    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    serachResultContainer.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    serachResultContainer.appendChild(descriptionEl);
    searchResultsEl.appendChild(serachResultContainer);
}


function displaySearchContent(jsonData) {
    let searchResults = jsonData.search_results;
    for (let searchResultsItem of searchResults) {
        displaySearchResults(searchResultsItem);
    }

}

function displaySearch(event) {
    console.log(event.key);
    if (event.key === "Enter") {
        searchResultsEl.classList.add("d-none");
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputEl.value;
        let option = {
            method: "GET"
        };
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                displaySearchContent(jsonData);
            });
    }

}
inputEl.addEventListener("keydown", displaySearch);

}