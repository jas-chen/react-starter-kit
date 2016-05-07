import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import Repos from '../../src/components/Repos/Repos';

function setup() {
  return shallow(
    <Repos />
  );
}

describe('Repos component', () => {
  const component = setup();

  it('should display title', () => {
    expect(component.find('h1').text()).toEqual('Repos');
  });
});
