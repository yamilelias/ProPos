# ProPos
[![Build Status](https://travis-ci.org/yamilelias/ProPos.svg?branch=master)](https://travis-ci.org/yamilelias/ProPos)

This is a Web Service Project using [Arduino](http://arduino.cc) and [Raspberry Pi](http://raspberrypi.org) Technologies to control some functions of the house using the library [OpenCV](http://opencv.org) to recognize the user face and customize the settings of the electronic devices that the user configured previously with a Profile.

Firstly we have the diagram of how the devices will iteract with the User. 

![Block Diagram](http://s32.postimg.org/lhvn137rp/Diagrama_a_bloques.png)

So, the user will configure his preferences within a Web Interface that will be hosted in the **Raspberry Pi _"Server"_** to select which devices (bulbs, in this example) will be turned on or off. Here are some screenshots of the Web Interface.

###Home
![Home Page](http://s32.postimg.org/dnhusge8l/Capture.png)
######_**Note: **The last panel (light bulb) is to insert an user ID and set his settings as default._

###Settings
![Settings Page](http://s32.postimg.org/4asss8efp/settings.png)

###Profiles
![Profiles Page](http://s32.postimg.org/xku7kni8l/profiles.png)

###Create/Edit Users
![Create/Edit Users Page](http://s32.postimg.org/rhviqmexh/create_New_Profile.png)

So, to start using this project, after you installed everything and upload the code to the different devices, then you can start creating your profiles in the Web Interface. For this, the Web Interface already have an example hardcoded (can be deleted when the project is operating) that can be used as an example. First is needed to add a profile in the **Create/Edit Users** window and then we can start using our devices!

**Note:** The project doesn't operate fully yet, so if you are interested in this project you can contribute forking it and start uploading code, any help is well received!

##Versions Review

Version|Commit
-------|--------
V 1.0| 021e08d3c30154fb0ac7f834e83290fd31899526

**Version 1.0:**
- It have serial communication
- Web Interface has lights control hardcoded
- OpenCV library detect faces but it doesn't send any signal
- Profiles aren't saved with user photo
