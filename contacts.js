const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

/**
 * Displays a list of contacts from the contacts.json file
 */
function listContacts() {
  fs.readFile(contactsPath).then((data) => {
    console.table(JSON.parse(data));
  });
}

/**
 * Displays a contact with the specified ID.
 * @param {string} contactId - The ID of the contact to display.
 */
function getContactById(contactId) {
  fs.readFile(contactsPath).then((data) => {
    const contacts = JSON.parse(data);
    const filteredContact = contacts.filter(
      (contact) => contact.id === contactId
    );
    console.table(filteredContact);
  });
}

/**
 * Removes a contact with the specified ID.
 * @param {string} contactId - The ID of the contact to remove.
 * @throws {Error} - Throws an error if the contact with the specified ID doesn't exist.
 */
function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);

      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );

      if (contactIndex === -1) {
        throw new Error("Kontakt o podanym ID nie istnieje");
      }
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      return fs
        .writeFile(contactsPath, JSON.stringify(filteredContacts))
        .then(() => {
          console.log("Kontakt został usunięty");
        });
    })

    .catch((e) => {
      console.error("Error: " + e.message);
    });
}

/**
 * Adds a new contact.
 * @param {string} name - The name of the new contact.
 * @param {string} email - The email of the new contact.
 * @param {string} phone - The phone number of the new contact.
 */
function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact = {
        id: uuidv4(),
        name: name,
        email: email,
        phone: phone,
      };
      contacts.push(newContact);
      console.log("Kontakt został dodany");
      return fs.writeFile(contactsPath, JSON.stringify(contacts));
    })
    .catch((e) => {
      console.error("Error: " + e.message);
    });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
