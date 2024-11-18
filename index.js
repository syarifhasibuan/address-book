("use strict");

populateTableWithSearchString("");

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
  populateTableWithSearchString(searchString);
});

searchButton.addEventListener("click", () => {
  searchString = searchField.value;
  clearTableContent();
  populateTableWithSearchString(searchString);
});

function addListenerMulti(element, eventNames, listener) {
  let events = eventNames.split(" ");
  for (let i = 0, iLen = events.length; i < iLen; i++) {
    element.addEventListener(events[i], listener, false);
  }
}

function toggleHighlight(ev) {
  // Q: how can it understand the object event? It is in the scope?
  let tr = event.target.closest("tr");
  // Q: another method to target id?
  let targetEvent = event.target.closest("button");
  if (!tr) {
    return;
  }

  // Question: iterate over object children? (1)
  let tds = tr.children;
  for (let i = 0; i < tds.length; i++) {
    // debugger;
    if (ev.type == "mouseout") {
      tds[i].classList.remove("bg-violet-100");
      // TODO do on button instead of td
    } else if (ev.type == "mouseover" && !targetEvent) {
      tds[i].classList.add("bg-violet-100");
    }
  }
}

function shortcutKeys(e) {
  if (e.ctrlKey && e.shiftKey && e.code === "KeyF") {
    searchField.focus();
  }
}

function populateTableWithSearchString(searchString) {
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

  // console.log(inspectElement);
  // Question: iterate over object children? (2)
  for (let key in inspectElement) {
    if (key == "to_string_delimiter") {
      continue;
    }

    if (retString) {
      retString = retString.concat(
        inspectElement.to_string_delimiter,
        objectToString(inspectElement[key])
      );
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
