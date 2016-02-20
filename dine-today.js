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
      },
      
      deals: function () {
        console.log("finding all deals");
        return Deals.find({});
      },

      hasSignedUp: function() {
        var hasSignedUp = Customers.find( { 'userid': Meteor.userId()} ).count();
        if (hasSignedUp>0) {
          return true;
        } else {
          return false
        }
      },

      isRestaurant: function() {
        //if is restaurant, show restaurant menu (post deal)
        //if is diner, show diner menu (deals)
        var isRestaurant = Customers.find( { 'userid': Meteor.userId(), 'usertype': 'restaurant'} ).count();
        if (isRestaurant>0) {
          console.log("she's a restaurant");
          return true;
        } else {
          console.log("she's a customer");
          return false
        }
      }

    });

    Template.myReservations.helpers({
      deals: function() {
        var userid = Meteor.userId();
        console.log("querying deals to bring you your reservations");
        console.log("userid querying with: " + userid);
        return Deals.find({'claimants' : {$in: [userid]}});
      }
    });

    Template.takenDeals.helpers({
      deals: function() {
        var userid = Meteor.userId();
        console.log("querying deals to bring you your customers");
        console.log("querying deals with userid " + userid);
        return Deals.find({'userid' : userid});
      },

      customers: function () {
        claimants = this.claimants;
        console.log("claimants " + claimants);
        return claimants;
      }




        // var claimantNames = new Array();
        // //create new array to hold names of people who have reserved
        // for (var c in claimants) { //for each item c in claimants
        //   console.log("querying with userid " + claimants[c]);
        //   var customerName = Customers.find({'userid': claimants[c]});
        //   return customerName;
        //   // console.log("customerName is " + customerName);
        //   // claimantNames.push(customerName);
        //   // console.log("pushed " + customerName + "to claimantNames");
        // }
        // // return claimantNames;
    

    });
    

    Template.dealsList.helpers({
      deals: function () {
          console.log("finding all deals");
          return Deals.find({});
        },

      dealsAvailable: function(id) { //returns true if a deal is sold out 
        //if deal's tables <= 0 return true
        console.log("deal id!: " + id);
        if (Deals.find({ tables: { $gt: 0 }, _id: id }).count() > 0) {
          console.log("Fuck it, I'll take the deal!");
          return true;
        } else {
          console.log("no deal, howie!")
          return false;
        }
      }

    });

   Template.restaurantCreateDeal.helpers({
      
      customers: function () {

        return Customers.find( { 'userid': Meteor.userId()} );
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

  Template.restaurantCreateDeal.events({
    "submit .post-deal": function(event) {
      event.preventDefault();
      console.log("Submit a deal button clicked");

      var time = event.target.time.value
      var tables = parseInt(event.target.tables.value);
      var discount = event.target.discount.value;
      var partysize = event.target.partysize.value;
      var userid = Meteor.userId();
      var restaurantname = this.name;
      var id = this._id;
      console.log("Restaurant name: " + restaurantname);
      console.log("id: " + id);
      var claimants = new Array();

      Deals.insert({
        restaurantname: restaurantname,
        time: time,
        tables: tables,
        discount: discount,
        partysize: partysize,
        userid: userid,
        claimants: claimants,
        createdAt: new Date()
      });

        
      

      // clear form
      event.target.time.value = "";
      event.target.tables.value = "";
      event.target.discount.value = "";
      event.target.partysize.value = "";
      $("#restaurants").toggleClass("hidden");

    }


  });



  Template.signUp.events({
    "submit .new-user": function() {
      console.log("Submit button clicked");
      event.preventDefault();
      var isRestaurant = event.target.userType.value;

      var name = event.target.name.value;
      var phone = event.target.phone.value;
      var email = event.target.email.value;
      var allergies = event.target.allergies.value;
      var zip = event.target.zip.value;
      var userid = Meteor.userId();
      Customers.insert({
        usertype: isRestaurant,
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


  Template.postdeal.events({
    'click .restaurants': function() {
       $("#restaurants").toggleClass("hidden");
     }
  });

  Template.selectsettings.events({
    'click .settings': function() {
      $("#settings").toggleClass("hidden");
    }

  });

  Template.dd.events({
    'click .dailyDeals': function() {
      console.log("you clicked on daily deals button");
       $("#claimDeal").toggleClass("hidden"); 
     }
     
  });


  Template.viewMyReservations.events({
    'click .myReservations': function() {
      $("#myReservations").toggleClass("hidden");
    }
  });

  Template.viewTakenDeals.events({
    'click .takenDeals': function() {
      $("#takenDeals").toggleClass("hidden");
    }
  });

  Template.dealsList.events({
    

     "click .dealButton": function(event) {
        console.log("you submitted a claim!");

        event.preventDefault();
        console.log("you submitted a claim");
        var dealid = this._id;
        console.log("id of deal: " + dealid);
        var userid = Meteor.userId();
        console.log("id of user: " + userid);
        var newclaimants = this.claimants;
        newclaimants.push(userid);
        var tablesremaining = this.tables;
        tablesremaining--;

        Deals.update({
            _id: dealid}, {$set: {claimants: newclaimants, tables: tablesremaining}}); //claimants now has the claimants' userids
          
        }
      
  });



}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("Now running meteor!");
  });
}

