/**
 * Created by Yamil Elías on 07/05/2016.
 */

/**
 * WEB SERVICES FUNCTIONS
 */

// Add a Person to the profiles list
function addPerson() {
    $.post( "/person/" + $("#id").val() + "/" + $("#name").val() + "/" + $("#lastName").val(), function() {
    });
}

// Add a new configuration to certain person
function addPerson() {
    $.post( "/person/" + $("#id").val() + "/" + $("#foco1").val() + "/" + $("#foco2").val(), function() {
    });
}

// Function to get all People
function getAllPeople(){
    $.getJSON("/person/all", function(data){
        var htmlTable = '<table class="table table-bordered"><thead><tr><th>ID</th><th>Name</th><th>Last Name</th></tr>';
        $.each(data.person, function(i,obj){
            var id = obj.id;
            var name = obj.name;
            var lastName = obj.lastName;
            var objecthtml = '<tr><td>'+id+'</td>'+'<td>'+name+'</td>'+'<td>'+lastName+'</td></tr>';
            htmlTable+=objecthtml;
        });

        $("#peopleTable").html(htmlTable+'</thead></table>');
    });
}

// Get people depending on their ID
function getPeopleByID(){
    $.getJSON("/person/" + $("id").val() + "/", function(data){

    });
}

// Get people profile depending on their ID
function getPeopleProfile(){
    $.getJSON("/person/profile/" + $("id").val()  + "/", function(data){

    });
}

// Get active person ID
function getActiveID(){
    $.getJSON("/active/", function(data){

    });
}

/**
 * OTHER FUNCTIONS
 */

// Function to display a Success Alert
function successAlert(){
    var alertMessage = '<div id="successAlert" class="alert alert-warning alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Holy guacamole!</strong> Best check yo self, youre not looking too good. </div>';
    $("#alert").html(alertMessage + '');
}

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});