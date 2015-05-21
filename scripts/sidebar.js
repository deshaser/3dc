(function($) {

  $(document).ready(function() {

    $('#sidebar').bind('click', function(e) {
      if(e.target.localName === 'input') {
        $('body').trigger( "custom", [ $(e.target).prop('checked'), "Event" ] );
      }
      if(e.target.localName === 'li') {
        var li = e.target;
//        console.log(e.target)
        if(li.hasClass('checkbox')) {
          if(li.hasClass('show')) {
            li.addClass('hide')
          } else {
            li.addClass('show')
          }
        } else if(li.hasClass('radio')) {

        } else {
          $('body').trigger( "custom", [ $(e.target).prop('checked'), "Event" ] );
        }
      }
    });


    $("body").on("loaded", function() {
      $('#loader').fadeOut(500);
    });

  });

}(jQuery));