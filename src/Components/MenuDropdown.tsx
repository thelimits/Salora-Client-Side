import React from 'react'
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Login from '@mui/icons-material/Input';
import { FaQuestionCircle } from "react-icons/fa";
import { PiPackage } from "react-icons/pi";
import { logout } from '@/Server/lib';
import { redirect } from "next/navigation";
import { FaUserCog } from "react-icons/fa";

export const MenuDropdown = ({session, role}: any) => {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%'}}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Login className='text-xl' />
          </ListItemIcon>
          <ListItemText>
            {
              session ? (
                <form
                  action={async () => {
                    await logout();
                    redirect("/");
                    }}
                  >
                  <button type="submit">Logout</button>
                </form>
              ) : (
                <div>
                  <a className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/customer/account/create/" aria-label="Salora">
                      Daftar
                  </a>
                  &nbsp; / &nbsp;
                  <a className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/customer/account/login/" aria-label="Salora">
                      Masuk
                  </a>
                </div>
              )
            }
          </ListItemText>
        </MenuItem>
        {
          session ? (
            <MenuItem>
              <ListItemIcon>
                <FaUserCog className='text-2xl'/>
              </ListItemIcon>
              <ListItemText>
                    <a className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href={`/${role}/account/profile`} aria-label="Salora">
                        Profile
                    </a>
              </ListItemText>
          </MenuItem>
          ) : (
            <div></div>
          )
        }
        <MenuItem>
          <ListItemIcon>
            <PiPackage className='text-2xl'/>
          </ListItemIcon>
          <ListItemText>
                <a className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/" aria-label="Salora">
                    Pesanan
                </a>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FaQuestionCircle className='text-2xl' />
          </ListItemIcon>
          <ListItemText>
                <a className='text-black decoration-transparent decoration-2 underline-offset-4 hover:underline hover:decoration-inherit' href="/" aria-label="Salora">
                    FAQ
                </a>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  )
}

export default MenuDropdown;