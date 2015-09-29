// TODO: Get OAuth redirect with authData working
function auth () {
  var ref = new Firebase("https://intense-heat-8207.firebaseio.com");
  ref.authWithOAuthPopup("github", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
}

// What do I do with authData object? token and uid, and then some.
// What do I want to do with it though?
// Redirect to app proper?
// Check if there's a satellite available?
// Show available satellites, then upon picking one, claim it?
