// src/components/Sidebar.js
import React from 'react';
import { Box, List, ListItem } from '@chakra-ui/react';
import AdminMenuList from './AdminMenuList';
import AdminNavbar from './AdminNavbar';
const AdminSidebar = ({ items }) => {
  return (
<>
<div className='admin-parent_conatiner'>
<div className="admin-sidebar">
<Box w="250px" h="100vh" bg="gray.200" p="4">
      <List spacing={1}>
        {items.map((item, index) => (
          <ListItem key={index}>
            <AdminMenuList item={item} />
          </ListItem>
        ))}
      </List>
    </Box>
</div>
    <div className='admin-content'>
<AdminNavbar/>

    </div>
    </div>


</>
  );
};

export default AdminSidebar;
