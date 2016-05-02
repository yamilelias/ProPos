import com.google.gson.Gson;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/pf")
public class Controller {
    Slaves slaves = new Slaves();


    //GET to see all the person resources
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    @Path("/person/all")
    public String getAllPersons() {
        Gson gson = new Gson();
        return gson.toJson(PersonResources.personHashMap);
    }

    //GET to see a person
    @Produces(MediaType.APPLICATION_JSON)
    @GET @Path("/person/{id}")
    public String getPerson(@PathParam("id") int id) {
        Person person;
        if (PersonResources.personHashMap.containsKey(id)) {
            person = PersonResources.personHashMap.get(id);
        } else
            person = null;
        Gson gson = new Gson();
        return gson.toJson(person);
    }

    //POST to enter the name and last name of a person
    @POST
    @Path("/person/{id}/{name}/{lastName}")
    public Response setPerson(
            @PathParam("id") int id,
            @PathParam("name") String name,
            @PathParam("lastName") String lastName) {

        try {
            if (!PersonResources.personHashMap.containsKey(id)) {
                Person person = new Person();
                person.setId(id);
                PersonResources.personHashMap.put(id, person);
            }

            //set the name and lastName of the person
            PersonResources.personHashMap.get(id).setName(name);
            PersonResources.personHashMap.get(id).setLastName(lastName);

            return Response.status(201).build();
        } catch (Exception e) {
            return Response.status(409).build();
        }
    }

    //GET to see a person's profile
    @Produces(MediaType.APPLICATION_JSON)
    @GET @Path("/person/profile/{id}")
    public String getPersonProfile(@PathParam("id") int id) {
        Profile profile;
        if (PersonResources.personHashMap.containsKey(id)) {
            profile = PersonResources.personHashMap.get(id).getProfile();
        } else
            profile = null;
        Gson gson = new Gson();
        return gson.toJson(profile);
    }

    //POST to set the preferences of a person's profile
    @POST @Path("/person/profile/{id}/{foco1}/{foco2}")
    public Response setPersonProfile(
            @PathParam("id") int id,
            @PathParam("foco1") int foco1,
            @PathParam("foco2") int foco2) {

        try {
            if (!PersonResources.personHashMap.containsKey(id)) {
                Person person = new Person();
                person.setId(id);
                PersonResources.personHashMap.put(id, person);
            }

            //set the preferences of the profile
            boolean f1 = (foco1 > 0);
            boolean f2 = (foco2 > 0);
            Profile profile = new Profile();
            profile.setFoco1(f1);
            profile.setFooc2(f2);

            //assign the profile to the person with the correspondent id
            PersonResources.personHashMap.get(id).setProfile(profile);

            return Response.status(201).build();
        } catch (Exception e) {
            return Response.status(409).build();
        }

    }

    //POST to set a person as active
    @POST @Path("/active/{id}")
    public Response setPersonActive(@PathParam("id") int id){
        try {
            if (PersonResources.personHashMap.containsKey(id)){
                PersonResources.actvePersonId = id;
                slaves.doStuff();
                return Response.status(201).build();
            }
            else return Response.status(409).build();
        }
        catch (Exception e){
            System.out.println("Exception:" + e.toString());
            return Response.status(409).build();
        }
    }

    //GET to see which person is active
    @Produces(MediaType.APPLICATION_JSON)
    @GET @Path("/active")
    public String getActiveId(){
        Gson gson = new Gson();
        return gson.toJson(PersonResources.actvePersonId);
    }

    @Produces(MediaType.APPLICATION_JSON)
    @GET @Path("/test")
    public String test(){
        Gson gson = new Gson();
        return gson.toJson("Success");
    }
}