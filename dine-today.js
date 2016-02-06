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

  Template.signUp.events({
    "submit .new-user": function(event) {
      console.log("Submit button clicked");
      event.preventDefault();

      var name = event.target.name.value;
      var phone = event.target.phone.value;
      var email = event.target.email.value;
      var allergies = event.target.allergies.value;
      var zip = event.target.zip.value;
      var userid = Meteor.userId();

      Customers.insert({
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

  Template.si.events({
    'click .signIn': function() {
       $("#signIn").toggleClass("hidden");
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

