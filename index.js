let counter = 0;
let firstSelection = "";
let secondSelection = "";

const cards = document.querySelectorAll(".cards .card");
const playAgainButton = document.getElementById("play-again");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        if (counter < 2 && !card.classList.contains("checked") && !card.classList.contains("clicked")) {
            card.classList.add("clicked");

            if (counter === 0) {
                firstSelection = card.getAttribute("animal");
                counter++;
            } else {
                secondSelection = card.getAttribute("animal");
                counter = 0;

                if (firstSelection === secondSelection) {
                    const correctCards = document.querySelectorAll(
                        ".card[animal='" + firstSelection + "']:not(.checked)"
                    );

                    correctCards.forEach((correctCard) => {
                        correctCard.classList.add("checked");
                        correctCard.classList.remove("clicked");
                    });

                    if (document.querySelectorAll(".card:not(.checked)").length === 0) {
                        playAgainButton.style.display = "block";
                    }
                } else {
                    const incorrectCards = document.querySelectorAll(".card.clicked");

                    incorrectCards.forEach((incorrectCard) => {
                        incorrectCard.classList.add("shake");
                    });

                    setTimeout(() => {
                        incorrectCards.forEach((incorrectCard) => {
                            incorrectCard.classList.remove("shake");
                            incorrectCard.classList.remove("clicked");
                        });
                    }, 800);
                }
            }
        }
    });
});

playAgainButton.addEventListener("click", () => {
  cards.forEach((card) => {
      card.classList.remove("checked", "clicked", "shake");
  });

  playAgainButton.style.display = "none";
  shuffleCards();
});

function shuffleCards() {
  cards.forEach((card) => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      card.style.order = randomIndex;
  });
}

