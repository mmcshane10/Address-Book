//Business logic for address book ----
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}
// Create a prototype method to add new Contacts to an AddressBook, right below the AddressBook constructor:
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId(); // <----This is a new added line!!
  this.contacts.push(contact);
}
// This new method will increment the this.currentId property on the AddressBook object by 1 and return the updated value. This mimics a database by creating sequentially incrementing ID values which are never repeated (making them unique).
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
//it takes an id as an argument. This will contain the unique ID we assigned to each Contact in the previous lesson. The method then loops through the AddressBook object's contacts array, checking each entry's id against the id provided to the findContact() method as an argument. When a match is found, the method returns the Contact object with that specific id.
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i].id == id) {
      return this.contacts[i];
    }
  };
return false;
}

//Also, notice we use a for loop instead of a forEach. This is because we can return from (or 'break out' of) a for loop. We can't escape from a forEach loop. We want to stop looping as soon as we find a matching id. It wouldn't be efficient if the loop continued even after finding a match, especially if there were a million records! If there's a Contact with a matching id, it returns the Contact. If there isn't, it returns false because there's no match.

//Business logic for contacts-----
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}


//    1. We create an AddressBook object.
//    2. We create a new Contact object with a firstName of "Ada", under the variable name contact.
//    3. We create another new Contact object, this time with a firstName of "Grace", under the variable name contact2.
//    4. We add the first Contact object to our AddressBook, using our new addContact() method.
//    5. We add the second Contact object to the AddressBook using the same new method.
