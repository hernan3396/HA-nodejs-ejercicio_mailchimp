const express = require("express");
const axios = require("axios");

// constantes de mailchimp
const baseURL = "https://us10.api.mailchimp.com/3.0/";
const mailchimpKey = "d5dac202c57f5ab7301701b01bff8ab0-us10";
// const listId = "321ee1b382";

// axios
//   .get("https://us10.api.mailchimp.com/3.0/lists/321ee1b382", {
//     headers: {
//       authorization: "bearer d5dac202c57f5ab7301701b01bff8ab0-us10",
//     },
//   })
//   .then(function (response) {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   });

module.exports = (app) => {
  // get list 321ee1b382
  app.get("/lists/:id", (req, res) => {
    const listId = req.params.id;
    axios
      .get(baseURL + "lists/" + listId, {
        headers: {
          authorization: "bearer " + mailchimpKey,
        },
      })
      .then(function (response) {
        // handle success
        res.json(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

  // get members
  app.get("/lists/:listId/members", (req, res) => {
    const listId = req.params.listId;
    axios
      .get(baseURL + "lists/" + listId + "/members", {
        headers: {
          authorization: "bearer " + mailchimpKey,
        },
      })
      .then(function (response) {
        // handle success
        res.json(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

  // get new member
  app.post("/lists/:listId/members", (req, res) => {
    const listId = req.params.listId;
    axios
      .post(
        baseURL + "lists/" + listId + "/members",
        {
          email_address: "fernando2@gmail.com",
          status: "pending",
          merge_fields: {
            FNAME: "Cynthia",
            LNAME: "Fernandez",
          },
        },
        {
          headers: {
            authorization: "bearer " + mailchimpKey,
          },
        }
      )
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

// no es necesario hacer nada extraño, solo pasar la api key por insomnia si no puedo pasarlo desde el body
// y luego es usar las url
