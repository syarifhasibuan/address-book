function renderContacts() {
  const url = new URL(window.location.href);
  const queryText = url.searchParams.get("q")?.trim() || "";

  const contactItems = !queryText ? contactsData : searchContacts(queryText);

  const contactItemsElementToRender = contactItems
    .map((contact) => {
      return `
<tr id="contact-row" class="hover:bg-violet-100">
  <td class="text-gray-700 p-4 pl-7 rounded-l-md">
  ${contact.name}
  </td>
  <td class="text-gray-700 p-4">${contact.email}</td>
  <td class="text-gray-700 p-4">${joinObjectContent(contact.phone, "-")}</td>
  <td class="text-gray-700 p-4">${joinObjectContent(
    contact.work_info,
    ", "
  )}</td>
  <td class="text-gray-700 p-4">${contact.group}</td>
  <td class="text-gray-700 p-4 pr-7 rounded-r-md" id="other-column">
    <button class="flex justify-center h-9 w-9 rounded-full hover:bg-violet-100"
    >
    <img src="${
      contact.isFavorited
        ? "/assets/star-solid.svg"
        : "/assets/star-regular.svg"
    }" width="18" height="16" />
    </button>
  </td>
</tr>`;
    })
    .join("");

  const contactItemsElement = document.getElementById("contact-items");
  contactItemsElement.innerHTML = contactItemsElementToRender;
}

function searchContacts(queryText) {
  return contactsData.filter((contact) => {
    return contact.name.toLowerCase().includes(queryText.toLowerCase());
  });
}

function getContactsData() {
  if (localStorage.getItem("contactsData")) {
    return JSON.parse(localStorage.getItem("contactsData"));
  } else {
    localStorage.setItem("contactsData", JSON.stringify(contactsDefault));
    return contactsDefault;
  }
}

function joinObjectContent(object, delimiter) {
  return Object.values(object)
    .filter((x) => x)
    .join(delimiter);
}

const contactsData = getContactsData();

renderContacts();
