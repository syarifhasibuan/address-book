function renderContact() {
  const url = new URL(window.location.href);
  const idParams = url.searchParams.get("id");

  if (!idParams) {
    window.location.href = "/";
    return;
  }

  const id = parseInt(idParams);

  const contact = contactsData.find((contactItem) => {
    return contactItem.id === id;
  });

  const elementToRender = `
<div class="p-8 max-w-4xl">
  <h1 id="full-name" class="text-3xl pb-1">${contact.name}</h1>
  <p>
    ${
      !!contact.workInfo.jobTitle
        ? `<span>${contact.workInfo.jobTitle || "No job title"}</span>
       <span> | </span>`
        : ""
    }
    ${
      !!contact.workInfo.department
        ? `<span>${contact.workInfo.department}</span><span> | </span>`
        : ""
    }
    ${
      !!contact.workInfo.company
        ? `<span>${contact.workInfo.company}</span>`
        : ""
    }
  </p>
  <hr class="my-2" />
</div>
  `;

  const contactContainerElement = document.getElementById("contact-content");
  contactContainerElement.innerHTML = elementToRender;
}

renderContact();
