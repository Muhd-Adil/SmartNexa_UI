import {useState} from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/registration.css'
import IntroImage from './images/intro-img.jpeg';
import ShowPasswordIcon from './icons/show-password.svg';
import HidePasswordIcon from './icons/hide-password.svg';

const RegistrationForm = () => {
  // Only call useForm once
  const { register, handleSubmit, formState: { errors },watch } = useForm();
  const password = watch('password'); // Watching the password field
  const [showPassword, setShowPassword] = useState(false);
  
      const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        console.log(result);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  };

  return (
    <div className="layout-wrapper">
      <div className="row d-flex">
        {/* Left Brand / Image */}
        <div className="brand-container col-md-6">
          <div className="img-container mt-1 ms-1">
            <img src={IntroImage} alt="Welcome" className="intro-img" />
          </div>
        </div>

        {/* Right Registration Form */}
        <div className="login-content-wrapper col-md-6">
          <h2 className="brands-name text-center mt-2 mb-4">SmartNexa</h2>
          <h3 className="text-center mb-2">Get Started!</h3>
          <p className="text-center mb-4">Welcome to SmartNexa. Let's Create your account</p>

          <div className="register-container d-flex justify-content-center">
            <div className="register-form d-flex flex-column align-items-center ">
              <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                {/* Name Section */}
                <div className="name-section">
                  {/* First Name */}
                  <div className="fs-name">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input
                      id="firstname"
                      type="text"
                      className="form-control"
                      {...register('firstname', { required: 'First name is required' })}
                    />
                    {errors.firstname && (
                      <p className="form-text text-danger">{errors.firstname.message}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="ls-name mb-2">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input
                      id="lastname"
                      type="text"
                      className="form-control"
                      {...register('lastname', { required: 'Last name is required' })}
                    />
                    {errors.lastname && (
                      <p className="form-text text-danger">{errors.lastname.message}</p>
                    )}
                  </div>
                </div>
                {/* Email */}
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="form-text text-danger">{errors.email.message}</p>
                  )}
                </div>

                {/* Mobile (optional) */}
                <div className="mb-2">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    id="mobile"
                    type="text"
                    className="form-control"
                    {...register('mobile', {
                      maxLength: { value: 15, message: 'Up to 15 digits' }
                    })}
                  />
                  {errors.mobile && (
                    <p className="form-text text-danger">{errors.mobile.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3 password-inputgroup">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'At least 6 characters' }
                    })}
                  />
                  <span onClick={handleTogglePassword}>
                    <img 
                      src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                      alt={showPassword ? "Hide password" : "Show password"}
                    />
                  </span>
                  {errors.password && (
                    <p className="form-text text-danger">{errors.password.message}</p>
                  )}
                </div>
                <button type="submit" className="login-btn">
                  Register
                </button>
              </form>
              
              <div className="auth-links d-flex flex-column align-items-start mt-3">
                <p className="text-start">
                  Already have an account? <a href="/login">Sign In</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
