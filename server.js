var casper = require('casper').create();
var utils = require("utils");
var links = null;

casper.start();

/* UserAgentをChromeのブラウザに設定 */
casper.userAgent('Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');

/* NIJIBOXでGoogle検索 */
casper.thenOpen("https://lab.syncer.jp/Tool/Twitter-Video-URL-Converter/", function(){
    this.sendKeys('input[id=ct1]', 'https://twitter.com/twitter/statuses/998825855886544896');
    this.click('button[id=ct2]');
    // this.capture('./piyo.png');
});
casper.waitForSelector('#ct3 >dl >dd', function () {
    // dl exists
    this.capture('./piyo.png');
    this.echo('selectore exists!');
    links = this.evaluate(function(){
        var ct3 = document.querySelector('#ct3 > dl > dd');
        return ct3.tagName;
        var q = document.querySelectorAll('tr > th'); //データが入っているタグを抽出
        return Array.prototype.map.call(q, function(e){
            return '[' + e.textContent + '](' + e.href + ')'; //ページ名とリンクだけを抜き出す
        });
    });
}, function() {
    this.echo('.selector is no more!');
});

/* 引数に関数を渡すと完了後の処理が書ける */
casper.run(function(){
    for(var index in links) {
        this.echo(links[index]); //取得したページ名とリンクを表示
    }
    this.exit();
});