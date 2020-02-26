var len;
var results = '';
// imgClick used to control the image-switching
var imgClick = 0;
var lucky = false;
var luckyLink = "";


// This is to satisfy the requirement in the Readme for us to build a function that calls the apiSearch() function
function uselessFunction(luckySearch) {
    lucky = luckySearch;
    apiSearch()
}

function apiSearch() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
            url: 'https://rhunstad-bingapi.cognitiveservices.azure.com/bing/v7.0/search?' + $.param(params),
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "0972713d94414db9af467429ada2960a");
            },
            type: "GET",
        })
        .done(function (data) {
            len = data.webPages.value.length;
            results = "";
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
                //The snippet below allows the "Lucky search" feature:
                if (i == 0) {
                    luckyLink = data.webPages.value[i].url;
                    if (lucky == true) {
                        window.open(luckyLink);
                    }
                }

            }

            $('#searchResults').html(results);
            $('#searchResults').dialog({
                width: 500,
                class: 'uiDiv',
                "title": "Hunt - Search Results"
            });
        
        
        })
        .fail(function () {
            alert("error");
        });
    
}

// Uses modular arithmetic to change the background image
function changeBackground() {
    var backgroundImg = $('bodyContent').css('background-image');

    if ((imgClick % 2) == 0) {
        document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1494449428055-e4b0b6f4d978?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80")';
    } else {
        document.body.style.backgroundImage = 'url("https://images.unsplash.com/photo-1565966800331-7e63b302e507?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80")';
    }
    imgClick++;
}

// automatically calls the function every 5 seconds to change the image
function autoBackground() {
    changeBackground()
    setTimeout(autoBackground, 5000);
}

autoBackground();

// Shows the time, and makes sure its in American (non-military) format with a pm/am indicator: 
function showTime() {
    var today = new Date();
    var hours = today.getHours()
    var mins = today.getMinutes()
    timeofday = "am";
    if (hours > 12){
        hours = hours - 12
        timeofday = "pm"
    }
    if (mins < 10){
        mins = "0" + mins.toString() 
    } 
    var time = hours + ":" + mins + timeofday
    document.getElementById("time").innerHTML = time

    $("#time").dialog({
        "body": document.getElementById("time").innerHTML, 
        "title": "What's the time?",
        "show": true
        
    });
}


