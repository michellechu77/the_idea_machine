$(document).ready(function() {
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
