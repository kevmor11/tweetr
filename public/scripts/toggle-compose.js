// Toggles the Compose Tweet field when the Compose button is clicked
$(function () {
    $('button').on('click', function(event) {
        $('.new-tweet').slideToggle(function() {
            $('.tweet-input').focus();
        });
    });
});
