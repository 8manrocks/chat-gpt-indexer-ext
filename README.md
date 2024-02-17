# ChatGPT Conversation Indexer with Search

This Chrome extension allows users to index and search their conversations on ChatGPT, enhancing the ability to retrieve information from past interactions. It uses `lunr.js` for creating a searchable index and provides a user-friendly interface for searching through conversations.

## Features

- **Conversation Indexing**: Automatically or manually index your ChatGPT conversations.
- **Search Capability**: Quickly search through indexed conversations using keywords.
- **Easy to Use**: Simple interface integrated into the Chrome browser.
- **Privacy-Focused**: All data is stored locally, ensuring your conversations remain private.

### Manual Installation (For Development/Testing)

1. Clone this repository or download the ZIP file.
2. Extract the files to a preferred location on your computer.
3. Install dependencies: `npm install`.
4. Build the project: `npm run build`.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" at the top-right corner.
5. Click "Load unpacked" and select the directory/dist where you extracted the extension files.

## Usage

- **Indexing Conversations**: Navigate to a ChatGPT conversation, and click the index button to index the current conversation.
- **Searching**: Click on the extension icon and use the search bar to find specific conversations. Results will be displayed in a dropdown.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or create issues for bugs, questions, or new features.

## Acknowledgments

- Thanks to [Lunr.js](https://lunrjs.com) and [lunr-mutable-indexes](https://github.com/hoelzro/lunr-mutable-indexes) for providing the search functionality.
- This project is not affiliated with OpenAI or ChatGPT but aims to enhance the user experience for individuals utilizing ChatGPT.


---

We hope this extension enhances your ChatGPT usage by making it easier to recall and find past conversations. Enjoy!
