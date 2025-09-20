import { SearchBox } from '@mapbox/search-js-react';

const MyComponent = () => {
  return (
    <div>
    <SearchBox
      accessToken='pk.eyJ1IjoiZGhydXZpc2hhaCIsImEiOiJjbTdhbDNza2MwNW9rMnJzOWo3bXB5NHByIn0.ZWMHw6TzsGB0o48eFmf8WQ'
      options={{
        language: 'en',
        country: 'IN'
      }}
    />
    </div>
  )
}

export default MyComponent