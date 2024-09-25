import CartModel from "../models/cart.js";


/*export const postCartData = async (req, res) => {
    try {
      const cart = await CartModel.findOne({ userId });
      return cart;
    } catch (error) {
      console.error(error);
      return null;
    }
  }*/
    export const postCartData = async (req, res) => {
        try {
          const { userId, items } = req.body;
          let cart = await CartModel.findOne({ userId });
          if (!cart) {
            cart = new CartModel({ userId, items });
          } else {
            cart.items.push(...items);
          }
          await cart.save();
          return res.json(cart);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error creating cart' });
        }
      }

      //Get Cart
      export const getCart = async (req, res) => {
        const  userId  = req.params.id;
      
        try {
          const cart = await CartModel.findOne({userId});
          console.log(cart)
          if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
          }
          res.status(200).json(cart);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };


     
      

    