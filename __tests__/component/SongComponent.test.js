import React from 'react';
import { shallow, mount } from 'enzyme';
import Song from '../../src/app/pages/Song';


describe('Song Page', () => {
    it('should have only 1 h1 header', () => {
        const wrapper = shallow(<Song />);
        expect(wrapper.find('h1')).toHaveLength(1);
      });

      it('should have only 1 <p> tag', () => {
        const wrapper = shallow(<Song />);
        expect(wrapper.find('p')).toHaveLength(1);
      });

      it('header should have content: Song Page', () => {
        const wrapper = shallow(<Song />);
        expect(wrapper.find('h1').text()).toEqual('Song Page');
      });

      it('p should have content: This is song page content', () => {
        const wrapper = shallow(<Song />);
        expect(wrapper.find('p').text()).toEqual("This is song page content");
      });
});
