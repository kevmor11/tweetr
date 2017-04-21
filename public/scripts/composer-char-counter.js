// Counts the remaining characters that the user can still type into the
// text area, for the tweet to still be valid
$(document).ready(function() {
  $('textarea').on('keyup', function() {
    var currentCount = 140 - $(this).val().length;
    var $counter = $(this).siblings('div').children('span');
    $counter.text(currentCount);
    if (currentCount < 0) {
      $counter.addClass('over');
    }
    if (currentCount > -1) {
      $counter.removeClass('over');
    }
  });
});