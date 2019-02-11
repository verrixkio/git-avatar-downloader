var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// Change getRepo function to parse the JSON string into an object
// pass this object (an array of contributors) objects to the cb function

function getRepoContributors(repoOwner, repoName, cb) {
  var secrets = require('./secrets.js');
  var options = {
  
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      
      'authorization': secrets
    }
  };

    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
  });
}

console.log(getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //Trying to access the object
  var user =[]
  
  for (var i = 0; i < result.length; i++) {
    user = result[i]
    console.log(user.avatar_url)
  }
}));
