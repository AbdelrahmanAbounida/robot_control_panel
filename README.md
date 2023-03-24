# Robot Control Panel (Manual Control, Remote Control , Path Planning)

- A simple dashboard that add some features to control a mobile robot using ROS:
  - Robot connection status.
  - Moving buttons in various directions.
  - Force stop button for emergency cases.
  - Dynamic target depth publisher which allows users to send target depth with a single click.
  - Tracking the current depth value .
  - Adjusting the PID parameters dynamically.
  - Path Planning
  - Displaying the current overshoot, and some other prop-
  erties.
  
  <p align="center">
  <img src="path_planning.png" width="700px">
  </p>

  
  ## Getting Started
  
  ### Installation ###
   1. Go to your ROS package source directory:
      - `$ cd ros_workspace_path/src`
   2. Clone this project.
      - `$ git clone git@github.com:AbdelrahmanAbounida/robot_control_panel.git`
   3. Go back to your ROS workspace:
      - `$ cd ../`
   4. Build and install it:
      - `$ catkin build
   5. Reload your ROS env.
      - bash: `$ source devel/setup.sh`
      - zsh: `$ source devel/setup.sh`

## Running ##

  <p align="center">
  <img src="main.png" width="700px">
  </p>
  
 - installation
    - `roscd web_ui/src/ui`
    - `npm inistall`
    
- edit the websocket ip
    -  `roscd web_ui/src/ui/src/features/RosConnection `
    -  `ifconfig` # to get the local ip address of your device
    -  `cat RosConnectionSlice.js`
    -  edit  `const rosbridge_address ="your_ip"`

- open websocket connection to the local running roscore
    - `sudo apt-get install ros-<rosdistro>-rosbridge-server`
    - `roslaunch rosbridge_server rosbridge_websocket.launch`

- start connecting 
    - `roscd web_ui/src/ui/`
    - `npm run start`
- have fun with the tool
    <center><p align = "center"> :star::star::star: </p> </center>
