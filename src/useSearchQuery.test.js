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
});