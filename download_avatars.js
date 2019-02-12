var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// Create logic for what gets processed
var isInput = process.argv;
if (isInput.length < 4) {
  return console.log('Please Enter the name of the repo and who wrote it!')
};

//Set CL prompts
let [repoOwnedBy, repoNamed] = process.argv.slice(2);

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
    // Return the parsed JSON Body to work with
    request(options, function(err, res, body) {
      cb(err, JSON.parse(body));
  });
}

//Call the function and check for errors first
console.log(getRepoContributors(repoOwnedBy, repoNamed, function(err, result) {
  console.log("Errors:", err);
  //Create a empty array for each individual user.
  var user =[];
  //Get the avatar_url and then push the avatarpicture into the relvent folder with a relvant name
  for (var i = 0; i < result.length; i++) {
    user = result[i];
    userName = user.login;
    avatarUrl = user.avatar_url;
    filePathName = "./avatardownloads/" + userName + ".jpg";
    downloadImageByURL(avatarUrl, filePathName);
  }
}));
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




