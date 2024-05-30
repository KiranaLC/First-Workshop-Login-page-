import React, { useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import {FormValues} from "../validators/validators";
import { FormType } from '../utils/constants';


const LoginSignupForm: React.FC = () => {
  const [formType, setFormType] = useState<FormType>(FormType.Login);
  const { register, handleSubmit, getValues, control, formState: { errors } } = useForm<FormValues>();

  const formValues = useWatch({ control });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  const isFormValid = formType === FormType.Login
    ? formValues.email && formValues.password
    : formType===FormType.Signup?formValues.username && formValues.email && formValues.password && formValues.confirmPassword && formValues.password === formValues.confirmPassword:false;

    
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black relative p-4 sm:p-6 lg:p-8">
      <div className="relative p-8 bg-white shadow-md rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md  mx-auto">
        <div className="w-full mx-auto mt-6">
          <div className="mb-4 flex justify-center">
            <button
              onClick={() => setFormType(FormType.Login)}
              className={`mr-10 text-lg ${formType === FormType.Login ? 'font-bold' : ''}`}
            >
              Login
            </button>
            <button
              onClick={() => setFormType(FormType.Signup)}
              className={`text-lg ${formType === FormType.Signup ? 'font-bold' : ''}`}
            >
              Signup
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-5 flex justify-center">{formType === FormType.Login ? FormType.Login : FormType.Signup}</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formType === FormType.Signup && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Username <span className="text-red-600">*</span></label>
                <input
                  {...register('username', { required: formType === FormType.Signup})}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  type="text"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span></label>
              <input
                {...register('email', { required: true })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                type="email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password <span className="text-red-600">*</span></label>
              <input
                {...register('password', { required: true, minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                type="password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            {formType === FormType.Signup && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password<span className="text-red-600"> *</span></label>
                <input
                  {...register('confirmPassword', {
                    required: formType === FormType.Signup,
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
              {formType === FormType.Login ? FormType.Login : FormType.Signup}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
