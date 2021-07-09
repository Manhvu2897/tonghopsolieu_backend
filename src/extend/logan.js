// JavaScript Cookies

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


// display
var $j = jQuery.noConflict();
 function  login() {
    $j.ajax({
        url: '/login',
        type: 'POST',
        data: {
            username: $('#username').val(),
            password: $('#password').val()
        }
    })
    .then(data =>{
        setCookie('token', data.token, 1)
        if(data.token){
          return  window.location.href = "/home"
        }else{
          alert(' password or username')
        }
    })
    .catch(error =>{
        console.log(error);
    })
}