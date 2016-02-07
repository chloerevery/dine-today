Deals = new Mongo.Collection("deals");
Customers = new Mongo.Collection("customers");

if (Meteor.isClient) {
  Session.setDefault('counter', 0);

  Template.body.helpers({
      //  deals: [
      //   { text: "This is deal 1" },
      //   { text: "This is deal 2" },
      //   { text: "This is deal 3" }
      // ]
      customers: function () {

        return Customers.find({});
      }

    });

  Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
      });
  
  Template.settings.helpers({

    'customers': function(){
     return Customers.find({'userid': Meteor.userId()})
   }

  });

  Template.settings.events({
    "click .settingsName": function(event) {
      $(".settingsName").toggleClass("hidden");
      $(".changeName").toggleClass("hidden");
    },

    "click .settingsPhone": function(event) {
      $(".settingsPhone").toggleClass("hidden");
      $(".changePhone").toggleClass("hidden");
    },

    "click .settingsEmail": function(event) {
      $(".settingsEmail").toggleClass("hidden");
      $(".changeEmail").toggleClass("hidden");
    },

    "click .settingsAllergies": function(event) {
      $(".settingsAllergies").toggleClass("hidden");
      $(".changeAllergies").toggleClass("hidden");
    },

    "click .settingsZip": function(event) {
      $(".settingsZip").toggleClass("hidden");
      $(".changeZip").toggleClass("hidden");
    },

    //change setting button clicks
    "submit .change-name": function(event) {
      event.preventDefault();
      console.log("Submit button clicked");
      var name = event.target.name.value;
      var id = this._id;
      Customers.update({
        _id: id}, {$set: {name: name}});
      $(".settingsName").toggleClass("hidden");
      $(".changeName").toggleClass("hidden");
    },

    "submit .change-phone": function() {
      event.preventDefault();
      console.log("Submit button clicked");
      var phone = event.target.phone.value;
      var id = this._id;
      console.log("other id: " + id)
      Customers.update({
        _id: id}, {$set: {phone: phone}});
      $(".settingsPhone").toggleClass("hidden");
      $(".changePhone").toggleClass("hidden");
    },

    "submit .change-email": function() {
      event.preventDefault();
      console.log("Submit button clicked");
      var email = event.target.email.value;
      console.log("email is: " + email);
      var id = this._id;
      console.log("id for email is: " + id);
      Customers.update({
        _id: id}, {$set: {email: email}});
      $(".settingsEmail").toggleClass("hidden");
      $(".changeEmail").toggleClass("hidden");
    },

    "submit .change-allergies": function() {
      event.preventDefault();
      console.log("Submit button clicked");
      var allergies = event.target.allergies.value;
      var id = this._id;
      Customers.update({
        _id: id}, {$set: {allergies: allergies}});
      $(".settingsAllergies").toggleClass("hidden");
      $(".changeAllergies").toggleClass("hidden");
    },

    "submit .change-zip": function() {
      event.preventDefault();
      console.log("Submit button clicked");
      var zip = event.target.zip.value;
      var id = this._id;
      Customers.update({
        _id: id}, {$set: {zip: zip}});
      $(".settingsZip").toggleClass("hidden");
      $(".changeZip").toggleClass("hidden");
      }

  });

  Template.signUp.events({
    "submit .new-user": function() {
      console.log("Submit button clicked");
      event.preventDefault();
      var restaurant = event.target.name.value;

      var name = event.target.name.value;
      var phone = event.target.phone.value;
      var email = event.target.email.value;
      var allergies = event.target.allergies.value;
      var zip = event.target.zip.value;
      var userid = Meteor.userId();
      Customers.insert({
        restaurant: restaurant,
        userid: userid,
        name: name,
        phone: phone,
        email: email,
        allergies: allergies,
        zip: zip,
        createdAt: new Date()
      });

      console.log("Added new user to the database with values:")
      console.log(name + " " + phone + " " + email + " " + allergies + " " + zip);

      // clear form
      event.target.name.value = "";
      event.target.phone.value = "";
      event.target.email.value = "";
      event.target.allergies.value = "";
      event.target.zip.value = "";

    }
  });

  Template.su.events({
    'click .signUp': function () {
      $("#signUp").toggleClass("hidden");
      console.log("clicked button");
    }
  });


  Template.rest.events({
    'click .restaurants': function() {
       $("#restaurants").toggleClass("hidden");
     }
  });

  Template.dd.events({
    'click .dailyDeals': function() {
       $("#dailyDeals").toggleClass("hidden"); 
     }
  });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("Now running meteor!");
  });
}

