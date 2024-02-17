// contentScript.js
console.log("script loaded")
function extractConversation() {
    const paragraphs = document.querySelectorAll('p');

    let content = '';

    for (let i = 0; i < paragraphs.length && i < 10; i++) {
        content += paragraphs[i].innerText;
    }
    return content;
}
function indexConversation() {
    const id = window.location.href;

    chrome.storage.local.get({ index: [], docs: {} }, function (data) {
        if (!data.docs[id]) {
            data.docs[id] = { id: id, content: extractConversation() };
            data.index.push(data.docs[id]);
            chrome.runtime.sendMessage({ action: "indexData", data: data.index }, response => {
                console.log("Response from service worker:", response);
            });
        }
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "indexConversation") {
        indexConversation();
        sendResponse({ url: window.location.href });
    }
});
