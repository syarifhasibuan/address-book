const addContactFormElement = document.getElementById("addContactForm");
const searchForm = document.getElementById("search-form");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(addContactFormElement);

  const newContactData = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    phone: formData.get("phone") || "",
    jobTitle: formData.get("job-title") || "",
    group: formData.get("group") || "",
  };

  console.log({ newContactData });
});

searchForm.addEventListener("submit", (event) => {
  // Question: is this a good method?
  event.preventDefault();

  const url = new URL(window.location.href);
  const formData = new FormData(searchForm);

  const searchText = "?q=" + formData.get("q").trim();

  window.location.href = url.origin + "/" + searchText;
});
