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
    group:
      formData.get("group") != "new"
        ? formData.get("group")
        : formData.get("new-group") || "",
    createdAt: new Date(),
    isFavorited: false,
  };

  contactsData.push(newContactData);

  localStorage.setItem("contactsData", JSON.stringify(contactsData));

  window.location.href = `/contact/?id=${newContactData.id}`;
});

const groupOptionElement = document.getElementById("group");
const newGroupSectionElement = document.getElementById("new-group-section");
const newGroupElement = document.getElementById("new-group");

function configureGroupOption() {
  const availGroups = [
    ...new Set(
      contactsData
        .map((contact) => (!!contact.group ? contact.group : ""))
        .filter((groupName) => groupName != "")
    ),
  ];

  for (let i = 0; i < availGroups.length; i++) {
    const newOpt = document.createElement("option");
    newOpt.value = availGroups[i];
    newOpt.text = availGroups[i];

    groupOptionElement.add(newOpt);
  }

  if (groupOptionElement.value === "new") {
    newGroupElement.required = true;
    newGroupSectionElement.classList.remove("hidden");
  }

  groupOptionElement.addEventListener("change", () => {
    console.log(newGroupSectionElement.className);
    if (groupOptionElement.value === "new") {
      newGroupSectionElement.classList.remove("hidden");
      newGroupElement.required = true;
    } else {
      newGroupSectionElement.classList.add("hidden");
      newGroupElement.required = false;
    }
  });
}

configureGroupOption();
