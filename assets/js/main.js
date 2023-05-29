
AOS.init();


$(document).ready(function () {
    $('.gcPop').topbox({
        effect: 'fade',
        skin: 'minimal',
        keyboardNav: true,
    });
});

$(".jumper").click(function () {
    $('html,body').animate({
        scrollTop: $(".wrapper").offset().top
    },
        'fast');
});

$(document).ready(function () {
    $('.lightbox-video').topbox({
        skin: 'darkroom',
        afterShowLightbox: function (lightbox) {
            const player = new Plyr('#player', {
                /* Player options */
                autoplay: true
            });
        }
    });
});

$(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('header').addClass("narrow");
            $('.scrollTop').addClass("fadeOpen");
        }

        else {
            $('header').removeClass("narrow");
            $('.scrollTop').removeClass("fadeOpen");
        }
    });
});

$('.search').click(function () {
    setTimeout(() => {
        $('.searchBox').removeClass('d-none');
    }, 1);

    setTimeout(() => {
        $('.searchBox').addClass('lw');
    }, 50);
});

$('.logMe').click(function () {
    setTimeout(() => {
        $('.loginForm').removeClass('d-none');
    }, 1);

    setTimeout(() => {
        $('.loginForm').addClass('tw');
    }, 50);
});

$('main').click(function () {
    setTimeout(() => {
        $('.searchBox').addClass('d-none');
        $('.loginForm').addClass('d-none');
    }, 200);

    setTimeout(() => {
        $('.searchBox').removeClass('lw');
        $('.loginForm').removeClass('tw');
    }, 1);
});

$('.mainSlider .contents').slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.mainSlider .imgs',
});

$('.miniGallery').slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

$('.fullGallery').slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
});

$('.mainSlider .imgs').slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.mainSlider .contents',
});

$('.whatsNow .contents').slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    adaptiveHeight: true,
    prevArrow: $('.whatsNow .swipeLeft'),
    nextArrow: $('.whatsNow .swipeRight')
});

const currentYear = new Date().getFullYear();
const year = document.getElementById('year');
year.innerHTML = currentYear;

/* Load More */
(function ($) {
    $.fn.simpleLoadMore = function (options) {
        var settings = $.extend({
            count: 5,
            itemsToLoad: 5,
            btnHTML: '',
            btnText: 'View More',
            item: '',
            cssClass: 'load-more',
            showCounter: false,
            counterText: 'Showing {showing} out of {total}'
        }, options);


        var $loadMore = $(this);


        $loadMore.each(function (i, el) {


            var btnHTML = settings.btnHTML,
                btnText = settings.btnText,
                count = settings.count,
                itemsToLoad = settings.itemsToLoad,
                item = settings.item,
                cssClass = settings.cssClass,
                showCounter = settings.showCounter,
                counterText = settings.counterText;


            var $thisLoadMore = $(this),
                $items = $thisLoadMore.find(item),
                $btnHTML,
                $counterHTML = $('<p class="slm__counter">' + counterText + '</p>');


            if (showCounter) {
                $thisLoadMore.append($counterHTML);
            }

            if (!btnHTML) btnHTML = '<a href="#" class="' + cssClass + '__btn">' + btnText + '</a>';

            $btnHTML = $(btnHTML);

            if (!options.itemsToLoad || isNaN(options.itemsToLoad)) {
                settings.itemsToLoad = settings.count;
            }

            $thisLoadMore.addClass(cssClass);
            $items.addClass(cssClass + '__item');

            if (!$thisLoadMore.find('.' + cssClass + '__btn').length && $items.length > settings.count) {
                $thisLoadMore.append($btnHTML);
            }

            $btnHTML.add($counterHTML).html(function (i, oldHtml) {
                var newHtml = oldHtml.replace('{showing}', '<span class="slm__count slm__count--showing">' + count + '</span>');
                newHtml = newHtml.replace('{total}', '<span class="slm__count slm__count--total">' + $items.length + '</span>');

                return newHtml
            })

            var $btn = $thisLoadMore.find('.' + cssClass + '__btn');

            if (!$btn.length) {
                $btn = $btnHTML;
            }

            if ($items.length > settings.count) {
                $items.slice(settings.count).hide();
            }

            $btn.on('click', function (e) {
                e.preventDefault();

                var $this = $(this);
                var $hiddenItems = $items.filter(':hidden');
                var $updatedItems = $hiddenItems;

                if (settings.itemsToLoad !== -1 && settings.itemsToLoad > 0) {
                    $updatedItems = $hiddenItems.slice(0, settings.itemsToLoad);
                }

                if ($updatedItems.length > 0) {
                    $updatedItems.fadeIn();
                }

                $thisLoadMore.find('.slm__count--showing').text($items.filter(':visible').length);

                if ($hiddenItems.length <= settings.itemsToLoad || settings.itemsToLoad === -1) {
                    $this.remove();
                }
            });
        });
    }
}(jQuery));
/* Load More End*/

/* Alphabetical Filter */
(function ($) {
    $.fn.listnav = function (options) {
        var opts = $.extend({}, $.fn.listnav.defaults, options),
            firstClick = false,
            clickEventType = '';

        if (document.ontouchstart !== null) {
            clickEventType = 'click';
        } else {

            clickEventType = 'touchend click';
        }

        opts.prefixes = $.map(opts.prefixes, function (n) {
            return n.toLowerCase();
        });

        return this.each(function () {
            var $wrapper, $letters, $letterCount, left, width, count,
                id = this.id,
                $list = $(this),
                counts = {},
                allCount = 0, fullCount = 0,
                isAll = true,
                prevLetter = '';

            if (!$('#' + id + '-nav').length) {
                $('<div id="' + id + '-nav" class="listNav"/>').insertBefore($list);
                // Insert the nav if its not been inserted already (preferred method)
                // Legacy method was to add the nav yourself in HTML, I didn't like that requirement
            }

            $wrapper = $('#' + id + '-nav');
            // <ul id="myList"> for list and <div id="myList-nav"> for nav wrapper

            function init() {
                $wrapper.append(createLettersHtml());

                $letters = $('.ln-letters', $wrapper).slice(0, 1);

                if (opts.showCounts) {
                    $letterCount = $('.ln-letter-count', $wrapper).slice(0, 1);
                }

                addClasses();

                addNoMatchLI();

                bindHandlers();

                if (opts.flagDisabled) {
                    addDisabledClass();
                }

                // remove nav items we don't need

                if (!opts.includeAll) {
                    $('.all', $letters).remove();
                }

                if (!opts.includeNums) {
                    $('._', $letters).remove();
                }

                if (!opts.includeOther) {
                    $('.-', $letters).remove();
                }

                if (opts.removeDisabled) {
                    $('.ln-disabled', $letters).remove();
                }

                $(':last', $letters).addClass('ln-last');

                if ($.cookie && (opts.cookieName !== null)) {
                    var cookieLetter = $.cookie(opts.cookieName);

                    if (cookieLetter !== null && typeof cookieLetter !== "undefined") {
                        opts.initLetter = cookieLetter;
                    }
                }

                // decide what to show first
                // Is there an initLetter set, if so, show that letter first
                if (opts.initLetter !== '') {
                    firstClick = true;

                    // click the initLetter if there was one
                    $('.' + opts.initLetter.toLowerCase(), $letters).slice(0, 1).trigger('click');
                } else {
                    // If you want to Hide all options until a user clicks
                    if (opts.initHidden) {

                        addInitHiddenLI();

                        $list.children().addClass("listNavHide");

                        $list.children('.ln-init-hidden').removeClass('listNavHide');
                    }
                    // If no init letter is set, and you included All, then show it
                    else if (opts.includeAll) {
                        // make the All link look clicked, but don't actually click it
                        $('.all', $letters).addClass('ln-selected');
                    } else {
                        // All was not included, lets find the first letter with a count and show it
                        for (var i = ((opts.includeNums) ? 0 : 1); i < opts.letters.length; i++) {
                            if (counts[opts.letters[i]] > 0) {
                                firstClick = true;

                                $('.' + opts.letters[i], $letters).slice(0, 1).trigger('click');

                                break;
                            }
                        }
                    }
                }
            }

            // position the letter count above the letter links
            function setLetterCountTop() {
                // we're going to need to subtract this from the top value of the wrapper to accomodate changes in font-size in CSS.
                var letterCountHeight = $letterCount.outerHeight();

                $letterCount.css({
                    top: $('a:first', $wrapper).slice(0, 1).position().top - letterCountHeight
                    // we're going to grab the first anchor in the list
                    // We can no longer guarantee that a specific letter will be present
                    // since adding the "removeDisabled" option

                });

            }

            // adds a class to each LI that has text content inside of it (ie, inside an <a>, a <div>, nested DOM nodes, etc)
            function addClasses() {
                var str, spl, $this,
                    firstChar = '',
                    hasPrefixes = (opts.prefixes.length > 0),
                    hasFilterSelector = (opts.filterSelector.length > 0);

                // Iterate over the list and set a class on each one and use that to filter by
                $($list).children().each(function () {
                    $this = $(this);

                    // I'm assuming you didn't choose a filterSelector, hopefully saving some cycles
                    if (!hasFilterSelector) {
                        //Grab the first text content of the LI, we'll use this to filter by
                        str = $.trim($this.text()).toLowerCase();
                    } else {
                        // You set a filterSelector so lets find it and use that to search by instead
                        str = $.trim($this.find(opts.filterSelector).text()).toLowerCase();
                    }

                    // This will run only if there is something to filter by, skipping over images and non-filterable content.
                    if (str !== '') {
                        // Apply the non-prefix class to LIs that have prefixed content in them
                        if (hasPrefixes) {
                            var prefixes = $.map(opts.prefixes, function (value) {
                                return value.indexOf(' ') <= 0 ? value + ' ' : value;
                            });
                            var matches = $.grep(prefixes, function (value) {
                                return str.indexOf(value) === 0;
                            });
                            if (matches.length > 0) {
                                var afterMatch = str.toLowerCase().split(matches[0])[1];

                                if (afterMatch !== null) {
                                    firstChar = $.trim(afterMatch).charAt(0);
                                } else {
                                    firstChar = str.charAt(0);
                                }
                                addLetterClass(firstChar, $this, true);
                                return;
                            }
                        }
                        // Find the first letter in the LI, including prefixes
                        firstChar = str.charAt(0);

                        // Doesn't send true to function, which will ++ the All count on prefixed items
                        addLetterClass(firstChar, $this);
                    }
                });
            }

            // Add the appropriate letter class to the current element
            function addLetterClass(firstChar, $el, isPrefix) {
                // Changed /W/ to /wW/ to allow for non-engligh characters
                if (/\wW/.test(firstChar)) {
                    firstChar = '-'; // not A-Z, a-z or 0-9, so considered "other"
                }

                if (!isNaN(firstChar)) {
                    firstChar = '_'; // use '_' if the first char is a number
                }

                $el.addClass('ln-' + firstChar);

                if (counts[firstChar] === undefined) {
                    counts[firstChar] = 0;
                }

                counts[firstChar]++;

                if (!isPrefix) {
                    allCount++;
                }
            }

            function addDisabledClass() {
                for (var i = 0; i < opts.letters.length; i++) {
                    if (counts[opts.letters[i]] === undefined) {
                        $('.' + opts.letters[i], $letters).addClass('ln-disabled');
                    }
                }
            }

            function addNoMatchLI() {
                $list.append('<li class="ln-no-match listNavHide">' + opts.noMatchText + '</li>');
            }

            function addInitHiddenLI() {
                $list.append('<li class="ln-init-hidden listNavHide">' + opts.initHiddenText + '</li>');
            }

            function getLetterCount(el) {
                if ($(el).hasClass('all')) {
                    if (opts.dontCount) {
                        fullCount = allCount - $list.find(opts.dontCount).length;
                    } else {
                        fullCount = allCount;
                    }

                    return fullCount;
                } else {
                    el = '.ln-' + $(el).attr('class').split(' ')[0];

                    if (opts.dontCount) {
                        count = $list.find(el).not(opts.dontCount).length;
                    } else {
                        count = $list.find(el).length;
                    }

                    return (count !== undefined) ? count : 0; // some letters may not have a count in the hash
                }
            }

            function bindHandlers() {
                if (opts.showCounts) {
                    // sets the top position of the count div in case something above it on the page has resized
                    $wrapper.mouseover(function () {
                        setLetterCountTop();
                    });

                    //shows the count above the letter
                    //
                    $('.ln-letters a', $wrapper).mouseover(function () {
                        left = $(this).position().left;
                        width = ($(this).outerWidth()) + 'px';
                        count = getLetterCount(this);

                        $letterCount.css({
                            left: left,
                            width: width
                        }).text(count).addClass("letterCountShow").removeClass("listNavHide"); // set left position and width of letter count, set count text and show it
                    }).mouseout(function () { // mouseout for each letter: hide the count
                        $letterCount.addClass("listNavHide").removeClass("letterCountShow");
                    });
                }

                // click handler for letters: shows/hides relevant LI's
                //
                $('a', $letters).on(clickEventType, function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        letter = $this.attr('class').split(' ')[0],
                        noMatches = $list.children('.ln-no-match');

                    if (opts.initHidden) {
                        $list.children('.ln-init-hidden').remove();
                    }

                    if (prevLetter !== letter) {
                        // Only to run this once for each click, won't double up if they clicked the same letter
                        // Won't hinder firstRun
                        $('a.ln-selected', $letters).removeClass('ln-selected');

                        if (letter === 'all') {
                            // If ALL button is clicked:
                            $list.children().addClass("listNavShow").removeClass("listNavHide"); // Show ALL

                            noMatches.addClass("listNavHide").removeClass("listNavShow"); // Hide the list item for no matches

                            isAll = true; // set this to quickly check later
                        } else {
                            // If you didn't click ALL
                            if (isAll) {
                                // since you clicked ALL last time:
                                $list.children().addClass("listNavHide").removeClass("listNavShow");

                                isAll = false;
                            } else if (prevLetter !== '') {
                                $list.children('.ln-' + prevLetter).addClass("listNavHide").removeClass("listNavShow");
                            }

                            var count = getLetterCount(this);

                            if (count > 0) {
                                $list.children('.ln-' + letter).addClass("listNavShow").removeClass("listNavHide");
                                noMatches.addClass("listNavHide").removeClass("listNavShow"); // in case it's showing
                            } else {
                                noMatches.addClass("listNavShow").removeClass("listNavHide");
                            }
                        }

                        prevLetter = letter;

                        if ($.cookie && (opts.cookieName !== null)) {
                            $.cookie(opts.cookieName, letter, {
                                expires: 999
                            });
                        }

                        $this.addClass('ln-selected');

                        $this.blur();

                        if (!firstClick && (opts.onClick !== null)) {
                            opts.onClick(letter);
                        } else {
                            firstClick = false; //return false;
                        }
                    } // end if prevLetter !== letter
                }); // end click()
            } // end BindHandlers()

            // creates the HTML for the letter links
            //
            function createLettersHtml() {
                var html = [];
                for (var i = 1; i < opts.letters.length; i++) {
                    if (html.length === 0) {
                        html.push('<a class="all" href="#">' + opts.allText + '</a><a class="_" href="#">0-9</a>');
                    }
                    html.push('<a class="' + opts.letters[i] + '" href="#">' + ((opts.letters[i] === '-') ? '...' : opts.letters[i].toUpperCase()) + '</a>');
                }
                return '<div class="ln-letters">' + html.join('') + '</div>' + ((opts.showCounts) ? '<div class="ln-letter-count listNavHide">0</div>' : '');
                // Remove inline styles, replace with css class
                // Element will be repositioned when made visible
            }
            init();
        });
    };

    $.fn.listnav.defaults = {
        allText: 'All',
        cookieName: null,
        dontCount: '',
        filterSelector: '',
        flagDisabled: true,
        includeAll: true,
        includeNums: true,
        includeOther: false,
        initHidden: false,
        initHiddenText: 'Tap a letter above to view matching items',
        initLetter: '',
        letters: ['_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'],
        noMatchText: 'No matching entries',
        onClick: null,
        prefixes: [],
        removeDisabled: false,
        showCounts: true,
    };
})(jQuery);
/* Alphabetical Filter End */

$('.allNews').simpleLoadMore({
    item: '.col-xl-4',
    count: 3,
    itemsToLoad: 3,
    btnHTML: "<a class='load-more col-xl-6 mx-auto btn-primary text-center'><i class='fa-solid fa-rotate-right me-2'></i>Load More Content {showing}/{total}</a>"
});

$('.alphabeticalFilter').listnav({
    includeNums: false,
    showCounts: false,
    initHidden: false,
    flagDisabled: true,
    removeDisabled: false,
});

$('.miniPreview').slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    infinite: false,
    slidesToScroll: 1,
    asNavFor: ".slickProd .inImg",
    vertical: true,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 1199,
            settings: {
                vertical: false,
                slidesToShow: 3,
            }
        }
    ]
});

$('.slickProd .inImg').slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".miniPreview",
});

$('.slickProd .inImg .zoom').zoom({
    touch: false,
});

$(window).on('load', function () {
    var $container = $('.portfolioContainer');
    var $filter = $('#filter');
    $container.isotope({
        filter: '*',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear'
        }
    });
    $filter.find('a').click(function () {
        var selector = $(this).attr('data-filter');
        $filter.find('a').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: selector,
            animationOptions: {
                animationDuration: 750,
                easing: 'linear',
                queue: false,
            }
        });
        return false;
    });
});

var scriptUrl = 'https:\/\/www.youtube.com\/s\/player\/34f9b71c\/www-widgetapi.vflset\/www-widgetapi.js'; window['yt_embedsEnableIframeSrcWithIntent'] = true; try { var ttPolicy = window.trustedTypes.createPolicy("youtube-widget-api", { createScriptURL: function (x) { return x } }); scriptUrl = ttPolicy.createScriptURL(scriptUrl) } catch (e) { } var YT; if (!window["YT"]) YT = { loading: 0, loaded: 0 }; var YTConfig; if (!window["YTConfig"]) YTConfig = { "host": "https://www.youtube.com" };
if (!YT.loading) {
    YT.loading = 1; (function () {
        var l = []; YT.ready = function (f) { if (YT.loaded) f(); else l.push(f) }; window.onYTReady = function () { YT.loaded = 1; for (var i = 0; i < l.length; i++)try { l[i]() } catch (e$0) { } }; YT.setConfig = function (c) { for (var k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k] }; var a = document.createElement("script"); a.type = "text/javascript"; a.id = "www-widgetapi-script"; a.src = scriptUrl; a.async = true; var c = document.currentScript; if (c) { var n = c.nonce || c.getAttribute("nonce"); if (n) a.setAttribute("nonce", n) } var b =
            document.getElementsByTagName("script")[0]; b.parentNode.insertBefore(a, b)
    })()
};

var player;
var iframe = document.querySelectorAll('.player')
var mainSlider = document.querySelectorAll('.mainSlider .mainPlayer')

function onYouTubePlayerAPIReady() {

    iframe.forEach(element => {
        const playerProperties = {
            dataId: element.getAttribute('data-identity'),
            dataHeight: element.getAttribute('data-height'),
            dataWidth: element.getAttribute('data-width'),
            dataMute: element.getAttribute('data-mute'),
            dataControls: element.getAttribute('data-controls'),
            dataAutoplay: element.getAttribute('data-autoplay'),
            dataLoop: element.getAttribute('data-loop'),
            dataInline: element.getAttribute('data-inline'),
            dataPlaylist: element.getAttribute('data-playlist'),
            dataModestBranding: element.getAttribute('data-modest'),
            dataRel: element.getAttribute('data-rel'),
            dataFs: element.getAttribute('data-fs'),
        }

        player = new YT.Player(element, {
            height: Object.values(playerProperties)[1],
            width: Object.values(playerProperties)[2],
            videoId: Object.values(playerProperties)[0],
            playerVars: {
                mute: Object.values(playerProperties)[3],
                controls: Object.values(playerProperties)[4],
                autoplay: Object.values(playerProperties)[5],
                loop: Object.values(playerProperties)[6],
                playsinline: Object.values(playerProperties)[7],
                playlist: Object.values(playerProperties)[8],
                modestbranding: Object.values(playerProperties)[9],
                rel: Object.values(playerProperties)[10],
                fs: Object.values(playerProperties)[11],
            },
        }
        );
    });

    mainSlider.forEach(element => {
        const playerProperties = {
            dataId: element.getAttribute('data-identity'),
            dataHeight: element.getAttribute('data-height'),
            dataWidth: element.getAttribute('data-width'),
            dataMute: element.getAttribute('data-mute'),
            dataControls: element.getAttribute('data-controls'),
            dataAutoplay: element.getAttribute('data-autoplay'),
            dataLoop: element.getAttribute('data-loop'),
            dataInline: element.getAttribute('data-inline'),
            dataPlaylist: element.getAttribute('data-playlist'),
            dataModestBranding: element.getAttribute('data-modest'),
            dataRel: element.getAttribute('data-rel'),
            dataFs: element.getAttribute('data-fs'),
        }

        player = new YT.Player(element, {
            height: Object.values(playerProperties)[1],
            width: Object.values(playerProperties)[2],
            videoId: Object.values(playerProperties)[0],
            playerVars: {
                mute: Object.values(playerProperties)[3],
                controls: Object.values(playerProperties)[4],
                autoplay: Object.values(playerProperties)[5],
                loop: Object.values(playerProperties)[6],
                playsinline: Object.values(playerProperties)[7],
                playlist: Object.values(playerProperties)[8],
                modestbranding: Object.values(playerProperties)[9],
                rel: Object.values(playerProperties)[10],
                fs: Object.values(playerProperties)[11],
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            },
        }
        );
    });

    function onPlayerReady(event) {
        event.target.playVideo();
    }
    
    let done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
}
