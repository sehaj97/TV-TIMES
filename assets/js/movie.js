
var movieInput = $("#movie-input");
var movieFormEl = $("#movie-form");

function getApiInfo(query) {
    window.localStorage.clear();
    var movieapi = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=ixKJxFefdUxNEpmDMBx0bG3UsH3GerGC&query=" + query;
    fetch(movieapi)
    .then(response => {
        if(response.ok){
            response.json().then(data => {
                if(data.length !== 0){
                    localStorage.setItem('movieapi', JSON.stringify(data));
                    displayData()
                }
            })
        }
    });
};

function displayData(){
    
    var responseData = JSON.parse(localStorage.getItem('movieapi'));
    $("#movie-reviews-list").html("");

    for(var i = 0; i< responseData.results.length; i++){
        if(i%5 === 0){
            var movieRow = $("<div>").addClass("row m-3 d-flex justify-content-center align-items-center");
            $("#movie-reviews-list").append(movieRow);
        }
        var movieCol= $("<div>").addClass("col-md-3 d-flex flex-column justify-content-center align-items-center bg-warning rounded p-2 m-3").css({"width":"320px", "height":"550px"});
        $(movieRow).append(movieCol);
        var movieHeading = $("<h4>").addClass("font-weight-light").text(responseData.results[i].headline);
        $(movieCol).append(movieHeading);
        var test = responseData.results[i].multimedia;
        if(test !== null){
            var movieReviewImage = $("<img>").addClass("img-thumbnail").attr("src", test.src).css({"width":"230px","height":"230px"});
            $(movieCol).append(movieReviewImage);
        }
        var movieSummary = $("<p>").text(responseData.results[i].summary_short).css({"height":"150px","width": "200px", "overflowY":"scroll"});
        $(movieCol).append(movieSummary);
        var moviebyLine = $("<p>").text("Written By: "+responseData.results[i].byline);
        $(movieCol).append(moviebyLine);
        var movieLink = $("<a>").text("Click To Learn More").attr("href", responseData.results[i].link.url);
        $(movieCol).append(movieLink);

    }

}

var formSubmitHandler = function(event) {
    
    event.preventDefault();
    event.stopPropagation();
    if(movieInput.val() != ""){
        getApiInfo(movieInput.val());
        movieInput.val("");
    }
};

movieFormEl.unbind('submit').bind('submit',  formSubmitHandler);
    
getApiInfo("new");