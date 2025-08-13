import { useState } from 'react';
import api from '../utils/api';

const SearchBar = ({ onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchUsers = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await api.get(`/users/search?username=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <form onSubmit={searchUsers} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((user) => (
            <button
              key={user._id}
              onClick={() => {
                onUserSelect(user);
                setResults([]);
                setQuery('');
              }}
              className="w-full text-left p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="font-medium">{user.fullName}</div>
              <div className="text-sm text-gray-500">@{user.username}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
