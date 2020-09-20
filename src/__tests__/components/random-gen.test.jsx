import React from 'react';
import { Provider } from 'react-redux';
import immutable from 'immutable';
import { mount } from 'enzyme';
import RandomGen from '../../components/random-gen';

describe('random-gen.jsx', () => {
  let wrapper;
  let mockProps;
  let mockState;
  let mockStore;
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
    mockProps = {
      buttonId: 'mockButtonId',
      isFetchingEpisode: jest.fn(),
      randomEpisodeById: {
        get: jest.fn(),
      },
      updateRandomEpisode: jest.fn(),
    };
    wrapper = mount(
      <Provider store={mockStore}>
        <RandomGen {...mockProps} />
      </Provider>
    )
  });
  test('renders navbar component', () => {
    expect(wrapper.find('.random-gen__button').exists()).toBe(true);
  });
});