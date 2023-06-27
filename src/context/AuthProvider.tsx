/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, createContext, ReactNode, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { loginFields, signupFields } from '../constants/formFields';
import axiosClient from "../config/axiosClient";
import Swal from 'sweetalert2';
import tokenAuth from "../config/tokenAuth";

interface AuthContextData {
    loading: boolean;
    user: any;
    loginState: LoginState;
    signUpStateForm: SignState;
    setLoginState: Dispatch<SetStateAction<LoginState>>;
    setSignUpStateForm: Dispatch<SetStateAction<SignState>>;
    fields: any;
    fieldsSignUp: any;
    handleSubmitLogin: any
    handleSignUp: any
    auth: boolean;
    setAuth: Dispatch<SetStateAction<boolean>>;
    setUser: Dispatch<SetStateAction<any>>;
    signOffAuth: () => void;
}

interface LoginState {
    [key: string]: string;
}

interface SignState {
    [key: string]: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const fields = loginFields;
    const fieldsSignUp = signupFields;
    const navigate = useNavigate()
    const signUpState: SignState = {};
    const initialState: LoginState = {};

    fields.forEach((field: any) => (initialState[field.id] = ""));
    fieldsSignUp.forEach((field: any) => (signUpState[field.id] = ""));

    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [loginState, setLoginState] = useState<LoginState>(initialState);
    const [signUpStateForm, setSignUpStateForm] = useState<SignState>(signUpState);
    const [auth, setAuth] = useState<boolean>(false);


    const handleSignUp = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setLoading(true);
        const { emailAddress, password, confirmPassword, username } = signUpStateForm;

        // Validación de campos vacíos
        if (!emailAddress || !password || !confirmPassword || !username) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
            });
            setLoading(false)
            return;
        }

        // Validación del formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
            });
            setLoading(false)
            return;
        }

        // Validación de la contraseña
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must be at least 6 characters long',
            });
            setLoading(false)
            return;
        }

        // Validación de la confirmación de la contraseña
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Password Mismatch',
                text: 'Password and Confirm Password must match',
            });
            setLoading(false)
            return;
        }

        // Envía la solicitud de registro al backend
        try {
            const { data } = await axiosClient.post('/users/add', {
                email: emailAddress,
                password,
                username
            });
            if (data && !data.create) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    showConfirmButton: false,
                    text: data.msg,
                    timer: 1500
                });
                setLoading(false)
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'User created successfully',
                    showConfirmButton: false,
                    timer: 2500
                });
                setSignUpStateForm(signUpState)
                navigate('/')
                setLoading(false);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: false,
                text: error.response.data.msg,
                timer: 1500
            });
            setLoading(false)
            console.log(error)
        }

    };

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            setLoading(true)
            if (token) {
                tokenAuth(token)
              }
            try {
                const { data } = await axiosClient.get('/auth')
                console.log(data, 'data')
                if (data.user) {
                    console.log(data.user, 'el auth')
                    setUser(data.user)
                    //navigate('/pokemons')
                }
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        authenticateUser()


    }, [])

    const signOffAuth = () => {
        setLoading(true)
        setUser({})
        setAuth(false)
        localStorage.removeItem('token')
        navigate('/')
        setLoading(false)
    }
    const handleSubmitLogin = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setLoading(true)
        const { emailAddress, password } = loginState;

        // Validación de campos vacíos
        if (!emailAddress || !password) {
            // Maneja la validación de campos vacíos según tus necesidades
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
            });
            setLoading(false)
            return;
        }

        // Validación del formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
            });
            setLoading(false)
            return;
        }

        // Validación de la longitud de la contraseña
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password should be at least 6 characters long',
            });
            setLoading(false)
            return;
        }

        try {
            // Envía la solicitud de inicio de sesión al backend
            const { data } = await axiosClient.post('/auth', {
                email:emailAddress,
                password
            });
            if (data && data.login) {
                // Almacenar el token en el almacenamiento local
                localStorage.setItem('token', data.token);

                // Actualiza el estado de autenticación y el usuario actual en el contexto
                // setAuth(true);
                // setUser(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully',
                    showConfirmButton: false,
                    timer: 2500
                });
                console.log(data, 'user')
                navigate('/pokemons/profile');
                setLoading(false)
                // Redirige a la página deseada después del inicio de sesión exitoso

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.msg,
                });
                setLoading(false)
            }
            setLoginState(initialState);
        } catch (error: any) {
            // Manejo de errores
            Swal.fire({
                icon: 'error',
                title: 'Invalid Login',
                text: error?.response?.data.errors[0].msg
            });
            setLoading(false)
            console.log(error?.response?.data.errors[0].msg);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                loginState,
                setLoginState,
                setSignUpStateForm,
                signUpStateForm,
                fields,
                fieldsSignUp,
                handleSubmitLogin,
                handleSignUp,
                user,
                setUser,
                setAuth,
                signOffAuth,
                auth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;