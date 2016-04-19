import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Hello from '../../src/components/Hello/Hello';

function setup(name) {
  return shallow(
    <Hello name={name} />
  );
}

describe('Hello component', () => {
  it('should display name', () => {
    const component = setup('Jas Chen');
    expect(component.find('div').text()).toMatch(/^Hello Jas Chen!$/);
  })
})
