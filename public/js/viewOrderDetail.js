//取得cookie的方法  固定在上面
function getCookie(name) {
  var arg = escape(name) + "=";
  var nameLen = arg.length;
  var cookieLen = document.cookie.length;
  //console.log(cookieLen);
  var i = 0;
  while (i < cookieLen) {
    var j = i + nameLen;
    if (document.cookie.substring(i, j) == arg) return getCookieValueByIndex(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

function getCookieValueByIndex(startIndex) {
  var endIndex = document.cookie.indexOf(";", startIndex);
  if (endIndex == -1) endIndex = document.cookie.length;
  return unescape(document.cookie.substring(startIndex, endIndex));
}

window.addEventListener( "load", start, false );

function start(){
  $token = getCookie("token");
  console.log($token);
  $.ajax({
    url:"../php/navSigninCheck.php",  //呼叫的位址
    type:"GET",      //請求方式
    data:{"token": $token},//傳送到server的資料
    dataType:'json', //預期server回傳的形式
    success: function(reData){     //成功的時候跑的函式
      console.log("Account Show Data");
      console.log(reData);
      var account = reData[0][0];
     $("#user").html("<span class='glyphicon glyphicon-user'></span> &nbsp "+account+"&nbsp <i class='fa fa-caret-down'></i>");
	 $("#navRight").html("Hi !  "+account);
	 $("#navPoint").attr("href", "http://127.0.0.1:3000/SQL/" +account);
    },
    error: function(jqXHR, textStatus, errorThrown){    //失敗的時候跑的函式
      console.log( errorThrown);
    }
  });

}

function logout(){
	var now = new Date();
	now.setTime(now.getTime()-1000*600);
	document.cookie = "token=null;expires="+now.toGMTString()+";path=/wtlab108;domain=127.0.0.1";
  //document.cookie = "token=null;expires="+now.toGMTString()+";path=/wtlab108;domain=140.127.74.168";
  unset($_SESSION['token']);
  window.location = "http://140.127.74.145/mslogin/public/login";
  session_destroy();
}

// Accordion
function myAccFunc(demoAcc) {
	var demoAccID = (demoAcc.value);
	
	if($("#demoAcc"+demoAccID).attr('class').indexOf("w3-show") == -1){
		$("#demoAcc"+demoAccID).addClass("w3-show");
	} else {
		$("#demoAcc"+demoAccID).removeClass("w3-show");
	}
}
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
