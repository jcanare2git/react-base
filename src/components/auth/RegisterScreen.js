import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui);
    console.log(msgError);
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
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            //Disparar acción de Error al Store
            dispatch(setError("Name is required"));

            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "Name is required",
              })

            return false;
        } else if (!validator.isEmail(email)) {
            //Disparar acción de Error al Store
            dispatch(setError("Email is Not Valid"));

            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "Email is Not Valid",
              })

            return false;
        } else if (password !== password2) {
            //Disparar acción de Error al Store
            dispatch(setError("The passwords should be equals"));

            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "The passwords should be equals",
              })

            return false;
        } else if (password.length < 6) {
            //Disparar acción de Error al Store
            dispatch(setError("Password should be at least 6 Characters!"));

            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: "Password should be at least 6 Characters!",
              })

            return false;
        }

        

        //Disparar acción de Remover Error al Store
        dispatch(removeError());

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

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
