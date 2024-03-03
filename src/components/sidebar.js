import Link from 'next/link'
import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {AiOutlineShoppingCart,AiOutlineHeart} from "react-icons/ai"
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { WhatsApp } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material'; 
import { Instagram } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors'
import { useRouter } from 'next/router';
import ProfileOver from './ProfileOver';

export default function Sidebar({items,onHandlerSignUp,onHandlerSignIn,isFixed,user,liked,cart}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [isHover,setIsHover] = useState(false)
  const router = useRouter()
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='mt-10'></div>
      <div className='flex items-center justify-start gap-5 ml-5'>
        {user?.url_image? <Avatar   onClick = {()=>setIsHover(!isHover)}  src ={user?.url_image}/>: <Avatar   onClose={toggleDrawer("left", true)} onClick = {()=>setIsHover(!isHover)} sx={{ bgcolor: deepOrange[500] }}>{user?.email[0]}</Avatar>}
        
        <div className='relative' onClick={()=>router.push("/cart")}>
                                               
                                                <AiOutlineShoppingCart className={`cursor-pointer text-2xl flex items-center justify-center text-[#535252] font-medium`}/>
                                              
                                               < div className='w-[20px] h-[20px] text-white flex items-center justify-center rounded-full absolute -top-2 text-[10px] -right-3 shadow-sm bg-red-400'>
                                                         {cart}
                                               </div>
                                           </div>
                                           <div className='relative' onClick={()=>router.push("/liked")}>
                                               
                                                <AiOutlineHeart className={`cursor-pointer text-2xl flex items-center justify-center  text-[#535252] font-medium`}/>
                                               
                                               <div className='w-[20px] h-[20px] text-white flex items-center justify-center rounded-full absolute -top-2 text-[10px] -right-3 shadow-sm bg-red-400'>
                                                         {liked}
                                               </div>
                                           </div>
      </div>
      <List>
        {items.map(({linkName,type,handler}, index) => {
         if(user && (type === "button"||type === "button2")){
          return
         }
         return <ListItem key={linkName} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
             {(type === "button2" && !user) && <button onClick = {onHandlerSignUp} className={`border text-md font-semibold py-1 px-3 rounded-sm border-appPrimaryColor text-appPrimaryColor hover:bg-appPrimaryColor hover:text-white`} >{linkName}</button> 
}            {(type === "button" && !user) && <div onClick={onHandlerSignIn}><ListItemText  primary={linkName} /></div> }
             
              {(type !== "button2"&& type !== "button") &&<Link href={handler}> <ListItemText  primary={linkName} /></Link>}
            </ListItemButton>
          </ListItem>
})}
      </List>
      <Divider />
      <List>
        {[{text:"Facebook"}, {text:"Instagram"}, {text:"Whatsapp"}].map(({text}, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <Facebook/> : index === 1? <Instagram />:<WhatsApp/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
                    {isHover && <ProfileOver onIsHover={setIsHover} type="phone" user = {user} onHover = {setIsHover}/>}

    <div className='flex flex-col items-center pl-10'>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{<MenuIcon style={{color:`${isFixed?"black":"white"}`}}/>}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    </>
  );
}