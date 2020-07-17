//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.email;
      console.log(firstName, lastName, email);

      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      };

      const jsonData = JSON.stringify(data);

      const url = "https://us10.api.mailchimp.com/3.0/lists/b18bebb663"
      const options = {
        method: "POST",
        auth: "rico1:20532bc60e2c6894b481b646b98f411f-us10"
      }

      const request = https.request( url, options, function(response) {


        if (response.statusCode === 200)  {
          res.sendFile(__dirname + "/success.html");
        } else {
          res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
          console.log(JSON.parse(data));
        });
        });

        request.write(jsonData);
        request.end();

      });
      app.post("/failure", function(req, res){
        res.redirect("/");
      });


        app.listen(process.env.PORT || 3000, function() {
        console.log("Server is running on port 3000");
      });

      //Chrome:https://infinite-ridge-61073.herokuapp.com/

      //const url:--url 'https://usX.api.mailchimp.com/3.0/lists'

      //api key:
      // 20532bc60e2c6894b481b646b98f411f-us10

      //list ID:
      //b18bebb663

      //data:
      //name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}'
      //curl
      //--request POST
      /*
        curl --request POST \
      --url 'https://usX.api.mailchimp.com/3.0/lists' \
      --user 'anystring:apikey' \
      --header 'content-type: application/json' \
      --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \
      --include */
