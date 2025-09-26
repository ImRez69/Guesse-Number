const numberForm = document.getElementById("number-form");
const numberDiv = document.getElementById("number-div");
const numberInput = document.getElementById("number-input");
const correctAnswer = Math.floor(Math.random() * 100 + 1).toString();
let userGuesse = 0;
const onClick = (e) => {
  e.preventDefault();

  switch (e.target.innerText) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      numberInput.value += e.target.innerText;
      break;

    case "Clear":
      numberInput.value = "";
      break;

    case "Submit":
      checkAnswer(numberInput.value);
      break;
  }
};

function checkAnswer(answer) {
  userGuesse += 1;
  switch (true) {
    case answer === "":
      showNotification("Input Is Empty", "empty-input", 4000);
      return;

    case answer === correctAnswer:
      showNotification(
        `Your Guesse Is Currect With ${userGuesse} Guesse`,
        "currect",
        4000
      );
      endGame();
      return;

    case answer !== correctAnswer:
      // console.log(`Your Answer: ${answer} || Currect Answer: ${correctAnswer}`);
      if (+answer > +correctAnswer) {
        showNotification(
          "Your Guesse Is Wrong ( Bigger Than Currect Answer )",
          "wrong",
          4000
        );
        return;
      } else if (+answer < +correctAnswer) {
        showNotification(
          "Your Guesse Is Wrong ( Smaller Than Currect Answer )",
          "wrong",
          4000
        );
        return;
      }
  }
}

function showNotification(message, type, duration) {
  // Create Notification Element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
  <span class="notification-close">🗙</span>
  <span class="notification-message">${message}</span>
  <span class="notification-close">🗙</span>
  `;

  // Add Event To Notification
  notification.addEventListener("click", (e) => {
    setTimeout(() => {
      notification.remove();
    }, 500);
    notification.classList.remove("show");
    notification.classList.add("hide");
  });

  // Add Notification To Body Element
  document.querySelector("body").appendChild(notification);

  // Add "show" Class To Notification After 100ms
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Remove "show" Class & Add "hide" Class To Notification After "duration"
  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hide");

    // Remove Notification Element After 500ms
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, duration);
}

function endGame() {
  numberForm.innerHTML = `
    <button id="restart-btn">Restart</button>
    <span class="end-game-message">Your Gusses: ${userGuesse}</span>
    <span class="end-game-message">Currect Answer: ${correctAnswer}</span>
    `;
  document
    .getElementById("restart-btn")
    .addEventListener("click", () => window.location.reload());
}

numberForm.addEventListener("click", onClick);
