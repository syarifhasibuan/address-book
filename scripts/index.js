function renderContacts() {
  const url = new URL(window.location.href);
  const queryText = url.searchParams.get("q")?.trim() || "";
  const groupText = url.searchParams.get("group") || "";
  // console.log(groupText);

  if (queryText) {
    contactItems = searchContacts(queryText);
  } else if (groupText) {
    contactItems = filterByGroup(groupText);
    console.log(contactItems);
  } else {
    contactItems = contactsData;
  }

  // const contactItems = !queryText ? contactsData : searchContacts(queryText);

  const contactItemsElementToRender = contactItems
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((contact) => {
      return `
<tr id="contact-row" class="hover:bg-violet-100">
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

function renderSidebar() {
  const groupDiv = document.getElementById("group-list");

  const uniqueGroups = contactsData
    .map((contact) => contact.group)
    .filter(
      (group, index, array) => index === array.indexOf(group) && group != ""
    );

  const sidebarGroupToRender = uniqueGroups
    .map((groupName) => {
      return `
      <div class="flex flex-col justify-start w-full">
        <a href="/?group=${groupName}"
          class="h-full flex flex-row w-full rounded-lg hover:bg-violet-200 text-left pl-4"
        >
          <img src="/assets/address-card-solid.svg" height="24" width="24" />
          <span class="text-xl text-gray-700 p-2">${groupName}</span>
        </a>
      </div>
    `;
    })
    .join("");

  const groupListElement = document.getElementById("group-list");
  groupListElement.innerHTML =
    groupListElement.innerHTML + sidebarGroupToRender;
}

function filterByGroup(groupText) {
  console.log(groupText);
  return contactsData.filter((contact) => {
    return contact.group == groupText;
  });
}

function searchContacts(queryText) {
  return contactsData.filter((contact) => {
    return contact.name.toLowerCase().includes(queryText.toLowerCase());
  });
}

function loadContactsData() {
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

const contactsData = loadContactsData();

renderContacts();
renderSidebar();
