const addContactFormElement = document.getElementById("addContactForm");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(addContactFormElement);

  const newContactData = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    phone: formData.get("phone") || "",
    jobTitle: formData.get("jobTitle") || "",
    group: formData.get("group") || "",
  };

  console.log({ newContactData });
});
