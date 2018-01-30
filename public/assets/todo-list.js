$(document).ready(function(){

//On submit button click
  $('form').on('submit', function(){

    //Store input field value in todo object
      var item = $('form input');
      var todo = {item: item.val()};

//call ajax to update list
      $.ajax({
        type: 'POST',
        url: '/todo',    //handle /todo path in controller
        data: todo,      //data is to be added
        success: function(data){
          //do something with the data via front-end framework or just reload
          location.reload(); //Reload the page with updated list
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
