/**
 * Created by Yamil Elías on 07/05/2016.
 */

/**
 * WEB SERVICES FUNCTIONS
 */

// Add a Person to the profiles list
function addPerson() {
    //Try to post data
    $.post( "/person/" + $("#id").val() + "/" + $("#name").val() + "/" + $("#lastName").val(), function() {
    })
        .done(function(){ // This will spawn a success Message
            return 0; // Return 0 saying there were no errors
        })
        .fail(function(){ // This will spawn an error if there was any
            return 1; // Return 1 saying there were errors
        });
}

// Add a new configuration to certain person
function addPersonSettings() {
    //Try to post data
    $.post( "/person/" + $("#id").val() + "/" + $("#foco1").val() + "/" + $("#foco2").val(), function() {
    })
        .done(function(){ // This will spawn a success Message
            return 0; // Return 0 saying there were no errors
        })
        .fail(function(){ // This will spawn an error if there was any
            return 1; // Return 1 saying there were errors
        });
}

// This function is used by the modal to save all data and display a success alert
function addModal(){
    try{
        var profile = addPerson(); // Add Person data
        var settings = addPersonSettings(); // Add Person Profile

        if(profile!=0|| settings!=0){
            throw "There was an error creating profile. Try again later.";
        }
        else{
            successAlert(); // Success Alert
        }
    }
    catch(err){
        postErrorAlert(); // If we had an error uploading the new Profile
    }
}

// Function to get all People
function getAllPeople(){
    var htmlTable = ''; // Aux Variable

    // Demo variables - Delete if not needed any more
    var demo_id = 0;
    var demo_name = 'Bob';
    var demo_lastName = 'Torres';

    // Put demo in Aux Variable
    htmlTable+= '<tr><td>'+demo_id+'</td>'+'<td>'+demo_name+'</td>'+'<td>'+demo_lastName+'</td></tr>';

    $.getJSON("/person/all", function(data){

        $.each(data.personHashMap, function(i,obj){ // For each element in the Hash Map
            var id = obj.id; // Get the ID
            var name = obj.name; // Get the Name
            var lastName = obj.lastName; // Get the last Name

            // Put everything in the aux variable
            htmlTable+= '<tr><td>'+id+'</td>'+'<td>'+name+'</td>'+'<td>'+lastName+'</td></tr>';
        });
    })
        .fail(function(){
            getErrorAlert();
        });

    $('#profilesResult').html(htmlTable); // Print it on the table
}
function getAllPeopleSettings(){
    var htmlTable = ''; // Aux Variable

    // Demo variables - Delete if not needed any more
    var demo_id = 0;
    var demo_name = 'Bob';
    var demo_lastName = 'Torres';
    var bool_foco1 = true;
    var bool_foco2 = false;

    // Check for bool_foco1 and bool_foco2
    var demo_foco1 = bool_foco1 ? 'checked' : '';
    var demo_foco2 = bool_foco2 ? 'checked' : '';

    // Put demo in Aux Variable
    htmlTable+= '<tr><td>'+demo_id+'</td>'+'<td>'+demo_name+'</td>'+'<td>'+demo_lastName+'</td>'+'<td><input type="checkbox" disabled '+demo_foco1+'></td>'+'<td><input type="checkbox" disabled '+demo_foco2+'></td></tr>';

    $.getJSON("/person/all", function(data){
        $.each(data.personHashMap, function(i,obj){ // For each element in the Hash Map
            var id = obj.id; // Get the ID
            var name = obj.name; // Get the Name
            var lastName = obj.lastName; // Get the last Name
            var foco1 = obj.foco1 ? 'checked' : ''; // If foco1 is active then check the checkbox
            var foco2 = obj.foco2 ? 'checked' : ''; // If foco2 is active then check the checkbox

            // Put everything in the aux variable
            htmlTable+= '<tr><td>'+id+'</td>'+'<td>'+name+'</td>'+'<td>'+lastName+'</td>'+'<td>< type="checkbox" disabled '+foco1+'></td>'+'<td><input type="checkbox" disabled '+foco2+'></td></tr>';
        });
    })
        .fail(function(){
            getErrorAlert();
        });

    $("#peopleSettings").html(htmlTable); // Print it on the table
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

/**
 * OTHER FUNCTIONS
 */

// Function to display a Success Alert
function successAlert(){
    var alertMessage = '<div id="successAlert" class="alert alert-success alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Congratulations!</strong> You have saved a new profile. </div>';
    $("#alert").html('' + alertMessage + '');
}

// Function to display an Error Alert in POST
function postErrorAlert(){
    var alertMessage = '<div id="errorAlert" class="alert alert-danger alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Oh oh!</strong> There was an error saving your profile, try again later.</div>';
    $("#alert").html('' + alertMessage + '');
}

// Function to display an Error Alert in GET
function getErrorAlert(){
    var alertMessage = '<div id="errorAlert" class="alert alert-danger alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Oh oh!</strong> There was an error getting the information from server, try again later.</div>';
    $("#alert").html('' + alertMessage + '');
}

// Function to display a preview of a photo
function readURL(input) {
    if (input.files && input.files[0]) { // If we have an input file
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result); // Change the source of the image so it will display the uploaded
        }

        reader.readAsDataURL(input.files[0]);
    }
}

// Function that will call readURL to display image
$("#uploadFile").change(function() {
    readURL(this);
});