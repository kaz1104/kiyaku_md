// 余分なStyleの削除
$("style").remove();
$("link").remove();

// 余分なID, Classの削除
$("h1, h2, h3").removeAttr("id");
$("body").removeClass();

//CSSの挿入
var $style = "<link rel='stylesheet' href='../style/style.min.css'>"
$("head").append($style);

// Body以下をWrap
$("body").wrapInner('<section class="tos">')

//Head addClass
$("h1").addClass("tos__title");
$("h2").addClass("section__title");
$("h3").addClass("article__title");
//$("p").addClass("regular-font");

// Head note
$("h1 + p").addClass("tos__headNote");

//Section Number automatic numbering
$("h2").each(function(i){
  i = i+1;
  $(this).attr("id","section_" + i);
  $("#section_"+i).prepend("<span class='section__num'>第"+i+"章</span>");
});

//Article Number automatic numbering
$("h3").each(function(i){
  i = i+1;
  $(this).attr("id","article_" + i);
  $("#article_"+i).prepend("<span class='article__num'>第"+i+"条</span>");

  //pにclassを振るため
  //varで代入しておかないと指定ができなかった
  var $p = "#article_"+i+" ~ p";
  //console.log($p);
  $($p).each(function(i){
    i = i+1;
    $(this).attr("class", "regular-font p_" + i);
  });

  //liにclassを振るため
  //varで代入しておかないと指定ができなかった
  var $item = "#article_"+i+" ~ ul > li";
  //console.log($item);
  $($item).each(function(i){
    i = i+1;
    $(this).attr("class", "regular-font item_" + i);
  });
});

//Sub-Article Number automatic numbering
$("p").each(function(i){
  i = i+1;
  $(".p_"+i).prepend("<span class='subArticle__num'>"+i+"</span>");
});

//Sub-Paragraph Number automatic numbering
$("li").each(function(i){
  i = i+1;
  $(".item_"+i).prepend("<span class='subParagraph__num'>("+i+")</span>");
});

// 一定のタグごとにWrapするためのコード＝＝＝＝＝＝＝＝＝＝

//h3の単位でSectionタグでWrapする。
//参考：https://qiita.com/TR246/items/9a96641328592e84bd20
// $("body").find("h2,h3").each(function(){
//     var $this = $(this); //nextUntilの中に入れるため
//     $this.nextUntil($this.prop("tagName")).addBack().wrapAll("<section class='article__wrapper'></section>");
// });

// 章ごとにWrapする
$("body").find("h2").each(function(){
    var $this = $(this); //nextUntilの中に入れるため
    $this.nextUntil($this.prop("tagName")).addBack().wrapAll("<section class='chapter__wrapper'></section>");
});

// Wrapされた章ごとの中で各条項をWrapする
$(".chapter__wrapper").find("h3").each(function(){
    var $this = $(this); //nextUntilの中に入れるため
    $this.nextUntil($this.prop("tagName")).addBack().wrapAll("<section class='article__wrapper'></section>");
});

// ＝＝＝＝＝＝＝＝＝＝

// Internal link
$("a").each(function(i){
  i = i+1;
  $(this).attr("id", "internalAnchor_"+i);
  var query = $(this).text();
  console.log(query);

  // h3の中で一致する条文を検索して、条文番号を取得
  var articleNum = $("h3:contains('"+query+"')").children("span").text();
  console.log(articleNum);

  // ページ内リンクを動的に作成するためにarticleのidを取得
  var articleId = $("h3:contains('"+query+"')").attr("id");
  console.log(articleId);

  // 参照条項名に括弧を付与(括弧がないと読みにくいため)
  // ただし、自動で内部リンクとして付与しないもの(外部リンクなど)に括弧がついてしまうと邪魔なので、ifで条件分岐。hrefが設定されていないリンクだけに括弧を付与するとしている。
  // ページ内リンク用のIDや参照条文の番号も動的に付与しているので、こちらもhrefが空になっているものだけに付与されるようにif内に設定。
  var $href = $(this).attr("href");
  if($href == ""){
    $(this).text("("+query+")");  // 参照条文のものには括弧を付与
    $(this).attr("href", "#"+articleId);  // 動的にページ内リンクを作成
    $(this).prepend("<span class='internalAnchor'>"+articleNum+"</span>");  // 参照条文の番号を動的にページ内リンクに挿入
  } else {
    $(this).attr("target", "_blank"); // target属性を付与
  }

});

// Table
  $("colgroup").remove();
  $(".article__wrapper > table").addClass("article__table");
  $(".article__table thead").addClass("article__thead");
  $(".article__table th").addClass("article__th");
  $(".article__table tbody").addClass("article__tbody");
  $(".article__table tr").addClass("article__tr");
  $(".article__table td").addClass("article__td");




// Smooth Scroll
$(function(){
  $('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    // ||はor条件、?は条件演算子でその右に'true時' : 'false時'を書くもの
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});


// Memo
// 各条項をSectionで区切っていかないとコントロールができない。
// 親子要素の関係がないため、条項ごとでハンドリングができない。
