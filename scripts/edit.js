const addContactFormElement = document.getElementById("addContactForm");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  const formData = new FormData(addContactFormElement);
  let contact = {};

  // New contact
  if (!id) {
    const newId = contactsData[contactsData.length - 1].id + 1;

    contact = {
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
        street: formData.get("street") || "",
        city: formData.get("city") || "",
        state: formData.get("state") || "",
        zip: formData.get("zip") || "",
      },
      group:
        formData.get("group") != "new"
          ? formData.get("group")
          : formData.get("new-group") || "",
      createdAt: new Date(),
      isFavorited: false,
    };

    contactsData.push(contact);
  }
  // Edit contact
  else {
    contact = contactsData.find((contactItem) => contactItem.id == id);

    contact.name = formData.get("name") || "";
    contact.nickname = formData.get("nickname") || "";
    contact.email = formData.get("email") || "";
    contact.phone.countryCode = formData.get("country-code") || "";
    contact.phone.areaCode = formData.get("area-code") || "";
    contact.phone.phoneNumber = formData.get("phone-number") || "";
    contact.workInfo.jobTitle = formData.get("job-title") || "";
    contact.workInfo.department = formData.get("department") || "";
    contact.workInfo.company = formData.get("company-name") || "";
    contact.address.street = formData.get("street") || "";
    contact.address.city = formData.get("city") || "";
    contact.address.state = formData.get("state") || "";
    contact.address.zip = formData.get("zip") || "";
    contact.group =
      formData.get("group") != "new"
        ? formData.get("group")
        : formData.get("new-group") || "";
    contact.lastModified = new Date();
  }
  localStorage.setItem("contactsData", JSON.stringify(contactsData));
  window.location.href = `/contact/?id=${contact.id}`;
});

function fillContactToEdit() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  if (!id) {
    return;
  }

  const contact = contactsData.find(
    (contactItem) => contactItem.id === parseInt(id)
  );

  if (!contact) {
    window.location.href = "/edit/";
    return;
  }

  document.getElementById("name").value = contact.name;
  document.getElementById("email").value = contact.email;
  document.getElementById("country-code").value = contact.phone.countryCode;
  document.getElementById("phone-number").value = contact.phone.phoneNumber;
  document.getElementById("job-title").value = contact.workInfo.jobTitle;
  document.getElementById("department").value = contact.workInfo.department;
  document.getElementById("company-name").value = contact.workInfo.company;
  document.getElementById("street").value = contact.address.street;
  document.getElementById("city").value = contact.address.city;
  document.getElementById("state").value = contact.address.state;
  document.getElementById("zip").value = contact.address.zip;
  document.getElementById("group").value = contact.group;

  return;
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
fillContactToEdit();
