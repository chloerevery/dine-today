if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  Template.su.events({
    'click .signUp': function () {
      // increment the counter when button is clicked
      // Session.set('counter', Session.get('counter') + 1);
      $("#signUp").toggleClass("hidden");
      //console.log("clicked button");
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("Now running meteor!");
  });
}

