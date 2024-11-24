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
      <a
        href="/contact/?id=${contact.id}"
        class="flex flex-row p-4 gap-4 hover:cursor-pointer hover:bg-violet-100">
        <div class="flex-1 text-lg font-semibold text-gray-800">
          ${contact.name}
        </div>
        <div class="flex-1 text-sm text-gray-600">
          ${contact.email}
        </div>
        <div class="flex-1 text-sm text-gray-600">
          ${joinObjectContent(contact.phone, "-")}
        </div>
        <div class="flex-1 text-sm text-gray-600">
          ${joinObjectContent(contact.workInfo, ", ")}
        </div>
        <div class="flex-1 text-sm text-gray-600">
          ${contact.group}
        </div>
        <div class="flex-1">
          <button
            data-id="${contact.id}"
            onclick="toggleFavorite(event)"
            class="flex items-center size-10 justify-center rounded-full hover:bg-violet-300">
            <img data-id="${contact.id}" src="${
        contact.isFavorited
          ? "/assets/star-solid.svg"
          : "/assets/star-regular.svg"
      }" width="18" height="16" />
          </button>
        </div>
      </a>`;
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

function toggleFavorite(event) {
  event.stopPropagation();
  event.preventDefault();

  const id = event.target.dataset.id;

  const contact = contactsData.find(
    (contactItem) => contactItem.id === parseInt(id)
  );

  contact.isFavorited = !contact.isFavorited;

  localStorage.setItem("contactsData", JSON.stringify(contactsData));

  renderContacts();
}

renderContacts();
