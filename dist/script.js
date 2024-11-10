"use strict";
const form = document.getElementById("resume-form");
const resumeContainer = document.getElementById("resume");
const profilePicInput = document.getElementById("profilePic");
const profilePreview = document.getElementById("profilePreview");
profilePicInput.addEventListener("change", () => {
    var _a;
    const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            profilePreview.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            profilePreview.style.display = "block";
        };
        reader.readAsDataURL(profilePicFile);
    }
});
form.addEventListener("submit", (e) => {
    var _a;
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const degree = document.getElementById("degree").value;
    const institution = document.getElementById("institution").value;
    const gradYear = document.getElementById("gradYear").value;
    const skills = document.getElementById("skills").value.split(",");
    const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const profilePicURL = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            resumeContainer.innerHTML = `
        <div class="profile" contenteditable="true">
          <img src="${profilePicURL}" alt="Profile Picture" class="profile-pic">
          <h1>${name}</h1>
          <p>${email} | ${contact}</p>
        </div>

        <div class="education" contenteditable="true">
          <h2><i class="fa-solid fa-graduation-cap"></i> Education</h2>
          <p>${degree}, ${institution} (${gradYear})</p>
        </div>

        <div class="skills" contenteditable="true">
          <h2><i class="fa-solid fa-gear"></i> Skills</h2>
          <ul>${skills.map((skill) => `<li>${skill.trim()}</li>`).join("")}</ul>
        </div>
      `;
            resumeContainer.style.display = "block";
        };
        reader.readAsDataURL(profilePicFile);
    }
    else {
        resumeContainer.innerHTML = `
      <div class="profile" contenteditable="true">
        <h1>${name}</h1>
        <p>${email} | ${contact}</p>
      </div>

      <div class="education" contenteditable="true">
        <h2><i class="fa-solid fa-graduation-cap"></i> Education</h2>
        <p>${degree}, ${institution} (${gradYear})</p>
      </div>

      <div class="skills" contenteditable="true">
        <h2><i class="fa-solid fa-gear"></i> Skills</h2>
        <ul>${skills.map((skill) => `<li>${skill.trim()}</li>`).join("")}</ul>
      </div>
    `;
        resumeContainer.style.display = "block";
    }
});
