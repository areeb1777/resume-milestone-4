// Form and resume container elements
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeContainer = document.getElementById("resume") as HTMLDivElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect form values
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement)
    .value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const institution = (
    document.getElementById("institution") as HTMLInputElement
  ).value;
  const gradYear = (document.getElementById("gradYear") as HTMLInputElement)
    .value;
  const skills = (
    document.getElementById("skills") as HTMLInputElement
  ).value.split(",");

  // Handle profile picture
  const profilePicInput = document.getElementById(
    "profilePic"
  ) as HTMLInputElement;
  const profilePicFile = profilePicInput.files?.[0];

  if (profilePicFile) {
    const reader = new FileReader();

    // When the file is read successfully
    reader.onload = (event) => {
      const profilePicURL = event.target?.result as string;

      // Dynamically update the resume with form data and the profile picture
      resumeContainer.innerHTML = `
        <div class="profile">
          <img src="${profilePicURL}" alt="Profile Picture" class="profile-pic">
          <h1 contenteditable="true">${name}</h1>
          <p contenteditable="true">${email} | ${contact}</p>
        </div>
        
        <div class="education">
          <h2> <i class="fa-solid fa-graduation-cap"></i> Education</h2>
          <p contenteditable="true">${degree}, ${institution} (${gradYear})</p>
        </div>
        
        <div class="skills">
          <h2> <i class="fa-solid fa-gear"></i> Skills</h2>
          <ul>${skills
            .map((skill) => `<li contenteditable="true">${skill.trim()}</li>`)
            .join("")}</ul>
        </div>
      `;

      // Display the resume
      resumeContainer.style.display = "block";

      // Make sections editable
      makeSectionsEditable();
    };

    // Read the profile picture file as a Data URL
    reader.readAsDataURL(profilePicFile);
  } else {
    // If no profile picture is selected, display resume without it
    resumeContainer.innerHTML = `
      <div class="profile">
        <h1 contenteditable="true">${name}</h1>
        <p contenteditable="true">${email} | ${contact}</p>
      </div>
      
      <div class="education">
        <h2> <i class="fa-solid fa-graduation-cap"></i> Education</h2>
        <p contenteditable="true">${degree}, ${institution} (${gradYear})</p>
      </div>
      
      <div class="skills">
        <h2> <i class="fa-solid fa-gear"></i> Skills</h2>
        <ul>${skills
          .map((skill) => `<li contenteditable="true">${skill.trim()}</li>`)
          .join("")}</ul>
      </div>
    `;

    // Display the resume
    resumeContainer.style.display = "block";

    // Make sections editable
    makeSectionsEditable();
  }
});

// Function to enable contenteditable for resume sections
function makeSectionsEditable() {
  const editableElements = resumeContainer.querySelectorAll(
    '[contenteditable="true"]'
  );

  editableElements.forEach((element) => {
    element.addEventListener("input", (event) => {
      const target = event.target as HTMLElement; // Cast the event target to HTMLElement
      console.log("Content updated:", target.textContent);
    });
  });
}
