import tw from 'twin.macro';
import HeaderForm from '../components/HeaderForm';
import InputForm from '../components/InputForm';
import useAuth from '../hooks/useAuth';
import FormExtra from '../components/FormExtra';
import FormAction from '../components/FormAction';

const FormLogin = tw.form`
my-10 
bg-white 
shadow 
rounded-lg 
p-10
space-y-6
`;

const Container = tw.div`
  my-5 
`;


const SignUp: React.FC = () => {

    const { fieldsSignUp, setSignUpStateForm, signUpStateForm, handleSignUp } = useAuth();




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpStateForm({ ...signUpStateForm, [e.target.id]: e.target.value })
    }





    return (
        <>
            <HeaderForm
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"

            />
            <FormLogin>
                <Container>
                    {
                        fieldsSignUp.map((field: any) => (
                            <InputForm
                                key={field.id}
                                handleChange={handleChange}
                                value={signUpStateForm[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />

                        ))
                    }
                </Container>
                <FormExtra />
                <FormAction
                    text='Sign Up'
                    handleSubmit={handleSignUp}
                />
            </FormLogin>
        </>
    );
};

export default SignUp;