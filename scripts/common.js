const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("contact-search");

document.addEventListener("keyup", (event) => {
  if (event.ctrlKey && event.shiftKey && event.code === "KeyF") {
    searchInput.focus();
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  window.location.href = "/" + "?q=" + searchInput.value;
});

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
          <img src="/assets/people-group-solid.svg" height="24" width="24" />
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
    const contactsData = JSON.parse(localStorage.getItem("contactsData"));

    return contactsData.map((contact) => {
      return { ...contact, createdAt: new Date(contact.createdAt) };
    });
  } else {
    const modifiedContactsDefault = contactsDefault.map((contact) => {
      return { ...contact, createdAt: new Date(contact.createdAt) };
    });

    localStorage.setItem(
      "contactsData",
      JSON.stringify(modifiedContactsDefault)
    );
    return contactsDefault;
  }
}

const contactsData = loadContactsData();

renderSidebar();
