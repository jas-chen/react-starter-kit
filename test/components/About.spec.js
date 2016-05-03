import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import About from '../../src/components/About/About';

function setup() {
  return shallow(
    <About />
  );
}

describe('About component', () => {
  const component = setup();

  it('should display child component', () => {
    expect(component.find('h1').text()).toEqual('About');
  });
});
