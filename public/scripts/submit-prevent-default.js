$(document).ready(function() {
    $(".submit-tweet").submit(function(event){
        event.preventDefault();
        $(this).serialize();
        console.log($(this).serialize());
    });
});