$(document).ready(function() {
    $('.poster').click(function(){
        $('.poster').css('padding-top','1.2rem');
        $('.movie').css('padding-top','1rem');
        $('.main1').css('display', 'block');
        $('.main2').css('display', 'none');
    });
    $('.movie').click(function(){
        $('.poster').css('padding-top','1rem');
        $('.movie').css('padding-top','1.2rem');
        $('.main1').css('display', 'none');
        $('.main2').css('display', 'block');
    });
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