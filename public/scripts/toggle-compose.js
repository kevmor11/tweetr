$(function () {
    $('button').on('click', function(event){
        $('.new-tweet').slideToggle(function() {
            $('.tweet-input').focus();
        });
    });
})