("use strict");

populateTable("");

const searchButton = document.getElementById("searchButton");
const searchField = document.getElementById("contactSearch");

document.addEventListener("keyup", shortcutKeys);

addListenerMulti(
  document.querySelector("#contactsTableBody"),
  "mouseover mouseout",
  toggleHighlight
);

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

function addListenerMulti(element, eventNames, listener) {
  let events = eventNames.split(" ");
  for (let i = 0, iLen = events.length; i < iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }
}

function toggleHighlight(ev) {
  let tr = event.target.closest("tr");
  if (!tr) {
    return;
  }

  // Question: iterate over object children? (1)
  let tds = tr.children;
  for (let i = 0; i < tds.length; i++) {
    if (ev.type == "mouseout") {
      tds[i].classList.remove("bg-violet-100");
    } else if (ev.type == "mouseover") {
      tds[i].classList.add("bg-violet-100");
    }
  }
}

function shortcutKeys(e) {
  if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
    searchField.focus();
  }
}

function populateTable(searchString) {
  if ("content" in document.createElement("template")) {
    const tableBody = document.getElementById("contactsTableBody");
    const templateRow = document.getElementById("contactRowTemplate");

    contacts.forEach((contact) => {
      if (searchString) {
        if (!stringInContact(searchString, contact)) {
          return;
        }
      }

      const newRow = templateRow.content.cloneNode(true);
      let newCols = newRow.querySelectorAll("td");
      newCols.forEach((td) => {
        if (td.id == "otherColumn") {
          if (contact["isFavorite"]) {
            td.getElementsByTagName("img")[0].src = "/assets/star-solid.svg";
          }
        } else {
          td.textContent = objectToString(contact[td.textContent]);
        }
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
  if (typeof inspectElement == "string") {
    return inspectElement;
  } else if (typeof inspectElement != "object") {
    return "";
  }

  // Question: iterate over object children? (2)
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
