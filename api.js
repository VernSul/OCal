 // Client ID and API key from the Developer Console
      var CLIENT_ID = '668966074253-qfav8ajk0eu9jihtk2b215infpkfgv4t.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyCQQnGtEt0pE6lMhR7GAGuXJiy_zOr83XQ';


      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

      var owner;

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      var nameinput = document.getElementById('friend');
      var dateinput = document.getElementById('date');
      var sub = document.getElementById('get');
  

      sub.addEventListener("click", submit);

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }
      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
          
        });
      }
      console.log("1st step")

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        console.log(isSignedIn)
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          //nameinput.style.display = 'block';
          // dateinput.style.display = 'block';
          // sub.style.display = 'block';
          loadUpcomingEvents();
          
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
          // nameinput.style.display = 'none';
          // dateinput.style.display = 'none';
          // submit.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        console.log("authentification")
        gapi.auth2.getAuthInstance().signIn();
      
        

      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function loadUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 20,
          'orderBy': 'startTime',
          'userId': 'me'
        }).then(function(response) {
          owner = response.result.summary;
          fetch("http://localhost:3000/getdata", {
            method: "POST",
            mode: 'cors',
            // redirect: 'follow',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }),
            body: JSON.stringify(response)
          }).then(function (data) {  
            console.log('Request success: ', data);  
          })  
          .catch(function (error) {  
            console.log('Request failure: ', error);  
          });
        });
        
      }

      
      function submit() {
        fetch("http://localhost:3000/getdata/"+owner+"/"+nameinput.value+"/"+dateinput.value, {
          method: "GET",
          mode: 'cors'
        }).then(function (data) {  
          console.log('Request success: ', data.headers);  
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });
        window.location.replace("http://localhost:3000/getdata/"+owner+"/"+nameinput.value+"/"+dateinput.value);
        

      }


          // var events = response.result.items;
          // appendPre('Upcoming events:'+ response.result.summary);

          // if (events.length > 0) {
          //   for (i = 0; i < events.length; i++) {

          //     var event = events[i];
          //     var when = event.start.dateTime;
          //     var loc = event.location;
          //     if (!when) {
          //       when = event.start.date;
          //     }
          //     appendPre(event.summary + ' (' + when + ')' + loc)
          //   }
          // } else {
          //   appendPre('No upcoming events found.');
          // }
