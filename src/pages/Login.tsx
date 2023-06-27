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
  -space-y-px     
`;


const Login: React.FC = () => {

  const { fields, setLoginState, loginState, handleSubmitLogin } = useAuth();


 

  const handleChange=(e: React.ChangeEvent<HTMLInputElement> )=>{
    setLoginState({...loginState,[e.target.id]:e.target.value})
}





  return (
    <>
      <HeaderForm
         heading="Login to Your Account"
         paragraph="Don't have an account yet? "
         linkName="Signup"
         linkUrl="/signup"
      />
     <FormLogin>
      <Container>
      {
                fields.map((field:any)=>(
                        <InputForm
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
         text='Login'
          handleSubmit={handleSubmitLogin}
      />
    </FormLogin>
    </>
  );
};

export default Login;