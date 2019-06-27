// //Business logic for address book ----
// function AddressBook() {
//   this.contacts = [];
//   this.currentId = 0;
// }
// // Create a prototype method to add new Contacts to an AddressBook, right below the AddressBook constructor:
// AddressBook.prototype.addContact = function(contact) {
//   contact.id = this.assignId(); // <----This is a new added line!!
//   this.contacts.push(contact);
// }
// // This new method will increment the this.currentId property on the AddressBook object by 1 and return the updated value. This mimics a database by creating sequentially incrementing ID values which are never repeated (making them unique).
// AddressBook.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// }
// //it takes an id as an argument. This will contain the unique ID we assigned to each Contact in the previous lesson. The method then loops through the AddressBook object's contacts array, checking each entry's id against the id provided to the findContact() method as an argument. When a match is found, the method returns the Contact object with that specific id.
// AddressBook.prototype.findContact = function(id) {
//   for (var i=0; i< this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (this.contacts[i].id == id) {
//       return this.contacts[i];
//     }
//   }
//   };
// return false;
// }
// //It's very similar to findContact(). However, it deletes the contact with a matching ID and then returns true because the operation was completed. (If there's no record with a matching id to delete, it returns false.)
// AddressBook.prototype.deleteContact = function(id) {
//   for (var i=0; i< this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (this.contacts[i].id == id) {
//         delete this.contacts[i];
//         return true;
//       }
//     }
//   };
//   return false;
// }
//
// //Also, notice we use a for loop instead of a forEach. This is because we can return from (or 'break out' of) a for loop. We can't escape from a forEach loop. We want to stop looping as soon as we find a matching id. It wouldn't be efficient if the loop continued even after finding a match, especially if there were a million records! If there's a Contact with a matching id, it returns the Contact. If there isn't, it returns false because there's no match.
//
// //Business logic for contacts-----
// function Contact(firstName, lastName, phoneNumber) {
//   this.firstName = firstName;
//   this.lastName = lastName;
//   this.phoneNumber = phoneNumber;
// }
//
// Contact.prototype.fullName = function() {
//   return this.firstName + " " + this.lastName;
// }
//
// //    1. We create an AddressBook object.
// //    2. We create a new Contact object with a firstName of "Ada", under the variable name contact.
// //    3. We create another new Contact object, this time with a firstName of "Grace", under the variable name contact2.
// //    4. We add the first Contact object to our AddressBook, using our new addContact() method.
// //    5. We add the second Contact object to the AddressBook using the same new method.
// User Interface Logic ---------




// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
