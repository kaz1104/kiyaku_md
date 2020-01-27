# kiyaku_mdについて
Markdownで書いた契約書・利用規約に条文番号を自動で与えたりするCSSとjavascript(jQuery)です。

契約書作成時の難敵の一人とも言える「条ずれ」を起こさないために、章・条・項を自動でふるようにしており、参照条文も自動で取得してくれるようにしています。

## ルール
- h1: 契約書名・利用規約名
- h2: 章
- h3: 条
- h3の下のp: 項
  - 第１項は項数をふらないようにしています。
- li: 号

## 参照条文の書き方
Markdown記法で```[条文の表題]()```としておくと、自動でその条文番号とIDを拾ってきて、リンクを作成します。

## 使い方
MarkdownをHTMLに変換したあとに、そのHTMLに

```<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <script src="[相対パス]/script.js"></script>```

を入れて、jquery本体とscriptを読ませるようにしてください。(CSSはjsでlinkタグを挿入するようにしています。)