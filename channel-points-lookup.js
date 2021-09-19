<html>
<title> Channel Points Lookup </title>
<body>


<input id="channelname" type="text" value="jaku" placeholder="Enter Channel Name">
<button onclick="getChannelPoints()">Click me</button>

<ul id="list">

</ul> 

</body>
<script>

// Open Inspect Tools, (Ctrl + Shift + J) in Chrome and locate the Console tab. Paste the code below.
// alert( document.cookie.match( /(; )?auth-token=([^;]*);?/ )[ 2 ] )
// Copy the value and when loading this page, paste it in the prompt.

var oauthToken;
if ( sessionStorage.getItem('oauthToken') ) {
	oauthToken = sessionStorage.getItem('oauthToken')
} else {
	oauthToken = prompt("Please enter your Twitch Oauth Token", "");
};

function getChannelPoints() {
	let headers = new Headers();
	headers.append("client-id", "kimne78kx3ncx6brgo4mv6wki5h1ko");
	headers.append("authorization", `OAuth ${oauthToken}`);
	headers.append("Content-Type", "application/json");

	var body = JSON.stringify({
	  "operationName": "ChannelPointsContext",
	  "variables": {
	    "channelLogin": document.getElementById('channelname').value,
	    "includeGoalTypes": [
	      "CREATOR",
	      "BOOST"
	    ]
	  },
	  "extensions": {
	    "persistedQuery": {
	      "version": 1,
	      "sha256Hash": "1530a003a7d374b0380b79db0be0534f30ff46e61cffa2bc0e2468a909fbc024"
	    }
	  }
	});

	var fetchOptions = {
	  method: 'POST',
	  headers,
	  body
	};

	fetch("https://gql.twitch.tv/gql", fetchOptions)
	  .then(response => response.json())
	  .then(result => {
	  	const data = result['data'];
	  	const channelName = data['community']['displayName'];
	  	const points = data['community']['channel']['self']['communityPoints']['balance'];
	  	
		const ul = document.getElementById("list");
		const li = document.createElement("li");
		li.appendChild(document.createTextNode(`Channel: ${channelName} - Points: ${points}`));
		ul.appendChild(li);

	  })
	  .catch(error => {
	  	alert("Something went wrong. Either invalid oauth token, or invalid channel. Refresh and try again.")
	  });
};

 </script>

</html>
