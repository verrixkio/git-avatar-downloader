var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  var secrets = require('./secrets.js')
  var options = {
  
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      
      'authorization': secrets
    }
  };

    request(options, function(err, res, body) {
      cb(err, body);
  });
}

console.log(getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
}));
