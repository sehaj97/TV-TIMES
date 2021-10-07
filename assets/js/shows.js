
var showsList = $("#show-lists");
var apiData = "";
var showsRow = "";
var showsCol = "";
var showsCardContainer = "";
var cardImg = "";
var cardHeading = "";
var cardType = "";
var cardRatings = "";
var learnMore = "";
var replaceValue = "";
var showInput = $("#show-input");
var showFormEl = $("#show-form");
var showNameParam = "";
var showStatus = "";
var errorModal = new bootstrap.Modal(document.getElementById('showModal'), {
    keyboard: false
});
var infoModal = new bootstrap.Modal(document.getElementById('infoModal'), {
    keyboard: false
});
function getApiInfo(showName) {
    window.localStorage.clear();
    var showAPI = "https://api.tvmaze.com/search/shows?q=" + showName;
    fetch(showAPI)
	.then(response => {
        if(response.ok){
            response.json().then(data => {
                if(data.length !== 0){
                    localStorage.setItem('searched-shows', JSON.stringify(data));
                     displayCards();
                } else {
                    errorModal.toggle();
                    $("#error-msg").text("Nothing Found! Try Searching with valid show names");
                    $("main").removeClass('animated lightSpeedInLeft');
                }
            })
        } else {
            errorModal.toggle();
            $("#error-msg").text("Something is wrong. Try again later");
            $("main").removeClass('animated lightSpeedInLeft');
        }
    });
};

function displayCards(){
    apiData = JSON.parse(localStorage.getItem('searched-shows'));
    showsList.html("");
    for(var i=0; i<apiData.length; i++){
        if(i%5 === 0){
            showsRow = $("<div>").addClass("row d-flex justify-content-center align-items-center show-row-"+i);
            showsList.append(showsRow);
        }
        showsCol = $("<div>").addClass("col d-flex justify-content-center align-items-center show-col-"+i);
        $(showsRow).append(showsCol);
        showsCardContainer = $("<div>").addClass("card m-3 text-center").attr("style", "width:16rem");
        $(showsCol).append(showsCardContainer);
        replaceValue = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
        if(apiData[i].show.image !== null){
            replaceValue = apiData[i].show.image.medium;
        }
        cardImg = $("<img>").attr("src", replaceValue).addClass("card-img-top");
        cardHeading = $("<h4>").append(apiData[i].show.name);
        cardType = $("<p>").append(apiData[i].show.type + " | " + apiData[i].show.language).addClass("m-0");
        replaceValue = apiData[i].show.rating.average;
        if(apiData[i].show.rating.average == null){
            replaceValue = "No"
        }
        cardRatings = $("<p>").append(replaceValue + " Ratings").addClass("bg-info rounded mx-auto mb-0 text-center w-75");
        replaceValue = "Unknown";
        if(apiData[i].show.status !== null){
            replaceValue = apiData[i].show.status;
        }
        showStatus = $("<p>").append("Show Status: " + replaceValue);
        learnMore = $("<button>").addClass("btn btn-dark btn-more-"+i).append("Click me Learn More!");
        $(showsCardContainer).append(cardImg);
        $(showsCardContainer).append(cardHeading);
        $(showsCardContainer).append(cardType);
        $(showsCardContainer).append(cardRatings);
        $(showsCardContainer).append(showStatus);
        $(showsCardContainer).append(learnMore); 
        $('body').on('click', ".btn-more-" + i, function() {
            $("main").removeClass('animated lightSpeedInLeft');
            displayShowDetails(this);
            infoModal.toggle();
        });
    }
    
    $(".card-img-top").hover(function(){
        $(this).toggleClass('animated flip');
    });
} 

function displayShowDetails(element){
    $("#show-title").html("");
    $("#show-details").html("");
    var id = $(element).attr("class").replace("btn btn-dark btn-more-", "");
    apiData = JSON.parse(localStorage.getItem('searched-shows'));
    $("#show-title").append(apiData[id].show.name).addClass("text-center");
    showsCardContainer = $("<div>").addClass("card text-center w-100 d-flex justify-content-center align-items-center");
    $("#show-details").append(showsCardContainer);
    replaceValue = "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
    if(apiData[id].show.image !== null){
        replaceValue = apiData[id].show.image.medium;
    }
    cardImg = $("<img>").attr("src", replaceValue).addClass("card-img-top img-thumbnail w-50");
    cardType = $("<p>").append(apiData[id].show.type + " | " + apiData[id].show.language).addClass("m-0");
    replaceValue = apiData[id].show.rating.average;
    if(apiData[id].show.rating.average == null){
        replaceValue = "No"
    }
    cardRatings = $("<p>").append(replaceValue + " Ratings").addClass("bg-info rounded mx-auto mb-0 text-center w-75");
    replaceValue = "Unknown";
    if(apiData[id].show.status !== null){
        replaceValue = apiData[id].show.status;
    }
    showStatus = $("<p>").append("Show Status: " + replaceValue);
    $(showsCardContainer).append(cardImg);
    $(showsCardContainer).append(cardType);
    $(showsCardContainer).append(cardRatings);
    $(showsCardContainer).append(showStatus);


    var summmaryHeading = $(showsCardContainer).append("<p>");
    var genre = "";
    if(apiData[id].show.genres !== [] || apiData[id].show.genres !== null || apiData[id].show.genres !== undefined){
        for(var i=0; i< apiData[id].show.genres.length; i++){
            genre =  genre + "<span class='bg-success text-white px-2 mx-1 text-center'>"+ apiData[id].show.genres[i] +"</span>"; 
        }
        $(showsCardContainer).append("<p>" + genre + "<p>");
    }
    var summmaryHeading = $("<h3>").append("Summary");
    $(showsCardContainer).append(summmaryHeading);
    var showSummary = apiData[id].show.summary;
    
    if(showSummary === null){
        showSummary = "<p>No Summary Found</p>";
    }
    
    $(showsCardContainer).append(showSummary);

    var siteHeading = $("<h3>").append("Watch it Here");
    $(showsCardContainer).append(siteHeading);
    var showLink = "<a href='"+apiData[id].show.officialSite+"' target='_blank'>Click Me!</a>";
    
    if(apiData[id].show.officialSite === null){
        showLink = "<p>No Links Found</p>";
    }
    
    $(showsCardContainer).append(showLink);

    
    var infoHeading = $("<h3>").append("Wanna Find out more");
    
    $(showsCardContainer).append(infoHeading);
    var moreInfoLink = "<a href='"+apiData[id].show.url+"' target='_blank' class='btn btn-primary text-center mb-3'>Let's go</a>";
    
    if(apiData[id].show.url === null){
        moreInfoLink = "<p>No Links Found</p>";
    }
    
    $(showsCardContainer).append(moreInfoLink);
    if($(".card-img-top").hasClass('animated flip')){
        $(".card-img-top").removeClass('animated flip');
    } else {
        $(".card-img-top").addClass('animated flip');
    }

}

var formSubmitHandler = function(event) {
    
    event.preventDefault();
    event.stopPropagation();
    if(showInput.val() != ""){
        showNameParam = showInput.val();
        getApiInfo(showNameParam);
        showInput.val("");
    } else {
        errorModal.toggle();
        $("#error-msg").text("Please Provide Show Name to search");
        $("main").removeClass('animated lightSpeedInLeft');
    }
};

getApiInfo("dragon");
showFormEl.unbind('submit').bind('submit',  formSubmitHandler);
    
$(".btn-close-modal").click(function(event){
    
    event.preventDefault();
    event.stopPropagation();
    $("main").removeClass('animated lightSpeedInLeft');
    if($(".card-img-top").hasClass('animated flip')){
        $(".card-img-top").removeClass('animated flip');
    } else {
        $(".card-img-top").addClass('animated flip');
    }
});
