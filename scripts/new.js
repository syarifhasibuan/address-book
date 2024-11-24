const addContactFormElement = document.getElementById("addContactForm");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const contactsData = JSON.parse(localStorage.getItem("contactsData"));
  const formData = new FormData(addContactFormElement);

  const newId = contactsData[contactsData.length - 1].id + 1;

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
      department: formData.get("department") || "",
      company: formData.get("company-name") || "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    group: formData.get("group") || "",
    createdAt: new Date(),
    isFavorited: false,
  };

  contactsData.push(newContactData);

  localStorage.setItem("contactsData", JSON.stringify(contactsData));

  window.location.href = `/contact/?id=${newContactData.id}`;
});
