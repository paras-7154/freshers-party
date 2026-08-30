const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

const eventSelect = document.getElementById("event");
const songNameGroup = document.getElementById("songNameGroup");
const songNameInput = document.getElementById("songName");

// Events where Song Name is required
const songEvents = [
  "Solo Dance 💃",
  "Group Dance (Hip-Hop, Funny, Lazy, etc.) 🕺",
  "Singing 🎤",
  "Instrumental Music 🎶"
];

// Show / Hide Song Name
eventSelect.addEventListener("change", function () {
  const selectedEvent = eventSelect.value;

  if (songEvents.includes(selectedEvent)) {
    songNameGroup.style.display = "block";
    songNameInput.required = true;
  } else {
    songNameGroup.style.display = "none";
    songNameInput.required = false;
    songNameInput.value = "";
  }
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const registrationData = {
    studentName: document.getElementById("studentName").value.trim(),
    className: document.getElementById("className").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    event: document.getElementById("event").value,
    songName: document.getElementById("songName").value.trim()
  };

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

    if (result.success) {
      message.textContent = "🎉 Registration Successful!";
      message.className = "success";

      form.reset();

      // Hide Song Name after successful registration
      songNameGroup.style.display = "none";
      songNameInput.required = false;

    } else {
      message.textContent = result.message || "Registration failed";
      message.className = "error";
    }

  } catch (error) {
    console.error(error);
    message.textContent = "❌ Server connection failed.";
    message.className = "error";
  }
});