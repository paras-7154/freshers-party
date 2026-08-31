const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

const eventSelect = document.getElementById("event");
const songNameGroup = document.getElementById("songNameGroup");
const songNameInput = document.getElementById("songName");

// Events that require Song Name
const songEvents = [
  "Solo Dance 💃",
  "Group Dance (Hip-Hop, Funny, Lazy, etc.) 🕺",
  "Singing 🎤",
  "Instrumental Music 🎶"
];


// =====================================
// SHOW / HIDE SONG NAME
// =====================================

eventSelect.addEventListener("change", function () {

  const selectedEvent = eventSelect.value;

  if (songEvents.includes(selectedEvent)) {

    // Show Song Name
    songNameGroup.style.display = "block";

    // Song Name required
    songNameInput.required = true;

  } else {

    // Hide Song Name
    songNameGroup.style.display = "none";

    // Song Name optional
    songNameInput.required = false;

    // Clear old value
    songNameInput.value = "";
  }
});


// =====================================
// REGISTRATION
// =====================================

form.addEventListener("submit", async function (event) {

  event.preventDefault();

  const registrationData = {
    studentName: document
      .getElementById("studentName")
      .value
      .trim(),

    className: document
      .getElementById("className")
      .value
      .trim(),

    mobile: document
      .getElementById("mobile")
      .value
      .trim(),

    event: eventSelect.value,

    songName: songNameInput.value.trim()
  };


  console.log("Sending data:", registrationData);


  try {

    const response = await fetch(
      "https://freshers-party-two.vercel.app/api/registrations",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(registrationData)
      }
    );


    const result = await response.json();

    console.log("Server response:", result);


    if (response.ok && result.success) {

      message.textContent =
        "🎉 Registration Successful!";

      message.className = "success";

      form.reset();

      songNameGroup.style.display = "none";

      songNameInput.required = false;

    } else {

      console.error(
        "Registration failed:",
        result
      );

      message.textContent =
        result.error ||
        result.message ||
        "Registration failed";

      message.className = "error";
    }


  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );

    message.textContent =
      "❌ Server connection failed.";

    message.className = "error";
  }

});