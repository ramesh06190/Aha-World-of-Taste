import React, { useState } from 'react';
import { List, ListItem, Icon, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminMenuList = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = location.pathname === item.to;

  const handleMenuItemClick = () => {
    if (item.to) {
      navigate(item.to);
    }
    toggleSubMenu()
  };

  return (
    <>
      <ListItem onClick={handleMenuItemClick}
    
        cursor="pointer"
        display="flex"
        alignItems="center"
        color={isActive ? 'black' : 'white'}
        padding="0.5rem 1rem"
        borderRadius="0.25rem"
        _hover={{ bg: '#EFD36D', color: 'black' }}
        bg={isActive ? '#EFD36D' : ''}
      >
        <Text>{item.name}</Text>
        {item.children && (
          <Icon
            as={ChevronDownIcon}
            ml="auto"
            transform={isOpen ? 'rotate(180deg)' : ''}
            transition="transform 0.2s"
          />
        )}
      </ListItem>
      {isOpen && item.children && (
        <List ml="4" mt="2" spacing={1}>
          {item.children.map((child, index) => (
            <ListItem key={index} padding="0.5rem 1rem">
              <AdminMenuList item={child} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AdminMenuList;
