document.addEventListener("DOMContentLoaded", () => {
  const sentence = document.querySelector(".sentence");
  const wordBank = document.getElementById("word-bank");
  const checkBtn = document.getElementById("check-btn");
  const feedback = document.getElementById("feedback");
  let dropZones = document.querySelectorAll(".drop-zone");
  let zoneArr;

  // Define the words to be dragged and shuffled
  const words = ["IMS catalog", "PDS", "PDSE", "IMS directory", "ACBLIB"];
  const correctWords = ["IMS catalog", "IMS directory", "PDSE"];
  const sentenceText = "The quick brown _*_ jumps over the lazy _*_.";

  let draggedItem = null;
  let attemptComplete = false;

  // Populate the word bank with shuffled words
  function initializeGame() {
    // Reset attempt
    attemptComplete = false;
    // Clear word bank
    wordBank.innerHTML = "";

    // Set sentence text
    sentenceWithBlanks = sentenceText.replaceAll(
      "_*_",
      '<span class="drop-zone"></span>'
    );
    // sentence.innerHTML = sentenceWithBlanks;
    // zoneArr = sentence.querySelectorAll("span");
    // let dropZones = zoneArr;
    // console.log(zoneArr);
    // console.log(dropZones);

    // Set button text
    checkBtn.textContent = "Check";

    // Add words to word bank
    words.forEach((word) => {
      const wordItem = document.createElement("div");
      wordItem.classList.add("word-item");
      wordItem.textContent = word;
      wordItem.setAttribute("draggable", true);
      wordItem.dataset.word = word; // Store the word in a data attribute
      wordBank.appendChild(wordItem);
    });

    // Reset drop zones and feedback
    dropZones.forEach((zone) => {
      zone.innerHTML = "";
    });
    feedback.textContent = "";
  }

  function dragStarted(e) {
    // Check if dragged item is item from word bank
    if (e.target.classList.contains("word-item")) {
      draggedItem = e.target;
      // Add the word to the data transfer object to show the user what element is being dragged
      e.dataTransfer.setData("text/plain", e.target.dataset.word);
      // Dragging class added to element
      setTimeout(() => {
        e.target.classList.add("dragging");
      }, 0);
    }
  }

  function dropWord(e, zone) {
    e.preventDefault();
    //   If the element is a dragged element from the word bank and the zone is empty, add the element to the zone
    if (zone) {
      if (draggedItem && zone.textContent === "") {
        zone.appendChild(draggedItem);
        // The item is no longer in the word bank, so it is placed in a drop zone
      }
    } else {
      if (draggedItem) {
        wordBank.appendChild(draggedItem);
        // The item is no longer in the word bank, so it is placed in a drop zone
      }
    }
  }

  function dragEnded(e) {
    // If element is from the word bank, remove word from draggedItem variable once dragging has ended
    if (draggedItem) {
      draggedItem.classList.remove("dragging");
      draggedItem = null;
    }
  }

  // Add event listener for when user starts dragging element
  wordBank.addEventListener("dragstart", (e) => {dragStarted(e)});

  // Allow drop on drag over
  wordBank.addEventListener("dragover", (e) => { e.preventDefault()});

  wordBank.addEventListener("drop", (e) => {dropWord(e)});

  // Add event listener for when user stops dragging element
  document.addEventListener("dragend", (e) => {dragEnded(e)});

  dropZones.forEach((zone) => {
    zone.addEventListener("dragstart", (e) => {dragStarted(e)})

    // Add event listener for when element is dragged over zone, allow drop
    zone.addEventListener("dragover", (e) => {
      console.log("allow drop");
      e.preventDefault();
    });

    // Add event listener for when dragged element is dropped on valid zone
    zone.addEventListener("drop", (e) => {dropWord(e, zone)});
  });

  //   Check answers
  checkBtn.addEventListener("click", () => {
    // When user clicks check...
    if (attemptComplete === false) {
      let allCorrect = true;
      let correctWordIndex = 0;
      dropZones.forEach((zone) => {
        const droppedWord = zone.querySelector(".word-item");
        const correctWord = correctWords[correctWordIndex];
        correctWordIndex++;
        // Check if word has been added to blank and if dropped word is the correct word
        if (droppedWord && droppedWord.dataset.word === correctWord) {
            // dropped word and correct word match
            droppedWord.classList.add("correct-ans");
        } else {
          allCorrect = false;
          droppedWord.classList.add("incorrect-ans");
        }
      });

      if (allCorrect) {
        feedback.textContent = "Correct! All sentences completed.";
        feedback.classList.remove("incorrect-ans");
        feedback.classList.add("correct-ans");
      } else {
        feedback.textContent = "Incorrect. Please try again.";
        feedback.classList.remove("correct-ans");
        feedback.classList.add("incorrect-ans");
      }
      attemptComplete = true;
      // Set button text
      checkBtn.textContent = "Retry";
    } else {
      initializeGame();
    }
  });

  // Start the game
  initializeGame();
});
