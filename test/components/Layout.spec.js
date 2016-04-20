import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import Layout from '../../src/components/Layout/Layout';

const rendomString = Math.round(Math.random()*1000).toString();

function setup(component) {
  return shallow(
    <Layout>{ component }</Layout>
  );
}

describe('Layout component', () => {
  const component = setup(<h1>{ rendomString }</h1>);

  it('should display logo', () => {
    expect(component.find('div').children().find('div').text()).toEqual('React Starter Kit');
  });

  it('should display child component', () => {
    expect(component.find('h1').text()).toEqual(rendomString);
  });
});
