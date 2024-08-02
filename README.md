# use-search-query [![Build Status](https://travis-ci.com/cparram/use-search-query.svg?branch=master)](https://travis-ci.com/cparram/use-search-query)
Hook to control search query changes

## Installation

To install this package in your React project, run the following command:

```
npm install use-search-query
```

## Usage

After installation, you can use the `useSearchQuery` hook in your components to manage and control search query changes. Here is an example:

```javascript
import useSearchQuery from 'use-search-query';

function SearchComponent() {
  const [query, setQuery] = useSearchQuery();

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

This will allow you to synchronize the search query with the component state seamlessly.
