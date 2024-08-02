import { renderHook, act } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import useSearchQuery from '../useSearchQuery';
import queryString from 'query-string';

const setup = (initialEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries });
  const wrapper = ({ children }) => <Router history={history}>{children}</Router>;
  return { history, wrapper };
};

test('should return the current query parameters', () => {
  const { wrapper } = setup(['/search?name=John&age=30']);
  
  const { result } = renderHook(() => useSearchQuery(), { wrapper });

  expect(result.current[0]).toEqual({ name: 'John', age: '30' });
});

test('should merge new query parameters with existing ones', () => {
  const { wrapper, history } = setup(['/search?name=John&age=30']);
  
  const { result } = renderHook(() => useSearchQuery(), { wrapper });

  act(() => {
    result.current[1]({ name: 'Jane' });
  });

  expect(history.location.search).toBe(queryString.stringify({ name: 'Jane', age: '30' }, { arrayFormat: 'index' }));
});

test('should replace existing query parameters with new ones', () => {
  const { wrapper, history } = setup(['/search?name=John&age=30']);
  
  const { result } = renderHook(() => useSearchQuery(), { wrapper });

  act(() => {
    result.current[1]({ age: '25' });
  });

  expect(history.location.search).toBe(queryString.stringify({ name: 'John', age: '25' }, { arrayFormat: 'index' }));
});
