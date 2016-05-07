import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import Home from '../../src/components/Home/Home';

function setup(number = 0) {
  const actions = {
    increase: expect.createSpy(),
    decrease: expect.createSpy()
  };

  const component = shallow(
    <Home number={number} {...actions} />
  );

  return {
    actions,
    h1: component.find('h1'),
    buttons: component.find('button'),
    span: component.find('span')
  };
}

describe('Home component', () => {
  it('should display title', () => {
    const { h1 } = setup();
    expect(h1.text()).toEqual('Home');
  });

  it('should display init number', () => {
    const { span } = setup(5566);
    expect(span.text()).toEqual('5566');
  });

  it('first button should call increase', () => {
    const { buttons, actions } = setup();
    buttons.at(0).simulate('click');
    expect(actions.increase).toHaveBeenCalled();
  });

  it('second button should call decrease', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.decrease).toHaveBeenCalled();
  });
});
