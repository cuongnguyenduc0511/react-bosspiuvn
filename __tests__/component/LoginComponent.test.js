import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../../src/app/pages/Login';

describe('Login Page', () => {
    it('should have one logo image', () => {
        const container = shallow(<Login />);
        expect(container.find('img')).toHaveLength(1);
      });
});
