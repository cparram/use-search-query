import { renderHook, act } from '@testing-library/react-hooks';
import useSearchQuery from './useSearchQuery';

describe('useSearchQuery', () => {
  it('should initialize with empty query', () => {
    const { result } = renderHook(() => useSearchQuery());
    expect(result.current[0]).toBe('');
  });

  it('should update query when setQuery is called', () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current[1]('test-query');
    });
    expect(result.current[0]).toBe('test-query');
  });

  it('should keep the same query if no changes occur', () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current[1]('same-query');
    });
    expect(result.current[0]).toBe('same-query');
    act(() => {
      result.current[1]('same-query');
    });
    expect(result.current[0]).toBe('same-query');
  });

  it('should synchronize query with URL changes', () => {
    // Assuming we have a mock implementation for URL changes
    const { result } = renderHook(() => useSearchQuery('initial-query'));
    act(() => {
      // Simulate a URL change
      window.history.pushState({}, 'Test Title', '/?query=updated-query');
      result.current[1]('updated-query');
    });
    expect(result.current[0]).toBe('updated-query');
  });

  it('should handle different input types', () => {
    const { result } = renderHook(() => useSearchQuery());
    act(() => {
      result.current[1](123);
    });
    expect(result.current[0]).toBe('123');
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toBe('');
    act(() => {
      result.current[1](undefined);
    });
    expect(result.current[0]).toBe('');
  });
});