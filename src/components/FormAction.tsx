import React from 'react';
import tw from 'twin.macro';
import useAuth from '../hooks/useAuth';

interface FormActionProps {
  buttonType?: string;
  action?: 'submit' | 'button' | 'reset';
  text: string;
  handleSubmit?: () => void;
}

const Button = tw.button` 
relative 
w-full 
flex 
justify-center 
py-2 
px-4 
border 
border-transparent 
text-sm 
font-medium 
rounded-md 
text-white 
bg-orange-600 
hover:bg-orange-700 
focus:outline-none 
focus:ring-2 
focus:ring-offset-2 
focus:ring-orange-500 
mt-10
`;

const FormAction: React.FC<FormActionProps> = ({
  buttonType = 'button',
  action = 'submit',
  text,
  handleSubmit
}) => {

  // const {handleSubmit} = useAuth()
 

  return (
    <>
      {buttonType === 'button' ? (
        <Button type={action} onClick={handleSubmit}>
          {text}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormAction;