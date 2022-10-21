$(document).ready(function () {
    $('.gcPop').topbox({
        effect: 'fade',
        skin: 'minimal',
        keyboardNav: true,
    });
});

$('.gcSlicker').slick({
    dots: false,
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
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

function countdown(dateEnd) {
    var timer, days, hours, minutes, seconds;

    dateEnd = new Date(dateEnd);
    dateEnd = dateEnd.getTime();

    if (isNaN(dateEnd)) {
        return;
    }

    timer = setInterval(calculate, 1000);

    function calculate() {
        var dateStart = new Date();
        var dateStart = new Date(dateStart.getUTCFullYear(),
            dateStart.getUTCMonth(),
            dateStart.getUTCDate(),
            dateStart.getUTCHours(),
            dateStart.getUTCMinutes(),
            dateStart.getUTCSeconds());
        var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

        if (timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);
            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);
            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);
            seconds = parseInt(timeRemaining);

            document.getElementById("days").innerHTML = parseInt(days, 10) + " <span class='clear'>Days</span>";
            document.getElementById("hours").innerHTML = ("0" + hours).slice(-2) + " <span class='clear'>Hours</span>";
            document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2) + "  <span class='clear'>Minutes</span>";
            document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2) + "  <span class='clear'>Seconds</span>";
        } else {
            return;
        }
    }

    function display(days, hours, minutes, seconds) { }
}



countdown('11/13/2022 00:00:00 AM');
