("use strict");

populateTable("");

const searchButton = document.getElementById("searchButton");
const searchField = document.getElementById("contactSearch");

// Question: Does it affect performance?
searchField.addEventListener("keyup", ({ key }) => {
  searchString = searchField.value;
  clearTableContent();
  populateTable(searchString);
});

searchButton.addEventListener("click", () => {
  searchString = searchField.value;
  clearTableContent();
  populateTable(searchString);
});

function populateTable(searchString) {
  if ("content" in document.createElement("template")) {
    const tableBody = document.getElementById("contactsTableBody");
    const templateRow = document.getElementById("contactRow");

    contacts.forEach((contact) => {
      if (searchString) {
        if (!contact.name.toLowerCase().includes(searchString.toLowerCase())) {
          return;
        }
      }

      const newRow = templateRow.content.cloneNode(true);
      let newCols = newRow.querySelectorAll("td");
      newCols.forEach((td) => {
        td.textContent = objectToString(contact[td.textContent]);
      });
      tableBody.appendChild(newRow);
    });
  }
}

function objectToString(inspectElement) {
  let retString = "";
  if (typeof inspectElement == "string" || typeof inspectElement == "boolean") {
    return inspectElement;
  }

  for (let key in inspectElement) {
    if (retString) {
      retString = retString.concat(", ", objectToString(inspectElement[key]));
    } else {
      retString = inspectElement[key];
    }
  }

  return retString;
}

function clearTableContent() {
  tableBody = document.getElementById("contactsTableBody");
  while (tableBody.lastElementChild) {
    tableBody.removeChild(tableBody.lastElementChild);
  }
}
