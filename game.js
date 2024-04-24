// Function to generate computer's choice
function getComputerChoice() {
    var choices = [
        {name: "rock",
        emoji: "⛰"
        }
        , 
        {name: "paper",
        emoji: "🗏"
        },
        {name: "scissor",
        emoji: "✃"
        }
         ]

    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  // Function to determine the winner
  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice.name) {
      return "It's a tie!";
    } else if (
      (userChoice === "rock" && computerChoice.name === "scissor") ||
      (userChoice === "paper" && computerChoice.name === "rock") ||
      (userChoice === "scissor" && computerChoice.name === "paper")
    ) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }
  
  // Function to handle user choice
function handleUserChoice(event) {
    var userChoice = event.target.dataset.selection;
    var computerChoice = getComputerChoice();
    var result = determineWinner(userChoice, computerChoice);
    var resultElement = document.querySelector(".result");
    var computerChoiceElement = document.querySelector(".computer-choice");

    resultElement.textContent = result;
    computerChoiceElement.textContent = "Computer chose " + computerChoice.emoji;

    // Add or remove CSS class based on outcome
    if (result === "You win!") {
      resultElement.classList.add("winning-result");
    } else {
      resultElement.classList.remove("winning-result");
    }
  }
  
  // Add event listeners to user selection buttons
  var selectionButtons = document.querySelectorAll(".selection");
  selectionButtons.forEach(function(button) {
    button.addEventListener("click", handleUserChoice);
  });