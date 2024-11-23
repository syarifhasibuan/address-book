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

function loadContactsData() {
  if (localStorage.getItem("contactsData")) {
    return JSON.parse(localStorage.getItem("contactsData"));
  } else {
    localStorage.setItem("contactsData", JSON.stringify(contactsDefault));
    return contactsDefault;
  }
}

const contactsData = loadContactsData();

renderSidebar();
