function renderContact() {
  const url = new URL(window.location.href);
  const idParams = url.searchParams.get("id");

  if (!idParams) {
    window.location.href = "/";
    return;
  }

  const id = parseInt(idParams);

  const contact = contactsData.find((contactItem) => {
    // Question: which one is correct?
    // const id = parseInt(idParams);
    // return contactItem.id === id;
    // or
    // return contactItem.id == id;
    return contactItem.id === id;
  });

  if (!contact) {
    window.location.href = "/";
    return;
  }

  const mapsURI = encodeURI(
    contact.address.street +
      " " +
      contact.address.city +
      " " +
      contact.address.state +
      " " +
      contact.address.zip
  );

  const elementToRender = `
<div class="p-8 max-w-4xl">
  <div class="flex flex-row justify-between">
    <h1 id="full-name" class="text-3xl pb-1">${contact.name}</h1>
    <div class="flex flex-row">
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
      <button
        data-id="${contact.id}"
        onclick="event.stopPropagation(); event.preventDefault(); window.location.href='/edit/?id=${
          contact.id
        }'"
        class="flex items-center size-10 justify-center rounded-full hover:bg-violet-300">
        <img data-id="${
          contact.id
        }" src="/assets/pen-to-square-solid.svg" width="16" height="16" />
      </button>
    </div>
  </div>
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
  <div class="flex flex-row mt-4 gap-5">
    <div class="p-3 rounded-md w-3/5 bg-slate-100">
      <h2 class="text-lg font-medium mb-2">Contact details</h2>
      ${
        !!contact.phone
          ? `<p class="flex flex-row gap-4 mb-2">
          <img src="/assets/phone-solid.svg" width="16" height="16" />
          <span>
        <a href="tel:${contact.phone.countryCode}-${contact.phone.phoneNumber}" class="hover:text-blue-800"
              target="_blank" >${contact.phone.countryCode}-${contact.phone.phoneNumber}</a
            ></span
          >
        </p>`
          : ""
      }
      ${
        !!contact.email
          ? `<p class="flex flex-row gap-4 mb-2">
        <img
          src="/assets/envelope-regular.svg"
          width="16"
          height="16"
        />
        <span>
          <a href="mailto:${contact.email}" class="hover:text-blue-800" target="_blank"
            >${contact.email}</a
          > </span
        >
      </p>`
          : ""
      }
      ${
        !!contact.address.street &&
        !!contact.address.city &&
        !!contact.address.state &&
        !!contact.address.zip
          ? `<p class="flex flex-row items-start gap-4 mb-2">
        <img
          src="/assets/location-dot-solid.svg"
          width="16"
          height="16"
        />
        <span>
          <a
            href="https://maps.google.com/maps?=${encodeURI(
              `${
                contact.address.street +
                " " +
                contact.address.city +
                " " +
                contact.address.state +
                " " +
                contact.address.zip
              }`
            )}"
            class="hover:text-blue-800"
            target="_blank"
            >${
              !!contact.address.street
                ? `${contact.address.street}
            <br>`
                : ""
            }
            ${
              !!contact.address.city
                ? `${contact.address.city}
            <br>`
                : ""
            }
            ${
              !!contact.address.state
                ? `
                ${contact.address.state}
                <br>
              `
                : ""
            }
            ${
              !!contact.address.zip
                ? `
                ${contact.address.zip}
              `
                : ""
            }
            </a
          ></span
        >
      </p>`
          : ""
      }
    </div>
    <div class="p-3 rounded-md w-2/5 bg-slate-100">
      <h2 class="text-lg font-medium mb-2">History</h2>
      <p class="flex flex-row gap-4 mb-1">
        <span class="">Created:</span>
        <span class="">${moment(`${contact.createdAt}`).fromNow()}</span>
      </p>
      ${
        !!contact.lastModified
          ? `<p class="flex flex-row gap-4 mb-1">
        <span class="">Modified:</span>
        <span class="">${moment(`${contact.lastModified}`).fromNow()}</span>
      </p>`
          : ``
      }
    </div>
  </div>
</div>
  `;

  const contactContainerElement = document.getElementById("contact-content");
  contactContainerElement.innerHTML = elementToRender;
}

function toggleFavorite(event) {
  event.stopPropagation();
  event.preventDefault();

  const url = new URL(window.location.href);
  const idParams = url.searchParams.get("id");
  const id = idParams;

  const contact = contactsData.find(
    (contactItem) => contactItem.id === parseInt(id)
  );
  console.log(contact);

  contact.isFavorited = !contact.isFavorited;

  localStorage.setItem("contactsData", JSON.stringify(contactsData));

  renderContact();
}

renderContact();
