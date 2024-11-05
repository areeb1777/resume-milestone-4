// Form, resume container, and profile preview elements
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeContainer = document.getElementById("resume") as HTMLDivElement;
const profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
const profilePreview = document.getElementById("profilePreview") as HTMLImageElement;

// Profile picture preview on file selection
profilePicInput.addEventListener("change", () => {
  const profilePicFile = profilePicInput.files?.[0];
  if (profilePicFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profilePreview.src = event.target?.result as string;
      profilePreview.style.display = "block"; // Show the preview image
    };
    reader.readAsDataURL(profilePicFile); // Read the file as Data URL
  }
});

// Form submit event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Collect form values
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const institution = (document.getElementById("institution") as HTMLInputElement).value;
  const gradYear = (document.getElementById("gradYear") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");

  // Check if profile picture file is available and add to resume
  const profilePicFile = profilePicInput.files?.[0];
  if (profilePicFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const profilePicURL = event.target?.result as string;
      
      // Dynamically update the resume with form data and profile picture
      resumeContainer.innerHTML = `
        <div class="profile">
          <img src="${profilePicURL}" alt="Profile Picture" class="profile-pic">
          <h1>${name}</h1>
          <p>${email} | ${contact}</p>
        </div>
        
        <div class="education">
          <h2> <i class="fa-solid fa-graduation-cap"></i> Education</h2>
          <p>${degree}, ${institution} (${gradYear})</p>
        </div>
        
        <div class="skills">
          <h2> <i class="fa-solid fa-gear"></i> Skills</h2>
          <ul>${skills.map((skill) => `<li>${skill.trim()}</li>`).join("")}</ul>
        </div>
      `;
      resumeContainer.style.display = "block";
    };
    reader.readAsDataURL(profilePicFile);
  } else {
    // Display resume without profile picture if not selected
    resumeContainer.innerHTML = `
      <div class="profile">
        <h1>${name}</h1>
        <p>${email} | ${contact}</p>
      </div>
      
      <div class="education">
        <h2> <i class="fa-solid fa-graduation-cap"></i> Education</h2>
        <p>${degree}, ${institution} (${gradYear})</p>
      </div>
      
      <div class="skills">
        <h2> <i class="fa-solid fa-gear"></i> Skills</h2>
        <ul>${skills.map((skill) => `<li>${skill.trim()}</li>`).join("")}</ul>
      </div>
    `;
    resumeContainer.style.display = "block";
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
