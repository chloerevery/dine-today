Deals = new Mongo.Collection("deals");
Customers = new Mongo.Collection("customers");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

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


  Template.settings.helpers({
    'username': function(){
        return "Some other text"
    },
    'name': function(){
        return "Some other text"
    },
    'phone': function(){
        return "Some other text"
    },
    'email': function(){
        return "Some other text"
    },
    'allergies': function(){
        return "Some other text"
    },
    'zip': function(){
        return "Some other text"
    }

  });

  Template.signUp.events({
    "submit .new-user": function(event) {
      console.log("Submit button clicked");
      event.preventDefault();

      var username = event.target.username.value;
      var name = event.target.name.value;
      var phone = event.target.phone.value;
      var email = event.target.email.value;
      var allergies = event.target.allergies.value;
      var password = event.target.password.value;
      var zip = event.target.zip.value;

      Customers.insert({
        username: username,
        name: name,
        phone: phone,
        email: email,
        allergies: allergies,
        password: password,
        zip: zip,
        createdAt: new Date()
      });

      console.log("Added new user to the database with values:")
      console.log(name + " " + phone + " " + email + " " + allergies + " " + password + " " + zip);

      // clear form
      event.target.name.value = "";
      event.target.phone.value = "";
      event.target.email.value = "";
      event.target.allergies.value = "";
      event.target.password.value = "";
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

