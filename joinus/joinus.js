$(document).ready(function() {
    $('.faq').each(function(){
        var $q = $(this).find('.q');
        var $a = $(this).find('.a');

        $(this).find('.q').click(function(){
            if ($a.is(':visible')) {
                $a.slideUp();
            } else {
                $a.slideDown();
            }
        });
    });
});