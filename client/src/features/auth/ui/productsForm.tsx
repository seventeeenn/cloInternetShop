import { useForm } from 'react-hook-form';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct } from '@shared/store/productsSlice';

interface ProductFormValues {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    image: string[];
}

export const ProductForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ProductFormValues>();
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
  
    const onSubmit = async (data: ProductFormValues) => {
      try {
        setLoading(true);
        
        const productData = data.discountPrice 
          ? data 
          : { ...data, discountPrice: undefined };
  
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          alert(errorData.message || 'Failed to add product');
          return;
        }
  
        const resData = await res.json();
        alert(resData.message);
        dispatch(addProduct(resData.product));
        navigate('/products');
      } catch (err) {
        console.error('Failed to add product', err);
        alert('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="CLASS__NAME">
        <div>
          <label>Product Name</label>
          <Input
            {...register('name', { required: 'Product name is required' })}
            className="CLASS__NAME"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
  
        <div>
          <label>Description</label>
          <Input
            {...register('description', { required: 'Description is required' })}
            className="CLASS__NAME"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
  
        <div>
          <label>Price</label>
          <Input
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' }
            })}
            className="CLASS__NAME"
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
  
        <div>
          <label>Discount Price (optional)</label>
          <Input
            type="number"
            step="0.01"
            {...register('discountPrice', { 
              min: { value: 0.01, message: 'Discount price must be greater than 0' }
            })}
            className="CLASS__NAME"
          />
          {errors.discountPrice && <p>{errors.discountPrice.message}</p>}
        </div>
  
        <div>
          <label>Quantity</label>
          <Input
            type="number"
            {...register('quantity', { 
              required: 'Quantity is required',
              min: { value: 0, message: 'Quantity cannot be negative' }
            })}
            className="CLASS__NAME"
          />
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>

        <div>
          <label>Images</label>
          <Input
            {...register('image', { 
              required: 'Image is required'
            })}
            className="CLASS__NAME"
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>
  
        <Button type="submit" className="CLASS__NAME" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    );
};