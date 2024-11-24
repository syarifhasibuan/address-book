function renderContacts() {
  const url = new URL(window.location.href);
  const queryText = url.searchParams.get("q")?.trim() || "";
  const groupText = url.searchParams.get("group") || "";

  if (queryText) {
    contactItems = searchContacts(queryText);
  } else if (groupText) {
    // Question: bener ga metode kyk gini?
    contactItems = filterByGroup(groupText);
  } else {
    contactItems = contactsData;
  }

  const contactItemsElementToRender = contactItems
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
      if (a.isFavorited && !b.isFavorited) return -1;
      if (!a.isFavorited && b.isFavorited) return 1;
      return a.name.localeCompare(b.name);
    })
    .map((contact) => {
      return `
<tr id="contact-row" onclick="window.location='/contact/?id=${
        contact.id
      }';" class="hover:cursor-pointer hover:bg-violet-100">
  <td class="text-gray-700 p-4 pl-7 rounded-l-md">
  ${contact.name}
  </td>
  <td class="text-gray-700 p-4">${contact.email}</td>
  <td class="text-gray-700 p-4">${joinObjectContent(contact.phone, "-")}</td>
  <td class="text-gray-700 p-4">${joinObjectContent(
    contact.workInfo,
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

function filterByGroup(groupText) {
  return contactsData.filter((contact) => {
    return contact.group == groupText;
  });
}

function searchContacts(queryText) {
  return contactsData.filter((contact) => {
    return contact.name.toLowerCase().includes(queryText.toLowerCase());
  });
}

function joinObjectContent(object, delimiter) {
  return Object.values(object)
    .filter((x) => x)
    .join(delimiter);
}

renderContacts();
