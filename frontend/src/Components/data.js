// src/data.js
const menuItems = [
  {
    name: 'Over view',
    to: '/AdminOverview',
  },
    {
        name: 'Manage Orders',
        to: '/AdminManageOrders',
      },
      {
        name: 'Manage Reservations',
        to: '/AdminMangeReservation',
      },
    {
      name: 'Manage Menu',
      // to: '/products',
      children: [
        {
            name: 'Add Menu',
            to: '/AdminAddMenu',
          },
        {
            name: 'View Menu',
            to: '/AdminViewMenu',
          },
      
        {
            name: 'Update Menu',
            to: '/AdminEditMenu',
          },
        {
          name: 'Delete Menu',
          to: '/AdminDeleteMenu',
        //   children: [
        //     {
        //       name: 'Subproduct A',
        //       to: '/products/product2/subproducta',
        //     },
        //     {
        //       name: 'Subproduct B',
        //       to: '/products/product2/subproductb',
        //     },
        //   ],
        },
      
      ],
    },

    {
      name: 'Chats',
      to: '/admin',
    },
    {
      name: 'Reviews',
      to: '/AdminReviewList',
    },
  ];
  
  export default menuItems;
  