# Tic Tac Toe
## Abstract
I built a tic tac toe board with both one and two-player modes.
### Features
- User can play tic tac toe, alternating turns between two players.
- Wins are detected, and each player has a tally of wins that are updated when a victory occurs.
- Ties simply reset the game with no win updates.
- Alternate "Tic Tactical Toto" mode with Wizard of Oz styling and sound effects.
- "Smart" CPU looks for possible wins and blocks and makes plays accordingly.
- Saturation boosts or zeroes out upon win, depending on who wins, and victory anthem is played.
### Code Features
- manageBoardClick is our workhorse function, handling most of the activity on the page. Beyond this, functions are simplified as much as possible given time constraints.
## Contributors
Adam Bedient
## Installation Instructions
- Private repository can be found [here]("https://github.com/cOdeBedient/tic-tac-toe")
- Use the green code button to access and copy the SSH link
- Run `git clone` on command line followed by the the pasted SSH link
- Run `code .` on command line to open in text editor
- Run `open index.html` on command line to open the application in the browser
- Alternatively, deployed site can be found [here]("https://cOdeBedient.github.io/tic-tac-toe/")
## Preview of App
[oz-mode](<video src="assets/tic-tactical-toto-screen-capture.mp4" controls title="Title"></video>)
## Context
- Adam is in his final week of Mod 1 at the Turing Front End Software Engineering program.
- Code took approximately 12 hours to complete. Base iteration took 4, Oz Mode 8.
## Learning Goals
- Gain understanding of creating a project from scratch, initiaing git, creating files, writing HTML, CSS, and JS with no provided elements.
- Loosely match a comp but explore our own creativity and implement additional features to our liking.
- Practice writing DRY code, minding SRP philosophy, and refining code to maximize readability.
- Learn how to implement separate "modes" for one page.
## Wins and Challenges
- Challenge: Refactoring earlier! I'm still working to write clean code out of the box, as it saves so much headache!
- Challenge: Use dev tools for debugging. Getting the hang of this, and it's so helpful!
- Win: You can play against the CPU and it doesn't just make random guesses!
- Win: Styling is nice, though still want to learn more about how to have relative sizing and spacing of elements not so dependent on screen size.
- Win: I assigned a variable to a function invocation! I'd like to get more comfortable with this, as it cleans the code up.