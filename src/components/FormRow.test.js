import React from 'react';
import { FormLabel, FormInput } from 'react-native-elements';

import FormRow from './FormRow';

describe('FormRow component test', () => {
    it('should render props correctly', () => {
        const mockCallback = jest.fn();

        const wrapper = shallow(
            <FormRow
                label="label"
                name="name"
                value="value"
                editable={false}
                onInputChange={mockCallback}
            />
        ).at(0);

        const rowLabel = wrapper.find(FormLabel);
        const rowInput = wrapper.find(FormInput);

        expect(rowLabel.prop('children')).toEqual('label');
        expect(rowLabel.key()).toEqual('name_label');

        expect(rowInput.key()).toEqual('name_input');
        expect(rowInput.prop('value')).toEqual('value');
        expect(rowInput.prop('placeholder')).toEqual('Please enter label...');
        expect(rowInput.prop('editable')).toEqual(false);

        rowInput.simulate('changeText', 'abcd');
        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe('name');
        expect(mockCallback.mock.calls[0][1]).toBe('abcd');

        expect(wrapper).toMatchSnapshot();
    });

    it('should default editable to true', () => {
        const wrapper = shallow(
            <FormRow label="label" name="name" value="value" />
        ).at(0);

        const rowInput = wrapper.find(FormInput);
        expect(rowInput.prop('editable')).toEqual(true);
    });
});
