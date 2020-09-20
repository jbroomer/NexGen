import React from 'react';
import immutable from 'immutable';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from '../App';

describe('App.jsx', () => {
  let mockStore;
  let mockState;
  let wrapper;
  beforeEach(() => {
    mockState = immutable.fromJS({
      loading: false,
      topRatedById: immutable.Map({}),
      popularById: immutable.Map({}),
      customById: immutable.Map({}),
    });
    mockStore = {
      getState: jest.fn(() => mockState),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    };
    wrapper = mount(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
  });
    
  test('renders without crashing', () => {
    expect(wrapper.find('.app__container').exists()).toBe(true);
  });
  test('renders AppBar Component', () => {
    expect(wrapper.find('AppBar').exists()).toBe(true);
  });
  test('renders Search Component', () => {
    expect(wrapper.find('Search').exists()).toBe(true);
  });
  test('renders results container Component', () => {
    expect(wrapper.find('ResultsContainer').exists()).toBe(true);
  });
})

