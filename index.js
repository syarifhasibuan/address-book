("use strict");

populateTable("");

const searchButton = document.getElementById("searchButton");
const searchField = document.getElementById("contactSearch");

document.addEventListener("keyup", shortcutKeys);

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

function shortcutKeys(e) {
  if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
    searchField.focus();
  }
}

function populateTable(searchString) {
  if ("content" in document.createElement("template")) {
    const tableBody = document.getElementById("contactsTableBody");
    const templateRow = document.getElementById("contactRow");

    contacts.forEach((contact) => {
      if (searchString) {
        if (!stringInContact(searchString, contact)) {
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

function stringInContact(str, contact) {
  stringConcatenated = objectToString(contact);

  return stringConcatenated.toLowerCase().includes(str.toLowerCase());
}

function objectToString(inspectElement) {
  let retString = "";
  // Question: string comparison, == or === ?
  if (typeof inspectElement != "object") {
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
