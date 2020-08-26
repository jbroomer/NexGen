import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultsCard from '../components/result-card';

configure({ adapter: new Adapter() });

describe('Returns a bootstrap column containing a card with correct tv media', () => {
  let dummyEpisodeProp;
  let wrapper;

  beforeEach(() => {
    dummyEpisodeProp = {
      id: 1,
      name: 'Dummy Name',
      year: 'Dummy Year',
      tvImg: 'Dummy Img',
    };
    wrapper = mount(<ResultsCard episode={dummyEpisodeProp} />);
  });

  it('Mounts component with props', () => {
    expect(wrapper.find('.card-body').length).toEqual(2);
  });
});
