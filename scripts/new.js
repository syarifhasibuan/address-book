const addContactFormElement = document.getElementById("addContactForm");
const searchForm = document.getElementById("search-form");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const contactsData = JSON.parse(localStorage.getItem("contactsData"));
  const formData = new FormData(addContactFormElement);
  const today = new Date();
  const formattedTodayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const newId = (
    contactsData.reduce((accumulator, current) =>
      accumulator > parseInt(current.id) ? accumulator : parseInt(current.id)
    ) + 1
  ).toString();

  console.log(newId);

  const newContactData = {
    id: newId,
    name: formData.get("name") || "",
    nickname: "",
    email: formData.get("email") || "",
    phone: {
      countryCode: formData.get("country-code") || "",
      areaCode: formData.get("area-code") || "",
      phoneNumber: formData.get("phone-number") || "",
    },
    workInfo: {
      jobTitle: formData.get("job-title") || "",
      jobDepartment: formData.get("department") || "",
      companyName: formData.get("company-name") || "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    group: formData.get("group") || "",
    createdAt: formattedTodayDate,
    isFavorited: false,
  };

  contactsData.push(newContactData);

  localStorage.setItem("contactsData", JSON.stringify(contactsData));
});

searchForm.addEventListener("submit", (event) => {
  // Question: is this a good method?
  event.preventDefault();

  const url = new URL(window.location.href);
  const formData = new FormData(searchForm);

  const searchText = "?q=" + formData.get("q").trim();

  window.location.href = url.origin + "/" + searchText;
});
