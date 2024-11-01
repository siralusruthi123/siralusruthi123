import { configureStore, createSlice } from '@reduxjs/toolkit';
const productSlice=createSlice({
    name:'products',
    initialState:{ veg:[
        {name:'Panner',price:280.5},
        {name:'Mushroom',price:180.8},
        {name:'Potato',price:80.8},
        {name:'Tomato',price:60.8},
    ],
nonVeg:[
    { name:'Chicken',price:350.0},
    {name:'Fish',price:700.0} ,
    {name:'Prawns',price:900.0} ,
    {name:'Crab',price:800.0} ,
],
},
reducers:{},
} );



// slice-2
const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const status=state.find(item=>item.name===action.payload.name);
            if(status){
            status.quantity+=1;
            }
            else{
                state.push({...action.payload,quantity:1});
            }
        },

        incrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1; 
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item && item.quantity > 1) {
                item.quantity -= 1; 
            }
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.name !== action.payload.name); 
        }
    }
});

// Configure Store
const Store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
    },
});

// Export actions and store
export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default Store;