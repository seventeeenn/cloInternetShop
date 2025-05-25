import { useForm } from 'react-hook-form';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addProduct } from '@shared/store/productsSlice';

interface ProductFormValues {
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
        
        const productData = {
          ...data,
          discount_price: data.discountPrice || null, 
        };

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
      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
         <div className='product-form-input-wrapper'>
          <label>Product Name</label>
          <Input
            {...register('name', { required: 'Product name is required' })}
            className="product-form__field"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        
        <div className='product-form-input-wrapper'>
          <label>Description</label>
          <Input
            {...register('description', { required: 'Description is required' })}
            className="product-form__field"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
  
        <div className='product-form-input-wrapper'>
          <label>Price</label>
          <Input
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' }
            })}
            className="product-form__field"
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
  
        <div className='product-form-input-wrapper'>
          <label>Discount Price (optional)</label>
          <Input
            type="number"
            step="0.01"
            {...register('discountPrice', { 
              min: { value: 0.01, message: 'Discount price must be greater than 0' }
            })}
            className="product-form__field"
          />
          {errors.discountPrice && <p>{errors.discountPrice.message}</p>}
        </div>
  
        <div className='product-form-input-wrapper'>
          <label>Quantity</label>
          <Input
            type="number"
            {...register('quantity', { 
              required: 'Quantity is required',
              min: { value: 0, message: 'Quantity cannot be negative' }
            })}
            className="product-form__field"
          />
          {errors.quantity && <p>{errors.quantity.message}</p>}
        </div>

        <div className='product-form-input-wrapper'>
        <label className="product-form__label">Images (URLs, comma-separated)</label>
        <Input
          {...register('image', {
            required: 'Image is required',
          })}
          className="product-form__field"
        />
        {errors.image && <p className="product-form__error">{errors.image.message}</p>}
        </div>

        <Button type="submit" className="product-form__submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </Button>
      </form>
    );
};