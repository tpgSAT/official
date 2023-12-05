$(function() {
    //alert('確認');
    //全ページにヘッダー、フッターの適用
    $('#all').click(function() {
        $('.article').css('display', 'block');
    });
    $('#blog23').click(function() {
        $('.b23').css('display', 'block');
        $('.article:not(.b23)').css('display', 'none');
    });
    $('#blog22').click(function() {
        $('.b22').css('display', 'block');
        $('.article:not(.b22)').css('display', 'none');
    });
    $('.article').hover(
        function() {
            $('#cc', this).css('color', '#5CB200');
        },
        function() {
            $('#cc', this).css('color', '#181818');
        }
    );
});