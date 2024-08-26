import './App.css'; 
import SearchResults from './sections/searchResults';
import ContextProvider from './context/contextProvider';

function App() {
  return (
    <div className="App">

        <ContextProvider>
          <SearchResults></SearchResults>
        </ContextProvider>
        
      </div>
  );
}

export default App;
