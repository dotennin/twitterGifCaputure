/*global casper*/
casper.test.begin('Test Sample', 2, function(test) {
    var selectbox = '#lang-chooser';
    var lang = 'fr';

    casper.start('https://www.google.com/doodles');

    casper.then(function() {
        var params = {};
        test.comment('change the value of the select box');

        params[selectbox] = lang;
        this.fillSelectors('#language-menu',params);

        test.assertEvalEquals(
            function(selector) {
                return document.querySelector(selector).value;
            },
            lang,
            'value of the select box has been changed',
            selectbox);
    });

    casper.then(function() {
        var comment = 'is included language type in url';
        var re = new RegExp('\\?hl=(' + lang + ')');
        test.assertMatch(this.getCurrentUrl(), re, comment);
    });

    casper.then(function() {
        this.capture('google.png');
    });

    casper.run(function() {
        test.done();
    });

});