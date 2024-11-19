function renderContacts() {
  const contactItemsElement = document.getElementById("contact-items");

  const contactItemsElementToRender = contacts
    .map((contact) => {
      return `
<tr id="contactRow">
  <td class="text-gray-700 p-4 pl-7 rounded-l-md">
  ${contact.name}
  </td>
  <td class="text-gray-700 p-4">${contact.email}</td>
  <td class="text-gray-700 p-4">${contact.phone.phone_number}</td>
  <td class="text-gray-700 p-4">${contact.work_info.job_title}</td>
  <td class="text-gray-700 p-4">${contact.group}</td>
  <td class="text-gray-700 p-4 pr-7 rounded-r-md" id="otherColumn">
  <button
    id="favoriteButton"
    class="flex justify-center h-9 w-9 rounded-full hover:bg-violet-100"
  >
  <img src="${
    contact.isFavorited ? "/assets/star-solid.svg" : "/assets/star-regular.svg"
  }" width="18" height="16" />
    </button>
  </td>
</tr>`;
    })
    .join("");

  contactItemsElement.innerHTML = contactItemsElementToRender;
}

renderContacts();
