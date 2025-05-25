import { useForm } from 'react-hook-form';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

interface SignupFormValues {
  username: string; 
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message || 'Registration failed');
        return;
      }

      const resData = await res.json();
      alert(resData.message);
      navigate('/');
    } catch (err) {
      console.error('Registration failed', err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
      <h2 className="registration-form__title">Create an Account</h2>

      <div className="registration-form__field">
        <label className="registration-form__label">Username</label>
        <Input
          {...register('username', { required: 'Username is required' })}
          autoComplete="username"
          className="registration-form__input"
        />
        {errors.username && <p className="registration-form__error">{errors.username.message}</p>}
      </div>

      <div className="registration-form__field">
        <label className="registration-form__label">Email</label>
        <Input
          type="email"
          {...register('email', { required: 'Email is required' })}
          autoComplete="email"
          className="registration-form__input"
        />
        {errors.email && <p className="registration-form__error">{errors.email.message}</p>}
      </div>

      <div className="registration-form__field">
        <label className="registration-form__label">Password</label>
        <Input
          type="password"
          {...register('password', { required: 'Password is required' })}
          autoComplete="new-password"
          className="registration-form__input"
        />
        {errors.password && <p className="registration-form__error">{errors.password.message}</p>}
      </div>

      <div className="registration-form__field">
        <label className="registration-form__label">Confirm Password</label>
        <Input
          type="password"
          {...register('confirmPassword', { required: 'Confirm Password is required' })}
          autoComplete="new-password"
          className="registration-form__input"
        />
        {errors.confirmPassword && (
          <p className="registration-form__error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="registration-form__submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};