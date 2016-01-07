$(document).ready(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    });

    $("a[data-attr-scroll]").click(function(e) {
        e.preventDefault();

        var defaultAnchorOffset = 0;

        var anchor = $(this).attr('data-attr-scroll');

        var anchorOffset = $('#' + anchor).attr('data-scroll-offset');
        if (!anchorOffset)
            anchorOffset = defaultAnchorOffset;

        $('html,body').animate({
            scrollTop: $('#' + anchor).offset().top - anchorOffset
        }, 800);
    });
});
