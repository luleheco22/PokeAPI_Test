import React, { useState } from 'react';
import tw from 'twin.macro';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import styled from 'styled-components';

interface InputFormProps {
  labelText: string;
  value: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  isRequired?: boolean;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Container = tw.div`
  my-6
`;

const Label = tw.label`
  sr-only
`;

const Input = tw.input`
  rounded-md 
  appearance-none 
  relative 
  block 
  w-full 
  px-3 
  py-2 
  border 
  border-gray-300 
  placeholder-gray-500 
  text-gray-900 
  focus:outline-none 
  focus:ring-orange-500 
  focus:border-orange-500 
  focus:z-10 
  sm:text-sm
`;

const ShowPasswordIconOff = styled(BsToggle2Off)`
    ${tw`
        absolute
        text-orange-400
        w-6
        h-6
        mb-3
        cursor-pointer
        transition
    `}
`;
const ShowPasswordIconOn = styled(BsToggle2On)`
    ${tw`
        absolute
        text-orange-400
        mb-3
        w-6
        h-6
        cursor-pointer
        transition
    `}
`;

const InputForm: React.FC<InputFormProps> = ({
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  value,
  handleChange,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <Container>
      <Label htmlFor={labelFor}>{labelText}</Label>
      <Input
        id={id}
        name={name}
        type={inputType}
        required={isRequired}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {type === 'password' && (
        <>
          {inputType === 'password' ? (
            <ShowPasswordIconOff onClick={handleTogglePassword} />
          ) : (
            <ShowPasswordIconOn onClick={handleTogglePassword} />
          )}
        </>
      )}
    </Container>
  );
};

export default InputForm;