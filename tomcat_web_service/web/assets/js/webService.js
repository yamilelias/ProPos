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
function addPersonSettings() {
    $.post( "/person/" + $("#id").val() + "/" + $("#foco1").val() + "/" + $("#foco2").val(), function() {
    });
}

// This function is used by the modal to save all data and display a success alert
function addModal(){
    addPerson(); // Add Person data
    addPersonSettings(); // Add Person Profile
    successAlert(); // Display success Alert
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