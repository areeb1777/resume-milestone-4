const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeContainer = document.getElementById("resume") as HTMLDivElement;
const profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
const profilePreview = document.getElementById("profilePreview") as HTMLImageElement;

profilePicInput.addEventListener("change", () => {
  const profilePicFile = profilePicInput.files?.[0];
  if (profilePicFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profilePreview.src = event.target?.result as string;
      profilePreview.style.display = "block";
    };
    reader.readAsDataURL(profilePicFile);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement).value;
  const degree = (document.getElementById("degree") as HTMLInputElement).value;
  const institution = (document.getElementById("institution") as HTMLInputElement).value;
  const gradYear = (document.getElementById("gradYear") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(",");

  const profilePicFile = profilePicInput.files?.[0];
  if (profilePicFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const profilePicURL = event.target?.result as string;

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
  } else {
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
