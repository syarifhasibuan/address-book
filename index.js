("use strict");

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

  for (let key in inspectElement) {
    if (retString) {
      retString = retString.concat(", ", objectToString(inspectElement[key]));
    } else {
      retString = inspectElement[key];
    }
  }

  return retString;
}
