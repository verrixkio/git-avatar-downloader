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
    avatarUrl = user.avatar_url
    filePathName = "./avatardownloads/avatarPicture " + i + ".jpg"
    downloadImageByURL(avatarUrl, filePathName)
  }
}));

var url = 'https://avatars1.githubusercontent.com/u/43004?v=4'
var filePath = "./avatardownloads/testing.jpg"
var fs = require('fs');


function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
       .on('error', function (err) {
         throw err; 
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
}




