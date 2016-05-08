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
        $.each(data.personHashMap, function(i,obj){
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
    var alertMessage = '<div id="successAlert" class="alert alert-success alert-dismissible fade in" role=alert><button type=button class=close data-dismiss=alert aria-label=Close> <span aria-hidden=true>&times;</span></button> <strong>Congratulations!</strong> You have saved a new profile. </div>';
    $("#alert").html('' + alertMessage + '');
}

// Function to display a preview of a photo
$(function() {
    $("#uploadFile").on("change", function()
    {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (/^image/.test( files[0].type)){ // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onload = function(){ // set image data as background of div
                $("#imagePreview").css("background-image", "url("+this.result+")");
            }
        }
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgPreview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#uploadFile").change(function() {
    readURL(this);
});