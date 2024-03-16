import React from 'react'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Login from '@mui/icons-material/Input';
import { FaQuestionCircle } from "react-icons/fa";
import ContentPaste from '@mui/icons-material/ContentPaste';
import { PiPackage } from "react-icons/pi";
import Link from 'next/link';

export const MenuDropdown = () => {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%'}}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Login className='text-xl' />
          </ListItemIcon>
          <ListItemText>
                <Link className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/customer/account/create/" aria-label="Salora">
                    Daftar
                </Link>
                &nbsp; / &nbsp;
                <Link className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/" aria-label="Salora">
                    Masuk
                </Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PiPackage className='text-xl'/>
          </ListItemIcon>
          <ListItemText>
                <Link className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/" aria-label="Salora">
                    Pesanan
                </Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaQuestionCircle className='text-xl' />
          </ListItemIcon>
          <ListItemText>
                <Link className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/" aria-label="Salora">
                    FAQ
                </Link>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

export default MenuDropdown;