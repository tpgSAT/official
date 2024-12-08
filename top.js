$(document).ready(function () {
  var itemsContainer = $(".news_base"); // 対応するコンテナ要素

  // Ajaxリクエストを作成して外部ファイルを読み込む
  $.ajax({
    url: "./whatsnew/index.html", // 外部ファイルのURLを指定
    dataType: "html",
    success: function (data) {
      // 外部ファイルからコンテンツを抽出
      var $data = $(data);
      var newsTitle = $data.find(".news_title1").text();
      var newsText = $data.find(".news_txt1").text();
      // 対応する要素に挿入
      itemsContainer.find(".news_title1").text(newsTitle);
      itemsContainer.find(".news_txt1").text(newsText);

      var newsTitle = $data.find(".news_title2").text();
      var newsText = $data.find(".news_txt2").text();
      // 対応する要素に挿入
      itemsContainer.find(".news_title2").text(newsTitle);
      itemsContainer.find(".news_txt2").text(newsText);

      var newsTitle = $data.find(".news_title3").text();
      var newsText = $data.find(".news_txt3").text();
      // 対応する要素に挿入
      itemsContainer.find(".news_title3").text(newsTitle);
      itemsContainer.find(".news_txt3").text(newsText);

      var newsTitle = $data.find(".news_title4").text();
      var newsText = $data.find(".news_txt4").text();
      // 対応する要素に挿入
      itemsContainer.find(".news_title4").text(newsTitle);
      itemsContainer.find(".news_txt4").text(newsText);

      var newsTitle = $data.find(".news_title5").text();
      var newsText = $data.find(".news_txt5").text();
      // 対応する要素に挿入
      itemsContainer.find(".news_title5").text(newsTitle);
      itemsContainer.find(".news_txt5").text(newsText);
    },
  });
});
