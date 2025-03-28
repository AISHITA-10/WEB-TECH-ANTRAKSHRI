Word Antakshari Game
Overview
The Word Antakshari Game is a multiplayer web-based game built using Node.js, Express.js, and MongoDB. The game allows multiple rounds of gameplay, where each user must provide a meaningful word starting with the last letter of the previous word displayed by the system.
Features
•	Multi-Round Gameplay: Players take turns providing words based on the previous word's last letter.
•	Scoring Mechanism: Points are awarded for each valid word entry.
•	Streak Bonuses: Players earn bonus points for consecutive correct entries.
•	Real-Time Updates: Words are validated and updated dynamically.
•	User Authentication: Players can register and log in to track scores.
•	Leaderboard: Displays top players based on scores.
•	Word Validation: Ensures that only meaningful words are accepted.
Technologies Used
•	Backend: Node.js with Express.js
•	Database: MongoDB
•	Frontend: HTML, CSS, JavaScript (or React if used)
•	Authentication: JWT (JSON Web Token) for user authentication
•	Real-Time Communication: WebSockets (if used for real-time updates)
Installation
1.	Clone the repository:
2.	git clone https://github.com/AISHITA-10/WEB-TECH-ANTRAKSHRI
3.	cd word-antakshari
4.	Install dependencies:
5.	npm install
6.	PORT=3000
7.	MONGODB_URI=your-mongodb-connection-string
8.	Start the server:
9.	npm start
Gameplay Rules
1.	The system starts with a random word.
2.	The next player must enter a meaningful word starting with the last letter of the previous word.
3.	Words cannot be repeated.
4.	If a player provides an invalid word, they lose their turn.
5.	The game continues until a player fails to provide a correct word within the time limit.
Scoring Mechanism
•	Each valid word earns 10 points.
•	Streak Bonus:
o	3 consecutive correct words: +5 bonus points
o	5 consecutive correct words: +10 bonus points
o	10 consecutive correct words: +25 bonus points
API Endpoints
Method	Endpoint	Description
GET	/game/start	Start a new game session
POST	/game/word	Submit a word
GET	/leaderboard	Get top players
POST	/auth/register	Register a new user
POST	/auth/login	User login
Future Enhancements
•	Multiplayer real-time mode
•	Timed rounds for added difficulty
•	Dictionary integration for better word validation
•	Mobile app version
Contributing
Contributions are welcome! Feel free to fork the repo, create a branch, and submit a pull request.

