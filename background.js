const lunr = require('lunr-mutable-indexes');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case "indexData": {
            buildIndex(message.data);
            sendResponse({ status: "Message processed" });
            break;
        }
        case "clearIndex": {
            chrome.storage.local.remove('lunrIndex', () => {
                console.log('Index cleared from storage.');
            });
            sendResponse({ status: "Message processed" });
            break;
        }
        case "searchIndex": {
            chrome.storage.local.get(['lunrIndex', 'docs'], function (data) {
                if (data.lunrIndex) {
                    const idx = lunr.Index.load(JSON.parse(data.lunrIndex));
                    const results = idx.search(message.query);
                    sendResponse({ results });
                }
            });
            break;
        }
    }
    return true;
});

function buildIndex(docs) {
    chrome.storage.local.get('lunrIndex', function(data) {
        chrome.storage.local.get('indexedIds', function(dataTemp) {
            let idx;
            let ids;

            // Check if an index already exists
            if (data.lunrIndex) {
                // Deserialize the existing index
                idx = lunr.Index.load(JSON.parse(data.lunrIndex));
            } else {
                // Create a new index
                idx = lunr(function () {
                    this.ref('id');
                    this.field('content');
                });
            }
            if (dataTemp.indexedIds) {
                ids = JSON.parse(dataTemp.indexedIds);
            } else {
                // Create a new index
                ids=[];
            }

            // Add new documents to the index
            docs.forEach(function (doc) {
                // Prevent duplicate documents
                if (!ids.includes(doc.id)) {
                    idx.add(doc);
                    ids.push(doc.id);
                }
            });

            // Save the updated index back to storage
            chrome.storage.local.set({ indexedIds: JSON.stringify(ids) }, function() {
                console.log('Id marked as indexed');
            });
            chrome.storage.local.set({ lunrIndex: JSON.stringify(idx) }, function() {
                console.log('Index updated and saved to storage.');
            });
        });
    });
}
