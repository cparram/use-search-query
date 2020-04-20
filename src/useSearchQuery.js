import { useCallback } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import queryString from 'query-string';

/**
 * @description Hook used to manage location path queries.
 * @example
 * const [search, mergeQuery] = useSearchQuery();
 * @returns {Array} The Hook values.
 */
function useSearchQuery() {
  let history = useHistory();
  let location = useLocation();
  const currentQuery = queryString.parse(location.search, {
    arrayFormat: 'index',
  });

  /**
   * Updates current filter.
   *
   * @param {object} filter - The new filter overrides.
   * @returns {undefined}
   */
  const mergeQuery = useCallback((filter = {}) => {
    history.push({
      pathname: '/',
      search: queryString.stringify({
        ...currentQuery,
        ...filter,
      }, { arrayFormat: 'index' }),
    });
  }, [history, currentQuery]);

  return [currentQuery, mergeQuery];
}

export default useSearchQuery;
