$(document).ready(function() {

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '{797486273661785}',
    cookie     : true,// enable cookies to allow the server to access 
                        // the session
    xfbml      : true,// parse social plugins on this page
    version    : 'v2.1'// use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  $('#new_form').hide();

  if ($('.idea_machine').length > 0) {
    list = new List();
    list.drawList();

    $('#idea_mach_form input[type=submit]').hide()
    var target_time = new Date().getTime() + 180000;  //180000
    var timer_interval = setInterval(timer, 1000);

    var warning_red = setInterval(warning_red, 150000); //150000

    setTimeout(list.submitList.bind(list), 180000);

    $('#idea_mach_form').submit(function(event) {
      event.preventDefault();
      $('#idea_mach_form input[type=submit]').val("Submitting...")
      $.ajax({
        url: $('#idea_mach_form').attr("action"),
        type:'post',
        data: {ideas: list.ideas, is_public: list.is_public},
        dataType:'json'
      }).done(function(response){
        $('#idea_mach_form input[type=submit]').replaceWith("<a href='/user/"+response+"'>Go To Homepage</a>")
      });
    });

    function timer() {
      var current_time = new Date().getTime();
      var interval_in_secs = (target_time - current_time)/1000;
      var minutes = Math.floor(interval_in_secs/60);
      var seconds = Math.floor(interval_in_secs%60);

      if (minutes <= 0 && seconds <= 0) {
        clearInterval(timer_interval);
        clearInterval(warning_red);
        $('#idea_mach_form input[type=submit]').show()
      };

      timer_div = document.getElementById("timer");
      timer_div.innerHTML = minutes + " min " + seconds + " secs left"
    };

    function warning_red() {
    for (var i = 0; i < 10; i++) {
        $input = $('input[name=idea-'+(i+1)+']').css('border-color', 'red')
      };
    };
  };

  $('#new_list').click(function(event){
    event.preventDefault();
    $('h5').remove();
    $('.new_list input[name=list_title]').val("");
    $('#new_form').toggle()
  });

  $('.new_list form').submit(function(event){
    event.preventDefault();
    $('.new_list input[type=submit]').val("Submitting...")
    // $('.new_list img').css('display','inline');
    $.ajax({
      url: '/list/new',
      type: 'post',
      data: $(this).serialize()
    }).done(function(response){
      $('.new_list').append('<h5>'+response+'</h5>');
      $('.new_list img').css('display','none');
      $('#new_form').hide();
    });
      $('.new_list input[type=submit]').css('display', 'inline');
  });

});


function List() {
 this.ideas = [];
 this.is_public = true;
}

List.prototype.submitList = function () {

  var ideas = this.ideas
  for (var i = 0; i < 10; i++) {
    $input = $('input[name=idea-'+(i+1)+']').val()
    if ($input === "") {
      $input = "n/a"
    }
    ideas.push($input);
    $('input[name=idea-'+(i+1)+']').prop('disabled', true);
    $('input[name=idea-'+(i+1)+']').css('border-color', 'gray');
    $('input[name=idea-'+(i+1)+']').css('color', 'gray');

  }
  this.is_public = confirm("TIME IS UP! Do you want to make this list public? (Cancel will make private)")
}

List.prototype.drawList = function() {
 for (var i = 0; i < 10; i++) {
  $input = "<p><input placeholder='"+(i+1)+".'type='text' name='idea-" +(i+1)+ "'></input><p>"
  $('.idea_machine').append($input);
 };
};
