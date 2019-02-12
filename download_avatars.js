var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// Create logic for what gets processed
var isInput = process.argv;
if (isInput.length < 4) {
  return console.log('Please Enter the name of the repo and who wrote it!')
};

//Set CL prompts
let [repoOwnedBy, repoNamed] = process.argv.slice(2);
console.log(repoOwnedBy, repoNamed);

//Get the parsed JSON object for the avatarURLS
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

//Enter the function for what happens to the URL when the body is returned.
console.log(getRepoContributors(repoOwnedBy, repoNamed, function(err, result) {
  console.log("Errors:", err);
  //Trying to access the object
  var user =[];
  //Get the avatar_url and then push the avatarpicture into the relvent folder with a relvant name
  for (var i = 0; i < result.length; i++) {
    user = result[i];
    userName = user.login
    avatarUrl = user.avatar_url;
    filePathName = "./avatardownloads/" + userName + ".jpg";
    downloadImageByURL(avatarUrl, filePathName);
  }
}));

var url = 'https://avatars1.githubusercontent.com/u/43004?v=4'
var filePath = "./avatardownloads/testing.jpg"
var fs = require('fs');

//Write the avatar pictures into the right files
function downloadImageByURL(url, filePath) {
  // ...
  request.get(url)
       .on('error', function (err) {
         throw err; 
       })
       .on('response', function (response) {
         console.log('The download has been completed:', response.statusMessage);
       })
       .pipe(fs.createWriteStream(filePath));
}




