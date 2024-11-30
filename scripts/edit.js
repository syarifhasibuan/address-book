const formSectionElement = document.getElementById("add-form");
const addContactFormElement = document.getElementById("addContactForm");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = new URL(window.location.href);
  const idParams = url.searchParams.get("id");

  const formData = new FormData(addContactFormElement);

  const contactToEdit = getContactById(idParams);

  contactToEdit.name = formData.get("name") || "";
  contactToEdit.nickname = formData.get("nickname") || "";
  contactToEdit.email = formData.get("email") || "";
  contactToEdit.phone.countryCode = formData.get("country-code") || "";
  contactToEdit.phone.areaCode = formData.get("area-code") || "";
  contactToEdit.phone.phoneNumber = formData.get("phone-number") || "";
  contactToEdit.workInfo.jobTitle = formData.get("job-title") || "";
  contactToEdit.workInfo.department = formData.get("department") || "";
  contactToEdit.workInfo.company = formData.get("company-name") || "";
  contactToEdit.address.street = formData.get("street") || "";
  contactToEdit.address.city = formData.get("city") || "";
  contactToEdit.address.state = formData.get("state") || "";
  contactToEdit.address.zip = formData.get("zip") || "";
  contactToEdit.lastModified = new Date();

  localStorage.setItem("contactsData", JSON.stringify(contactsData));

  window.location.href = `/contact/?id=${contactToEdit.id}`;
});

function modifyFormDefault() {
  const url = new URL(window.location.href);
  const idParams = url.searchParams.get("id");

  if (!idParams) {
    window.location.href = "/";
    return;
  }

  const contactToEdit = getContactById(idParams);

  document.getElementById("name").value = contactToEdit.name;
  document.getElementById("email").value = contactToEdit.email;
  document.getElementById("country-code").value =
    contactToEdit.phone.countryCode;
  document.getElementById("phone-number").value =
    contactToEdit.phone.phoneNumber;
  document.getElementById("job-title").value = contactToEdit.workInfo.jobTitle;
  document.getElementById("department").value =
    contactToEdit.workInfo.department;
  document.getElementById("company-name").value =
    contactToEdit.workInfo.company;
  document.getElementById("street").value = contactToEdit.address.street;
  document.getElementById("city").value = contactToEdit.address.city;
  document.getElementById("state").value = contactToEdit.address.state;
  document.getElementById("zip").value = contactToEdit.address.zip;
  document.getElementById("group").value = contactToEdit.group;
}

function getContactById(id) {
  for (let i = 0; i < contactsData.length; i++) {
    if (contactsData[i].id == id) {
      return contactsData[i];
    }
  }

  return null;
}

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
modifyFormDefault();
