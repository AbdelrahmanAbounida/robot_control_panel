import React from 'react'
import { Box, Stack,Typography, Button, Divider, ListItemIcon } from '@mui/material'
import {FormControl,RadioGroup,FormControlLabel,Radio} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setPath } from '../features/Path/PathSlice'

import {FiCircle} from 'react-icons/fi'
import {TbWaveSine} from 'react-icons/tb'
import {IoMdSquareOutline} from 'react-icons/io'
import {TiSpiral} from 'react-icons/ti'

const PathTracking = () => {

  const boxStyle = {backgroundColor:"#000",color:"#fff",width:200,height:200,borderRadius:10,justifyContent:"center",alignItems:"center",mx:"auto",display:"flex",flexDirection:"column"}

  const dispatch = useDispatch()
  const rosConnectionState = useSelector((state) => state.RosConnection)

  const pathState = useSelector((state) => state.Path.value)
  const [currentPath, setCurrentPath] = useState(pathState)

  const [currentPos,setcurrentPos] = useState({x:0,y:0,z:0})
  const [targetPos,settargetPos] = useState({x:0,y:0,z:0})


  // publish the target path shape
  const path_shape_topic = new window.ROSLIB.Topic({
    ros: rosConnectionState.ros,
    name:"/path_shape",
    messageType:"std_msgs/String"
  })

  const PublishTargetPathShape= async ()=>{
    console.log(currentPath)
    dispatch(setPath(currentPath))
    const target_path_message = new window.ROSLIB.Message({data:currentPath})
    rosConnectionState.ros? path_shape_topic?.publish(target_path_message) : console.log("ros is",rosConnectionState.ros)
}

  // subscribe to the current position
  const current_pos_listener = new window.ROSLIB.Topic({
    ros: rosConnectionState.ros,
    name:"/calculated_position",  // /controller/actual_depth
    messageType:"localization/customPos"
  })

  const current_pos_Callback = (msg)=>{
    setcurrentPos({x:Number(msg.x).toFixed(2),y:Number(msg.y).toFixed(2),z:Number(msg.z).toFixed(2)})
  }
  if(current_pos_listener.ros){
    current_pos_listener?.subscribe(current_pos_Callback)
  }

  // subscribe to the current target position
  const target_pos_listener = new window.ROSLIB.Topic({
    ros: rosConnectionState.ros,
    name:"/current_target_pos",  // /controller/actual_depth
    messageType:"localization/customPos"
  })

  const target_pos_Callback = (msg)=>{
    settargetPos({x:Number(msg.x).toFixed(2),y:Number(msg.y).toFixed(2),z:Number(msg.z).toFixed(2)})
  }
  if(target_pos_listener.ros){
    target_pos_listener?.subscribe(target_pos_Callback)
  }

  return (
    <Stack direction="column">

      <FormControl>
          <Typography variant='h4' sx={{backgroundColor:"#25292a",fontSize:27,width:400,py:2,borderRadius:10,mb:5,mx:"auto",color:"lightseagreen"}}>Target Path Shape</Typography> 
          <RadioGroup sx={{display:"flex",flexDirection:"row",mx:"auto"}} 
            defaultValue="Square"
          >
              <FormControlLabel 
                  label={<Box sx={boxStyle}>
                          <ListItemIcon sx={{fontSize:130,color:"wheat"}}><IoMdSquareOutline/></ListItemIcon>
                          <Typography variant='h5' sx={{color:"#fff",fontWeight:"bold"}}>Square-XY</Typography>
                        </Box>}
                  control={<Radio />} 
                  value="Square" 
                  labelPlacement="top"
                  sx={{'& .MuiSvgIcon-root': {
                    fontSize: 35,
                  }}}
                  onChange={()=>{setCurrentPath("Square")}}
                  checked = {currentPath === "Square"}
              />

              <FormControlLabel 
                  label={<Box sx={boxStyle}>
                          <ListItemIcon sx={{fontSize:130,color:"wheat"}}><FiCircle/></ListItemIcon>
                          <Typography variant='h5' sx={{color:"#fff",fontWeight:"bold"}}>Circle-XZ</Typography>
                        </Box>}
                  control={<Radio />} 
                  value="Circle" 
                  labelPlacement="top"
                  sx={{'& .MuiSvgIcon-root': {
                    fontSize: 35,
                  }}}
                  onChange={()=>{setCurrentPath("Circle")}}
                  checked = {currentPath === "Circle"}
              />

              <FormControlLabel 
                  label={<Box sx={boxStyle}>
                          <ListItemIcon sx={{fontSize:130,color:"wheat"}}><TbWaveSine/></ListItemIcon>
                          <Typography variant='h5' sx={{color:"#fff",fontWeight:"bold"}}>Sine-YZ</Typography>
                        </Box>}
                  control={<Radio />} 
                  value="Sine" 
                  labelPlacement="top"
                  sx={{'& .MuiSvgIcon-root': {
                    fontSize: 35,
                  }}}
                  onChange={()=>{setCurrentPath("Sine")}}
                  checked = {currentPath === "Sine"}
              />

              <FormControlLabel 
                  label={<Box sx={boxStyle}>
                          <ListItemIcon sx={{fontSize:130,color:"wheat"}}><TiSpiral/></ListItemIcon>
                          <Typography variant='h5' sx={{color:"#fff",fontWeight:"bold"}}>Spiral-XYZ</Typography>
                        </Box>}
                  control={<Radio />} 
                  value="Spiral" 
                  labelPlacement="top"
                  sx={{'& .MuiSvgIcon-root': {
                    fontSize: 35,
                  }}}
                  onChange={()=>{setCurrentPath("Spiral")}}
                  checked = {currentPath === "Spiral"}
              />
          </RadioGroup>
      </FormControl>

      <Button  variant='contained' sx={{backgroundColor:"lightgreensea",color:"#fff",mt:0,px:7,py:1.4,fontSize:17,fontWeight:"bold",width:300,mx:"auto",mt:3}} onClick={()=>{PublishTargetPathShape()}}>Update Path</Button>

      <Divider sx={{mt:3}}/>

      <Box>
          <Stack direction="row" gap={20} sx={{mx:"auto",justifyContent:"center"}}>
            <Box>
                <Typography variant='h4' sx={{mt:6}}>Current Position:</Typography>

                <Stack direction="row">
                    <Typography variant='h4' sx={{mb:1,mt:3,py:0.7,pr:2}}>X:</Typography>
                    <Box sx={{height:30,mb:1,mt:3,backgroundColor:"#25292a",width:300,mx:"auto",py:3.5,color:"lightseagreen",alignItems:"center",display:"flex",justifyContent:"center",fontSize:30,borderRadius:5}}>
                        {currentPos.x}
                    </Box>
                </Stack>

                <Stack direction="row">
                    <Typography variant='h4' sx={{mb:1,mt:3,py:0.7,pr:2}}>Y:</Typography>
                    <Box sx={{height:30,mb:1,mt:3,backgroundColor:"#25292a",width:300,mx:"auto",py:3.5,color:"lightseagreen",alignItems:"center",display:"flex",justifyContent:"center",fontSize:30,borderRadius:5}}>
                    {currentPos.y}
                    </Box>
                </Stack>

                <Stack direction="row">
                    <Typography variant='h4' sx={{mb:1,mt:3,py:0.7,pr:2}}>Z:</Typography>
                    <Box sx={{height:30,mb:1,mt:3,backgroundColor:"#25292a",width:300,mx:"auto",py:3.5,color:"lightseagreen",alignItems:"center",display:"flex",justifyContent:"center",fontSize:30,borderRadius:5}}>
                    {currentPos.z}
                    </Box>
                </Stack>
            </Box>
            <Box>
                <Typography variant='h4' sx={{mt:6}}>Target Position:</Typography>

                <Stack direction="row">
                    <Typography variant='h4' sx={{mb:1,mt:3,py:0.7,pr:2}}>X:</Typography>
                    <Box sx={{height:30,mb:1,mt:3,backgroundColor:"#25292a",width:300,mx:"auto",py:3.5,color:"lightseagreen",alignItems:"center",display:"flex",justifyContent:"center",fontSize:30,borderRadius:5}}>
                    {targetPos.x}
                    </Box>
                </Stack>

                <Stack direction="row">
                    <Typography variant='h4' sx={{mb:1,mt:3,py:0.7,pr:2}}>Y:</Typography>
                    <Box sx={{height:30,mb:1,mt:3,backgroundColor:"#25292a",width:300,mx:"auto",py:3.5,color:"lightseagreen",alignItems:"center",display:"flex",justifyContent:"center",fontSize:30,borderRadius:5}}>
                    {targetPos.y}
                    </Box>
                </Stack>

                <Stack direction="row">
                    <Typography variant='h4' sx={{mb:1,mt:3,py:0.7,pr:2}}>Z:</Typography>
                    <Box sx={{height:30,mb:1,mt:3,backgroundColor:"#25292a",width:300,mx:"auto",py:3.5,color:"lightseagreen",alignItems:"center",display:"flex",justifyContent:"center",fontSize:30,borderRadius:5}}>
                    {targetPos.z}
                    </Box>
                </Stack>

          </Box>
          </Stack>
      </Box>

  </Stack>
  )
}

export default PathTracking