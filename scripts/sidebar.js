(function($) {

  $(document).ready(function() {
    $('#sidebar').bind('click', function(e) {
      if(e.target.localName === 'input') {
        $('body').trigger( "custom", [ $(e.target).prop('checked'), "Event" ] );
      }
    });


    $("body").on("loaded", function() {
      $('#loader').fadeOut(500);
    });

  });

}(jQuery));