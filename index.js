var express = require('express'),
    express_handlebars = require('express-handlebars'),
    github = require('octonode');

const app = express(),
      client = github.client();




app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));

app.use(express.static(__dirname + '/public'));

app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var specificUserFilePool = function(ghUserId, repository_name, cb){

    client
        .get('/repos/' + ghUserId + '/' + repository_name + '/contents', function(err, results, data){

        var holdFileNames = data.map(function(entry){
            var holdAllFiles = entry.name;
              return holdAllFiles;
        })
        // console.log(holdFileNames.length);
        // gather user specifics but without the get user module(Plugin)
        var userContentObj = {
             ghUserId :  ghUserId,
             repository_name : repository_name,
             holdFileNames : holdFileNames
        };
            //make sure it's a true async call
            process.nextTick(function(){
                cb(err, userContentObj);
            })
          });

};


// list of bootcamp users github accounts
//SinethembaDlova

// the project name
//function_intro

// list of all the files the need to create for each project

// look at this: https://lodash.com/docs/4.16.2#find

/*
var_const.js
variables.js
dynamically_typed.js
type_errors.js
empty_variables.js
*/
var trackedUser = 'MsEmma';
app.get('/', function(req, res){

  specificUserFilePool('MsEmma', '53functions', function(err, userContent){
    console.log(userContent);

      res.render('usersFileDetails',{
        filesNameResult : userContent
    })
  });
});
specificUserFilePool('avermeulen', '53functions', function(err, userContent){

    // console.log( 'avermeulen : ' + files.length);
    console.log(userContent);

});

specificUserFilePool('Oyamasiphula', '53functions', function(err, userContent){
    // console.log('Oyamasiphula : ' + files.length);
});


app.get('/', function(req, res){
	res.render('home');
})
app.get('about',function(req,res){
  res.render('about');

})
// <portSetup>port delcaration
var port = process.env.port || 2001
// </portSetup>

// <serveCodeBlocksRun>Lets configure our localhost server's port
app.listen(port,function(){
console.log('app is listening on' + port);
});
// </serveCodeBlocksRun>
