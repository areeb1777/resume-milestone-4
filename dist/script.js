"use strict";
// Form and resume container elements
const form = document.getElementById("resume-form");
const resumeContainer = document.getElementById("resume");
form.addEventListener("submit", (e) => {
    var _a;
    e.preventDefault();
    // Collect form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact")
        .value;
    const degree = document.getElementById("degree").value;
    const institution = document.getElementById("institution").value;
    const gradYear = document.getElementById("gradYear")
        .value;
    const skills = document.getElementById("skills").value.split(",");
    // Handle profile picture
    const profilePicInput = document.getElementById("profilePic");
    const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (profilePicFile) {
        const reader = new FileReader();
        // When the file is read successfully
        reader.onload = (event) => {
            var _a;
            const profilePicURL = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
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
            // Make sections editable
            makeSectionsEditable();
        };
        // Read the profile picture file as a Data URL
        reader.readAsDataURL(profilePicFile);
    }
    else {
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
        // Make sections editable
        makeSectionsEditable();
    }
});
// Function to enable contenteditable for resume sections
function makeSectionsEditable() {
    const editableElements = resumeContainer.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach((element) => {
        element.addEventListener("input", (event) => {
            const target = event.target; // Cast the event target to HTMLElement
            console.log("Content updated:", target.textContent);
        });
    });
}
