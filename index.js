("use strict");

// let contact for
// for (const c in contacts) {
//   addContact(contacts[c]);
// }

if ("content" in document.createElement("template")) {
  const tableBody = document.getElementById("contactsTableBody");
  const templateRow = document.getElementById("contactRow");

  contacts.forEach((contact) => {
    const newRow = templateRow.content.cloneNode(true);
    let newCols = newRow.querySelectorAll("td");
    newCols.forEach((td) => {
      if (typeof contact[td.textContent] == "string") {
        td.textContent = contact[td.textContent];
      } else if (typeof contact[td.textContent] == "object") {
        td.textContent = objectToString(contact[td.textContent]);
      }
    });
    tableBody.appendChild(newRow);
  });
}

function objectToString(inspectElement) {
  let retString = "";
  if (typeof inspectElement == "string" || typeof inspectElement == "boolean") {
    return inspectElement;
  }

  console.log(inspectElement);
  for (let key in inspectElement) {
    if (retString) {
      retString = retString.concat(", ", objectToString(inspectElement[key]));
    } else {
      retString = inspectElement[key];
    }
  }
  console.log(retString);

  return retString;
}

function getRecord(contactElem) {
  if (typeof contactElem == "string") {
    return contactElem;
  } else if (typeof contactElem == "object") {
    let retString = "";
    for (let key in contactElem) {
      if (retString) {
        retString = retString.concat(", ", getRecord(contactElem[key]));
      } else {
        retString = contactElem[key];
      }
    }
    return retString;
  }
}

function addCol(contact) {
  const newCol = document.createElement("td");
  newCol.appendChild(document.createTextNode(getRecord(contact)));

  return newCol;
}

function addRow(contact) {
  const newRow = document.createElement("tr");
  for (let key in contact) {
    newRow.appendChild(addCol(contact[key]));
  }

  return newRow;
}

function addContact(contact) {
  const table = document.getElementById("contactsTableBody");
  table.appendChild(addRow(contact));
}
