import expect from 'expect';
import { render } from 'enzyme';
import React from 'react';
import Layout from '../../src/components/Layout/Layout';

const rendomString = Math.round(Math.random() * 1000).toString();

function setup(component) {
  return render(
    <Layout>{component}</Layout>
  );
}

describe('Layout component', () => {
  const component = setup(<h1>{rendomString}</h1>);

  it('should display site name', () => {
    expect(component.find('div').find('div').eq(0).text()).toEqual('React Starter Kit');
  });

  it('should have About link', () => {
    expect(component.find('ul').find('li').eq(0).text()).toEqual('About');
  });

  it('should have Repos link', () => {
    expect(component.find('ul').find('li').eq(1).text()).toEqual('Repos');
  });

  it('should display child component', () => {
    expect(component.find('h1').text()).toEqual(rendomString);
  });
});
