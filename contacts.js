const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: udokumentuj każdą funkcję
function listContacts() {
  fs.readFile(contactsPath).then((data) => {
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath).then((data) => {
    const contacts = JSON.parse(data);
    const filteredContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    console.table(filteredContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      return fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    })
    .then(() => {
      console.log("Kontakt został usunięty");
    })
    .catch((e) => {
      console.error("Error: " + e.message);
    });
}

function addContact(name, email, phone) {
  // ...twój kod
}

listContacts();
// console.log(contactsPath);
// getContactById("1DEXoP8AuCGYc1YgoQ6hw");
// removeContact("rsKkOQUi80UsgVPCcLZZW");
