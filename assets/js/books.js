
var booksInput = $("#books-type");

function getOptions() {
    
    $("#books").html("");
    var booksapi = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=ixKJxFefdUxNEpmDMBx0bG3UsH3GerGC";
    fetch(booksapi)
    .then(response => {
        if(response.ok){
            response.json().then(data => {
                if(data.length !== 0){
                    for(var i = 0; i < data.results.length; i++){
                        $("#books-type").append($("<option>").text(data.results[i].list_name).val(data.results[i].list_name))
                    }
                }
            })
        }
    });
};

function getApiInfo(query) {
    window.localStorage.clear();
    var booksapi = "https://api.nytimes.com/svc/books/v3/lists.json?api-key=IlTS3Agt7O38JYk9APKPbG4xUMKPpAza&list=" + query;
    fetch(booksapi)
    .then(response => {
        if(response.ok){
            response.json().then(data => {
                console.log(data)
                if(data.length !== 0){
                    localStorage.setItem('booksapi', JSON.stringify(data));
                    displayData()
                }
            })
        }
    });
};

function displayData(){
    
    var responseData = JSON.parse(localStorage.getItem('booksapi'));
    $("#books-list").html("");

    for(var i = 0; i< responseData.results.length; i++){
        if(i%5 === 0){
            var booksRow = $("<div>").addClass("row m-3 d-flex justify-content-center align-items-center");
            $("#books-list").append(booksRow);
        }
        var booksCol= $("<div>").addClass("col-md-3 d-flex flex-column justify-content-center align-items-center text-white bg-info rounded p-2 m-3 bg-image-2").css({"width":"320px", "height":"400px"});
        $(booksRow).append(booksCol);
        var booksHeading = $("<h4>").addClass("font-weight-light text-success").text(responseData.results[i].book_details[0].title);
        $(booksCol).append(booksHeading);
        var booksSummary = $("<p>").text(responseData.results[i].book_details[0].description);
        $(booksCol).append(booksSummary);
        var booksby = $("<p>").text(responseData.results[i].book_details[0].contributor);
        $(booksCol).append(booksby);
        var booksLink = $("<a>").text("Click To Buy").attr("href", responseData.results[i].amazon_product_url);
        $(booksCol).append(booksLink);

    }

}

var formHandler = function(event) {
    
    event.preventDefault();
    event.stopPropagation();
    getApiInfo($("#books-type").val())
};

booksInput.on('change',  formHandler);
    
getApiInfo("Combined Print and E-Book Fiction");
getOptions();