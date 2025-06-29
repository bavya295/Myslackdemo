#  Slack API Messaging Assignment

This project demonstrates how to work with the **Slack API** .  
It covers:
  Authentication using OAuth & environment variables
  Sending & scheduling messages
  Retrieving, editing, and deleting messages
  Using the Slack Developer Sandbox safely

---

##  Requirements

- Node.js installed (`npm install`)
- A **Slack Bot Token** with the necessary scopes (`chat:write`, `channels:history`, etc.)
- A `.env` file to store secrets safely (never push this to GitHub!)

---

##  Project Structure
SlackProject/
├── index.js # Main Node.js script
├── .env # Holds your SLACK_BOT_TOKEN (ignored by Git)
├── .gitignore # Ignores .env and node_modules
├── package.json
├── README.md # This file
└── node_modules/


## Run the script
node index.js

