import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    
    // method to add a new plant item to the items array 

    addItem: (state, action) => {
      //debugger;
    
      const {name, image, cost} = action.payload;
      console.log("payload---",action.payload)
      console.log("items---",state.items)
      const existingItem = state.items.find(item =>  item.name == name);
      if(existingItem)
      {
        existingItem.quantity++;
      }
      else {
        state.items.push({name,image,cost, quantity: 1});
      }
    },

    // method to add a new plant item to the items array 

    removeItem: (state, action) => {

       state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {

      const {name, quantity} = action.payload;

      const itemToUpdate = state.items.find(item => item.name === name);

      if(itemToUpdate)
      {
        itemToUpdate.quantity=quantity;

      } },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
