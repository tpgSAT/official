$(function () {
  //manage all together(header, footer)
  $("header").load("../_header/header.html");
  $("footer").load("../_footer/footer.html");
  $("#top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  $("header").click(function () {
    $(".menu_haikei").slideToggle();
    $("#hamburger_btn").toggleClass("btn_hyouji btn_hihyouji");
    $("#close_btn").toggleClass("btn_hyouji btn_hihyouji");
  });

  //for April Fool ver.
  // window.onload = function() {
  //     var now = new Date();
  //     var start = new Date('2023/2/28 9:00:00'); // 表示開始日時（時間は24h表記）
  //     var end = new Date('2023/2/28 17:59:59'); // 表示終了日時（時間は24h表記）

  //     if ( start <  now && now < end ) {
  //         $('#tamago').html('Tamago<br>Kake<br>Gohan');
  //     } else {
  //         $('#tamago').html('Taki<br>Plaza<br>Gardener');
  //     }
  // }
});
