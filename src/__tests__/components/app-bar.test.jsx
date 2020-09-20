import React from 'react';
import { mount } from 'enzyme';
import AppBar from '../../components/app-bar';
import resultTypes from '../../components/utils/resultTypeMap';

describe('app-bar.jsx', () => {
  let wrapper;
  let mockSearchHandler;
  beforeEach(() => {
    mockSearchHandler = jest.fn()
    wrapper = mount(<AppBar searchHandler={mockSearchHandler} />)
  });
  test('renders navbar component', () => {
    expect(wrapper.find('Navbar').exists()).toBe(true);
  });
  test('clicking popular calls searchHandler', () => {
    wrapper.find('a.popular').simulate('click');
    expect(mockSearchHandler).toHaveBeenCalledWith(resultTypes.popular);
  });
  test('clicking topRated calls searchHandler', () => {
    wrapper.find('a.topRated').simulate('click');
    expect(mockSearchHandler).toHaveBeenCalledWith(resultTypes.topRated);
  });
});