import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';

export const RegisterScreen = () => {

    /*
    {
        name:'Juan Carlos',
        email: 'jcanare2@gmail.com',
        password: 12345',
        password2: 12345'
    }

    */

    const [formValues, handleInputChange] = useForm({
        name: 'Juan Carlos',
        email: 'jcanare2@gmail.com',
        password: '12345',
        password2: '12345'
    });

    const { name, email, password, password2 } = formValues;

    const handlerRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            console.log("Formulario válido");
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            console.log("Name is required");
            return false;
        } else if ( !validator.isEmail( email) ) {
            console.log("Email is Not Valid");
            return false;
        } else if( password !== password2 ){
            console.log("The passwords should be equals");
            return false;
        } else if( password.length < 6 ){
            console.log("Password should be at least 6 Characters!");
            return false;
        }

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <div className="auth__alert-error">
                Hola Mundo
            </div>
            <form onSubmit={handlerRegister}>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Confirm'
                    name='password2'
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button className="btn btn-primary btn-block mb-5"
                    type='submit'
                >
                    Register
    </button>


                <Link
                    to='/auth/login'
                    className="link mt-5"
                >
                    Already registered?

    </Link>
            </form>
        </>
    )
}
