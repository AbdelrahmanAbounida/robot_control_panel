import React from 'react'
import {Stack, Box, Typography, Divider,Button} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setTagPosition, setCameraOffset } from '../features/Configuration/ConfigurationSlice'
import { useState } from 'react'

const Configuration = () => {

    const dispatch = useDispatch()
    const rosConnectionState = useSelector((state) => state.RosConnection)

    const cameraOffsetState = useSelector((state) => state.Configuration.cameraOffset)
    const tagPositionState = useSelector((state) => state.Configuration.tagPosition)

    const [currentCameraOffset, setCurrentCameraOffset] = useState(cameraOffsetState)
    const [currentTagPosition, setCurrentTagPosition] = useState(tagPositionState)


    // publish the target camera offset
    const cameraOffset_topic = new window.ROSLIB.Topic({
        ros: rosConnectionState.ros,
        name:"/camera_offset",
        messageType:"localization/customPos"
      })
      
    const PublishCameraOffsetState = async ()=>{
        dispatch(setCameraOffset(currentCameraOffset))
        const camera_offset_message = new window.ROSLIB.Message({x:currentCameraOffset.x,y:currentCameraOffset.y,z:currentCameraOffset.z})
        rosConnectionState.ros? cameraOffset_topic?.publish(camera_offset_message) : console.log("ros is",rosConnectionState.ros)
    }

    // publish the target position offset
    const targetPosition_publisher = new window.ROSLIB.Topic({
        ros: rosConnectionState.ros,
        name:"/tag_position",
        messageType:"localization/customPos"
      })

    const PublishSetTagPositionState = async ()=>{
        dispatch(setTagPosition(currentTagPosition))
        const tag_position_message = new window.ROSLIB.Message({x:currentTagPosition.x,y:currentTagPosition.y,z:currentTagPosition.z})
        rosConnectionState.ros? targetPosition_publisher?.publish(tag_position_message) : console.log("ros is",rosConnectionState.ros)
    }

  return (
    <Stack direction="column" gap={10} sx={{mx:"auto",justifyContent:"center"}}>
            <Box>
            <Typography variant='h4' sx={{backgroundColor:"#25292a",fontSize:27,width:400,py:2,borderRadius:10,mb:5,mx:"auto",color:"lightseagreen"}}>Camera Offset</Typography>               
             <Stack direction={"row"} gap={15} sx={{mt:6,mb:4,mx:"auto", justifyContent:"center"}}>
                    <Box>
                        <Typography sx={{mb:1,fontSize:25}}>X-Offset</Typography>
                        <div>
                            <input 
                                style={{borderColor:'#000',borderRadius:14,fontSize:23}}  
                                value={currentCameraOffset.x} 
                                onChange={(event)=>setCurrentCameraOffset({...currentCameraOffset,x:Number(event.target.value)})}/>
                        </div>
                    </Box>
                    <Box>
                        <Typography sx={{mb:1,fontSize:25}}>Y-Offset</Typography>
                        <div>
                            <input 
                                style={{borderColor:'#000',borderRadius:14,fontSize:23}}  
                                value={currentCameraOffset.y} 
                                onChange={(event)=>setCurrentCameraOffset({...currentCameraOffset,y:Number(event.target.value)})}/>
                        </div>
                    </Box>
                    <Box>
                        <Typography sx={{mb:1,fontSize:25}}>Z-Offset</Typography>
                        <div>
                            <input 
                                style={{borderColor:'#000',borderRadius:14,fontSize:23}}  
                                value={currentCameraOffset.z} 
                                onChange={(event)=>setCurrentCameraOffset({...currentCameraOffset,z:Number(event.target.value)})}/>
                        </div>
                    </Box>
                </Stack>
                <Button variant='contained'  sx={{backgroundColor:"lightgreensea",color:"#fff",mt:0,px:7,py:1.4,fontSize:17,fontWeight:"bold"}} onClick={()=>PublishCameraOffsetState()} >Update Offset</Button>
            </Box>

            <Divider />

            <Box>
                <Typography variant='h4' sx={{backgroundColor:"#25292a",fontSize:27,width:400,py:2,borderRadius:10,mb:5,mx:"auto",color:"lightseagreen"}} >Tag Position</Typography>

                <Stack direction={"row"} gap={15} sx={{mt:3,mb:4,mx:"auto", justifyContent:"center"}}>
                    <Box>
                        <Typography sx={{mb:1,fontSize:25}}>X-Pos</Typography>
                        <div>
                            <input 
                                style={{borderColor:'#000',borderRadius:14,fontSize:23}}  
                                value={currentTagPosition.x} 
                                onChange={(event)=>setCurrentTagPosition({...currentTagPosition,x:Number(event.target.value)})}/>
                        </div>
                    </Box>
                    <Box>
                        <Typography sx={{mb:1,fontSize:25}}>Y-Pos</Typography>
                        <div>
                            <input 
                                style={{borderColor:'#000',borderRadius:14,fontSize:23}}  
                                value={currentTagPosition.y} 
                                onChange={(event)=>setCurrentTagPosition({...currentTagPosition,y:Number(event.target.value)})}/>
                        </div>
                    </Box>
                    <Box>
                        <Typography sx={{mb:1,fontSize:25}}>Z-Pos</Typography>
                        <div>
                            <input 
                                style={{borderColor:'#000',borderRadius:14,fontSize:23}}  
                                value={currentTagPosition.z} 
                                onChange={(event)=>setCurrentTagPosition({...currentTagPosition,z:Number(event.target.value)})}/>
                        </div>
                    </Box>
                </Stack>

                <Button variant='contained'  sx={{backgroundColor:"lightgreensea",color:"#fff",mt:0,px:9,py:1.4,fontSize:17,fontWeight:"bold"}} onClick={()=>PublishSetTagPositionState()}>Update Tag</Button>
          </Box>
          </Stack>
  )
}

export default Configuration