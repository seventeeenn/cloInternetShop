import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css'
import { useDispatch } from 'react-redux';
import { setUser } from '@shared/store/userSlice';

//схема валидации
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // const resData = await res.json();
      let resData;
      try {
        resData = await res.json();
      } catch (e) {
        console.error('Invalid JSON response');
        resData = { message: 'Server returned invalid response' };
      }


      if (!res.ok) {
        alert(resData.message || 'Login failed');
        return;
      }

      // Храни токен при необходимости (resData.token)
      alert(resData.message);
      dispatch(setUser({ name: resData.name, email: resData.email }));       
      
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='cont'>
    <form onSubmit={handleSubmit(onSubmit)} className="login-form card">
      <div>
        <label className='Email'>Email</label>
        <Input
          type="email"
          autoComplete='email'
          {...register('email')}
          className="CLASS__NAME"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label className='Password'>Password</label>
        <Input
          type="password"
          autoComplete='current-password'
          {...register('password')}
          className="CLASS__NAME"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
    </div>
  );
};