import {LoginApi} from './restarauntsearch.js'
import {AllRestaraunts} from './restarauntsearch.js'
import $ from 'jquery'
$(document).ready(function(){
  $("#loginForm").submit(function(event){
    event.preventDefault();
    console.log("ok")
    Login();
  })
  $("#restaraunts").click(function(event)
  {
      console.log("ok this click worked");
      event.preventDefault();
      GetRestaraunts();
  })
})
var jsonToken = null;
function Login(){
    const username = $("#username").val()
    const password = $("#password").val();
    console.log(username);
    console.log(password);
    
    callRestApi(username, password).then(loginSuccess, loginFailure);
  }
  function callRestApi(username,password){
    var apicall = new LoginApi();
    let promise = apicall.apilogin(username, password)
    return promise;
  }

  function loginSuccess(response){
    console.log("success");
    
    const user = JSON.parse(response);
    jsonToken = user.token;
    console.log(user.token);
    $("body").append("<li>" + user.token + "</li>")
  }
function loginFailure(response){
    alert(response);
}
function GetRestaraunts()
{
    callGetRestaraunts(jsonToken).then(gotRestarauntSuccess, gotRestarauntFailed);
}
function callGetRestaraunts(jsonToken)
{
    var apicall = new AllRestaraunts();
    let promise = apicall.getrestaraunts(jsonToken);
    return promise;
}
function gotRestarauntSuccess(response)
{
    const restaraunts = JSON.parse(response);
    console.log(restaraunts[0]);
    $("body").append("<li>" + restaraunts[0].name + "</li>")
    console.log("success");
}
function gotRestarauntFailed(response){
    console.log("failed");
    alert(response);
}


console.log("this is the json token" + jsonToken);