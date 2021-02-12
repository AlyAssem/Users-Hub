import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from '../../hooks/useForm';

import './RegisterScreen.scss';

const RegisterScreen = (props) => {
  const { inputs, handleInputChange, handleInputValue } = useForm({
    userName: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    startDate: '',
    birthDate: '',
    department: '',
    status: '',
    profilePhoto: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleRedirect = () => {
    props.history.push('/');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const passError = validatePassword(e.target.password.value);

    setPasswordError(passError);

    if (passError) return;

    handleRedirect();

    const newUser = {
      userName: e.target.userName.value,
      name: e.target.name.value,
      surname: e.target.surname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      startDate: e.target.startDate.value,
      birthDate: e.target.birthDate.value,
      profilePhoto: e.target.profilePhoto.value,
      department: e.target.department.value,
      status: e.target.status.value,
    };
    props.onFormSubmit(newUser);
  };

  const validatePassword = (password) => {
    let error = '';
    let containsUpperLetter = false;
    let containsLowerLetter = false;
    let containsNum = false;

    if (password.length < 8 || password.length > 16) {
      error = 'Password should have between 8 to 16 characters';
    }

    [...password].forEach((char) => {
      const upperChar = char.toUpperCase();
      const lowerChar = char.toLowerCase();
      const numChar = parseInt(char);

      if (numChar) {
        containsNum = true;
      } else if (char === lowerChar) {
        containsLowerLetter = true;
      } else if (char === upperChar) {
        containsUpperLetter = true;
      }
    });

    if (!containsUpperLetter) {
      error = 'Password should contain atleast one uppercase letter';
    }

    if (!containsNum) {
      error = 'Password should contain atleast one number letter';
    }

    if (!containsLowerLetter) {
      error = 'Password should contain atleast one lowercase letter';
    }

    if (password.includes(inputs.birthDate.toString().split(' ')[3])) {
      error = 'Password should not contain the birth year';
    }

    return error;
  };
  return (
    <div className='container register flex'>
      <div className='form register__form card'>
        <h2>SIGN UP</h2>
        {passwordError && (
          <div style={{ color: 'red', margin: '20px 0' }}>
            * {passwordError}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className='flex register__flex'>
            <input
              type='text'
              name='name'
              value={inputs.name}
              onChange={handleInputChange}
              placeholder='Name'
              className='form__input'
              required
            />

            <input
              type='text'
              name='surname'
              value={inputs.surname}
              onChange={handleInputChange}
              placeholder='Surname'
              className='form__input'
              required
            />
          </div>

          <input
            type='text'
            name='userName'
            value={inputs.userName}
            onChange={handleInputChange}
            placeholder='User Name'
            className='form__input form__input--full-width'
            required
          />

          <div className='flex register__flex'>
            <input
              type='email'
              name='email'
              value={inputs.email}
              onChange={handleInputChange}
              placeholder='Email'
              className='form__input'
              required
            />

            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={handleInputChange}
              placeholder='Password'
              className='form__input'
              required
            />
          </div>

          <input
            type='text'
            name='profilePhoto'
            value={inputs.profilePhoto}
            onChange={handleInputChange}
            placeholder='Profile Photo Link'
            className='form__input form__input--full-width'
            required
          />

          <div className='flex register__flex'>
            <div className='flex register__flex register__flex--col register__flex--margin-around'>
              <label htmlFor='department' className='form-label'>
                Start Date
              </label>
              <DatePicker
                name='startDate'
                selected={inputs.startDate}
                onChange={(date) => handleInputValue('startDate', date)}
                isClearable
                placeholderText='Choose a date'
                required
                className='register__dropdown'
              />
            </div>
            <div className='flex register__flex register__flex--col'>
              <label htmlFor='department' className='form-label'>
                Department
              </label>
              <select
                name='department'
                className='register__dropdown'
                value={inputs.department}
                onChange={handleInputChange}
                required
              >
                <option value=''>Choose...</option>
                <option value='software'>Software</option>
                <option value='hardware'>Hardware</option>
                <option value='humanResources'>Human Resources</option>
              </select>
            </div>
          </div>
          <div className='flex register__flex  register__flex--margin-bottom'>
            <div className='flex register__flex register__flex--col'>
              <label htmlFor='department' className='form-label'>
                Birth Date
              </label>
              <DatePicker
                name='birthDate'
                selected={inputs.birthDate}
                onChange={(date) => handleInputValue('birthDate', date)}
                isClearable
                placeholderText='Choose a date'
                required
                className='register__dropdown'
              />
            </div>
            <div className='flex register__flex register__flex--col'>
              <label htmlFor='status' className='form-label'>
                Status
              </label>
              <select
                name='status'
                value={inputs.status}
                onChange={handleInputChange}
                required
                className='register__dropdown'
              >
                <option value=''>Choose...</option>
                <option value='active'>Active</option>
                <option value='notActive'>Not Active</option>
              </select>
            </div>
          </div>
          <input type='submit' value='Sign Up' className='form__btn' />
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
