import React from 'react';
import { FormLabel, FormInput } from 'react-native-elements';

const FormRow = ({ label, name, value, onInputChange, editable = true }) => [
  <FormLabel key={`${name}_label`}>{label}</FormLabel>,
  <FormInput
    key={`${name}input`}
    value={value}
    onChangeText={data => onInputChange(name, data)}
    placeholder={`Please enter ${label.toLowerCase()}...`}
    editable={editable}
  />,
];

export default FormRow;
