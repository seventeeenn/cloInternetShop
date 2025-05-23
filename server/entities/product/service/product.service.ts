import { User } from '../../../entities/user/model/User'; 
import { Product } from '../model/Product';

interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
    discount_price: number;
    quantity: number;
    image: string;
}

export const productService = {
  async createProduct({ id, name, description, price, discount_price, quantity, image}: ProductData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    const newProduct = await Product.create({
        name,
        description,
        price,
        discount_price,
        quantity,
        image,
    });

    const productData = newProduct.toJSON();

    return {
        id: productData.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        discount_price: productData.discount_price,
        quantity: productData.quantity,
        image: productData.image,
    };
  }
};
