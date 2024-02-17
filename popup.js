document.getElementById('searchBox').addEventListener('input', function () {
    const query = this.value;
    if (query.length > 2) {
        chrome.runtime.sendMessage({ action: "searchIndex", query }, response => {
            displayResults(response.results);
            console.log("Response from service worker:");
        });
    }
});

document.getElementById('index').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "indexConversation" }, function (response) {
            // Handle the response
        });
    });
});

document.getElementById('clearAll').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: "clearIndex" }, response => {
        console.log("Response from service worker:", response);
    });
});

function displayResults(results) {
    const ul = document.getElementById('searchResults');
    ul.innerHTML = ''; // Clear previous results
    results.forEach(function (result) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(result.ref)); // Display the URL
        ul.appendChild(li);
    });
}
