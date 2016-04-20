import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Hello from '../../src/components/Hello/Hello';

const rendomString = Math.round(Math.random()*1000).toString();

function setup(name) {
  return shallow(
    <Hello name={name} />
  );
}

describe('Hello component', () => {
  it('should display name', () => {
    const component = setup(rendomString);
    expect(component.find('div').text()).toEqual(`Hello ${rendomString}!`);
  });
});
