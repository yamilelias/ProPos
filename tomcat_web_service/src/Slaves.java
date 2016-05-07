/**
 * Created by Alejandro on 5/1/2016.
 */

import com.pi4j.io.serial.Serial;
import com.pi4j.io.serial.SerialDataEvent;
import com.pi4j.io.serial.SerialDataListener;
import com.pi4j.io.serial.SerialFactory;
import com.pi4j.io.serial.SerialPortException;

public class Slaves {

    // create an instance of the serial communications class
    final Serial serial = SerialFactory.createInstance();

    public void setup(){

        // create and register the serial data listener
        // not sure if this is necessary, probably not
        serial.addListener(new SerialDataListener() {
            @Override
            public void dataReceived(SerialDataEvent event) {
                // print out the data received to the console
                System.out.print(event.getData());
            }
        });

        try {
            serial.open(Serial.DEFAULT_COM_PORT, 38400);
        }
        catch (SerialPortException e){
            System.out.println(" ==>> SERIAL SETUP FAILED : " + e.getMessage());
        }


    }

    public void doStuff(){
        System.out.println("Slaves doing stuff");
    }

    public void activateProfile(int id){
        try {
            Person person = new Person();
            if (PersonResources.personHashMap.containsKey(id)) {
                person = PersonResources.personHashMap.get(id);
            }
            else {
                System.out.println("No persons with that id");
            }
            boolean foco1 = person.getProfile().isFoco1();
            boolean foco2 = person.getProfile().isFoco2();
            int code = -1;

            /*
            ON/OFF code
            * case 0: //bulb1=OFF bulb2=OFF
            * case 1: //bulb1=ON bulb2=OFF
            * case 2: //bulb1=OFF bulb2=ON
            * case 3: //bulb1=ON bulb2=ON
            */

            if (!foco1 && !foco2)
                code = 0;
            else if (foco1 && !foco2)
                code = 1;
            else if (!foco1 && foco2)
                code = 2;
            else if (foco1 && foco2)
                code = 3;

            //send code to the slaves
            serial.write((byte)code);
        }
        catch (Exception e){
            System.out.println("Exception activating profile: " + e.toString());
        }

    }


}
