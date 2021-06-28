$('.js-img-shake').hide();

$('.js-start').on('click', function () {
    var options = $('.js-textarea').val().split('\n');
    var rand = Math.floor(Math.random()*options.length);

    $('.js-img-shake').show();
    $('.js-img-ok').hide();
    $('.js-result').text('等待開將結果...');
    setTimeout(function() {
        $('.js-img-shake').hide();
        $('.js-img-ok').show();
        $('.js-result').text('開獎結果：' + options[rand]);
    }, 3000);
});