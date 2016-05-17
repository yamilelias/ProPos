/**
 * Created by Yamil Elías on 07/05/2016.
 */


//==============================================================
//      WEB SERVICES FUNCTIONS
//==============================================================

 // Global variable
 url = "/PF/pf";

/**
 * Add a Person to the profiles list
 */
function addPerson() {

    //Try to post data
    $.post( url + "/person/" + $("#id").val() + "/" + $("#name").val() + "/" + $("#lastName").val(), function() {
    })
        .done(function(){ // This will spawn a success Message
            return 0; // Return 0 saying there were no errors
        })
        .fail(function(){ // This will spawn an error if there was any
            return 1; // Return 1 saying there were errors
        });
}

/**
 * Add a new configuration to certain person
 */
function addPersonSettings() {

    // If the checkbox are "checked" or not
    var num_foco1 = $("#foco1").is(":checked") ? 1 : 0; // TRUE = 1 | FALSE = 0
    var num_foco2 = $("#foco2").is(":checked") ? 1 : 0; // TRUE = 1 | FALSE = 0

    //Try to post data
    $.post( url + "/person/profile/" + $("#id").val() + "/" + num_foco1 + "/" + num_foco2, function() {
    })
        .done(function(){ // This will spawn a success Message
            return 0; // Return 0 saying there were no errors
        })
        .fail(function(){ // This will spawn an error if there was any
            return 1; // Return 1 saying there were errors
        });
}

/**
 * This function is used by the modal to save all data and display a success alert
 */
function addModal(){
    try{
        var profile = addPerson(); // Add Person data
        var settings = addPersonSettings(); // Add Person Profile

        if((profile!=0 || settings!=0)&&(profile!=null || profile!=null)){
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

/**
 * Function to get all People
 */
function getAllPeople(){
    var htmlTable = ''; // Aux Variable

    // Demo variables - Delete if not needed any more
    var demo_id = 0;
    var demo_name = 'Bob';
    var demo_lastName = 'Torres';

    // Put demo in Aux Variable
    htmlTable+= '<tr><td>'+demo_id+'</td>'+'<td>'+demo_name+'</td>'+'<td>'+demo_lastName+'</td></tr>';

    $.getJSON( url +"/person/all", function(data){
        for (var i = 1; i < 5; i++) {// For each element in the Hash Map
            var id = data[i].id; // Get the ID
            var name = data[i].name; // Get the Name
            var lastName = data[i].lastName; // Get the last Name

            // Put everything in the aux variable
            htmlTable+= '<tr><td>'+id+'</td>'+'<td>'+name+'</td>'+'<td>'+lastName+'</td></tr>';
        }

        $('#profilesResult').html(htmlTable); // Print it on the table
    })
    .fail(function(){
        getErrorAlert();
    });    
}

/**
 * Function to get all People Settings
 */
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
    htmlTable+= '<tr><td>'+demo_id+'</td>'+'<td>'+demo_name+'</td>'+'<td>'+demo_lastName+'</td>'+'<td><input type="checkbox" disabled '+demo_foco1+'></td>'+'<td><input type="checkbox" disabled '+demo_foco2+'></td><td><button class="btn btn-default btn-sm btn-primary" disabled>Activate</button>  <button class="btn btn-default btn-sm btn-danger" disabled>Disable</button></td></tr>';

    $.getJSON( url +"/person/all", function(data){
        
        for (var i = 1; i < 5; i++) {// For each element in the Hash Map
            var id = data[i].id; // Get the ID
            var name = data[i].name; // Get the Name
            var lastName = data[i].lastName; // Get the last Name
            var foco1 = data[i].profile.foco1 ? 'checked' : ''; // If foco1 is active then check the checkbox
            var foco2 = data[i].profile.foco2 ? 'checked' : ''; // If foco2 is active then check the checkbox

            // Put everything in the aux variable
            htmlTable+= '<tr><td>'+id+'</td>'+'<td>'+name+'</td>'+'<td>'+lastName+'</td>'+'<td><input type="checkbox" disabled '+foco1+'></td>'+'<td><input type="checkbox" disabled '+foco2+'></td><td><button class="btn btn-default btn-sm btn-primary" disabled>Activate</button>  <button class="btn btn-default btn-sm btn-danger" disabled>Disable</button></td></tr>';
        }

        $("#peopleSettings").html(htmlTable); // Print it on the table
    })
        .fail(function(){
            getErrorAlert();
        });
}

//==============================================================
//      FUNCTIONS THAT AREN'T IMPLEMENTED YET FOR WEB SERVICE
//==============================================================

/**
 * Get people depending on their ID
 */
function getPeopleByID(){
    $.getJSON( url +"/person/" + $("id").val() + "/", function(data){

    });
}

//
/**
 * Activate foco1 or foco2
 */
function activateBulbs(){
    $.post(url + "/active/" + $("#idTurnOn").val(), function(){
    });


}

//
/**
 * Get people profile depending on their ID
 */
function getPeopleProfile(){
    $.getJSON( url + "/person/profile/" + $("id").val()  + "/", function(data){

    });
}

//==============================================================
//      OTHER FUNCTIONS
//==============================================================

/**
 * Function to display a Success Alert
 */
function successAlert(){
    var alertMessage = '<div id="successAlert" class="alert alert-success alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Congratulations!</strong> You have saved a new profile. </div>';
    $("#alert").html('' + alertMessage + '');
}

 /**
 * Function to display an Error Alert in POST
 */
function postErrorAlert(){
    var alertMessage = '<div id="errorAlert" class="alert alert-danger alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Oh oh!</strong> There was an error saving your profile, try again later.</div>';
    $("#alert").html('' + alertMessage + '');
}

/**
 * Function to display an Error Alert in GET
 */
function getErrorAlert(){
    var alertMessage = '<div id="errorAlert" class="alert alert-danger alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Oh oh!</strong> There was an error getting the information from server, try again later.</div>';
    $("#alert").html('' + alertMessage + '');
}

/**
 * Function to display a preview of a photo - DON'T WORK  YET
 * @param input From where the image will be taken
 */
function readURL(input) {
    if (input.files && input.files[0]) { // If we have an input file
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result); // Change the source of the image so it will display the uploaded
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/**
 * Function that will call readURL to display image - DON'T WORK  YET
 */
$("#uploadFile").change(function() {
    readURL(this);
});