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

$(document).ready(function () {

    /* Search button click event */
    $('#searchButton').on('click', function() {
        apiSearch();
    });

    /* Random background on load */
    // const images = ['antelope-canyon.jpg', 'aurora.jpg', 'canal-city.jpg', 'colosseum.jpg',
    //     'forest.jpg', 'grand-canyon.jpg', 'hotair-balloons.jpg', 'ice-mountain.jpg',
    //     'misty-peak.jpg', 'night-sky.jpg', 'river-boats.jpg', 'river-rocks.jpg',
    //     'rock-sculpture.jpg', 'rocky-waves.jpg', 'snow-ghost.jpg', 'spinal-tunnel.jpg',
    //     'sunset-hills.jpg', 'vanagon.jpg'];
    const images = ['forest.jpg', 'grand-canyon.jpg', 'hotair-balloons.jpg'];
    const randomBkg = images[Math.floor(Math.random() * images.length)];
    $('body').css('background-image', `url('media/bkg/${randomBkg}')`);
});
