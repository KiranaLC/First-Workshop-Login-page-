import React, { useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Confirm Password is required').optional()
});

type FormValues = z.infer<typeof formSchema>;

const LoginSignupForm: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const { register, handleSubmit, getValues, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const formValues = useWatch({ control });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  const isFormValid = formType === 'login'
    ? formValues.email && formValues.password
    : formType==='signup'?formValues.username && formValues.email && formValues.password && formValues.confirmPassword && formValues.password === formValues.confirmPassword:false;

    
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black relative p-4 sm:p-6 lg:p-8">
      {/* <img
        src={""} // replace with your actual image URL
        alt="Background"
        className="absolute inset-0 w-full h-full"
      /> */}
      <div className="relative p-8 bg-white shadow-md rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        <div className="w-full mx-auto mt-6">
          <div className="mb-4 flex justify-center">
            <button
              onClick={() => setFormType('login')}
              className={`mr-10 text-lg ${formType === 'login' ? 'font-bold' : ''}`}
            >
              Login
            </button>
            <button
              onClick={() => setFormType('signup')}
              className={`text-lg ${formType === 'signup' ? 'font-bold' : ''}`}
            >
              Signup
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-5 flex justify-center">{formType === 'login' ? 'Login' : 'Signup'}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formType === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  {...register('username', { required: formType === 'signup' })}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  type="text"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email', { required: true })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                type="email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register('password', { required: true, minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                type="password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            {formType === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  {...register('confirmPassword', {
                    required: formType === 'signup',
                    validate: (value) => value === getValues('password') || 'Passwords do not match'
                  })}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  type="password"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
            )}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md ${isFormValid ? 'bg-black text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              {formType === 'login' ? 'Login' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;




