/* JP Crawford */
function apiSearch() {
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

/* Set random background that hasn't been used */
function newBackground() {
    if (unusedImages.length === 0) {
        unusedImages = [...images];
    }
    const randomIndex = Math.floor(Math.random() * unusedImages.length);
    const randomBkg = unusedImages.splice(randomIndex, 1)[0];
    $('body').css('background-image', `url('media/bkg/${randomBkg}')`);
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

$(document).ready(function () {
    /* Random background on load */
    newBackground();

    /* New background on logo click */
    $('#bingle').on('click', function() {
        newBackground();
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
});
