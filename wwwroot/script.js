/* JP Crawford */
function apiSearch(feelingLucky = false) {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': 'foo'
        }
    })
        .done(function (data) {
            if (feelingLucky) {
                if (data.webPages && data.webPages.value && data.webPages.value.length > 0) {
                    window.location.href = data.webPages.value[0].url;
                } else {
                    $('#badLuckDialog').dialog({
                        modal: true
                    });
                }
            } else {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results);
                $('#searchResults').dialog({
                    open: function () {
                        $(this).css('visibility', 'visible');
                    }
                });
            }
        })
        .fail(function () {
            alert('error');
        });
}

/* Background Image Lists */
const images = ['antelope-canyon.jpg', 'aurora.jpg', 'canal-city.jpg', 'colosseum.jpg',
    'forest.jpg', 'grand-canyon.jpg', 'hotair-balloons.jpg', 'ice-mountain.jpg',
    'misty-peak.jpg', 'night-sky.jpg', 'river-boats.jpg', 'river-rocks.jpg',
    'rock-sculpture.jpg', 'rocky-waves.jpg', 'snow-ghost.jpg', 'spinal-tunnel.jpg',
    'sunset-hills.jpg', 'vanagon.jpg'];
let unusedImages = [...images];

/* Preload Images */
function preloadImages(imageArray) {
    imageArray.forEach((image) => {
        const img = new Image();
        img.src = `media/bkg/${image}`;
    });
}

/* Set random background that hasn't been used */
function newBackground() {
    if (unusedImages.length === 0) {
        unusedImages = [...images];
    }
    const randomIndex = Math.floor(Math.random() * unusedImages.length);
    const randomBkg = unusedImages.splice(randomIndex, 1)[0];
    return `url('media/bkg/${randomBkg}')`;
}

/* Gopilot query */
function gopilotQuery(queryVal) {
    const encodedQuery = encodeURIComponent(queryVal);
    const gopilotUrl = `https://lmgtfy.click/?q=${encodedQuery}`;
    window.location.href = gopilotUrl;
}

/* Gopilot dialog */
function gopilotAlert() {
    $('#gopilotDialog').dialog({
        modal: true,
        open: function() {
            $('#gpQuery').focus();
        }
    });
}

/* Current Time */
function currentTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}

$(document).ready(function () {
    /* Clear input text fields on reload */
    $('#query').val('');
    $('#gpQuery').val('');

    /* Preload background images and set a random one */
    preloadImages(images);
    $('#background').css('background-image', newBackground());

    /* Two new backgrounds on logo click with fade */
    $('#bingle').on('click', function() {
        $('#background').fadeOut(500, function () {
            $(this).css('background-image', newBackground()).fadeIn(500);
        });
        setTimeout(() => {
            $('#background').fadeOut(500, function () {
                $(this).css('background-image', newBackground()).fadeIn(500);
            });
        }, 1500);
    });

    /* Search query with button click */
    $('#searchButton').on('click', function() {
        apiSearch();
    });

    /* Search query with Enter*/
    $('#query').on('keypress', function(e) {
        if (e.which === 13 && $('#query').val() !== '') {
            apiSearch();
        }
    });

    /* Search query with Lucky button click */
    $('#luckyButton').on('click', function() {
        if ($('#query').val() === '') {
            apiSearch(true);
        }
    });

    /* Gopilot query with Enter */
    $('#gpQuery').on('keypress', function(e) {
        if (e.which === 13 && $('#gpQuery').val() !== '') {
            gopilotQuery($('#gpQuery').val());
        }
    });

    /* Gopilot Button Press */
    $('#gopilotButton').on('click', function () {
        const queryVal = $('#query').val();
        if (queryVal === '') {
            gopilotAlert();
            return;
        }
        gopilotQuery(queryVal);
    });

    /* Current Time Button Press */
    $('#timeButton').on('click', function() {
        $('#timeDialog').dialog({
            modal: true,
            open: function() {
                $('#timeDisplay').text(currentTime());
            }
        });
    });
});
