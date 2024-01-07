''' load random joke from api and post in discord channel by typing !joke '''

running the app:

***Set up your development environment: ***
Requires Node.js and npm (Node Package Manager)
`` git clone https://github.com/viictoo/Frontend-Performante.git
cd Frontend-Performante/discordJokeBot
npm install ``

***Create a new bot on the Discord Developer Portal:*** 
[discord](https://discord.com/developers/docs/topics/permissions)
Discord Developer Portal > log in to your account > "New Application" > type name and click "Create" > "bot" tab > "Add Bot" > copy and save the displayed token in a .env file

***load api key from env: testing on the console***
`` node --env-file .env ``

***Invite the  bot to a server:*** 
Navigate to the "Bot" tab > "OAuth2" section > "Scopes" > "bot" > "Bot Permissions", select the "Send Messages" & "Use Slash Commands" permissions > "Copy" button to copy the generated URL > Paste this URL into your browser > select a server to invite the bot to > click "Authorize"


***Run the bot from the terminal:***
``node discord-joke-teller``