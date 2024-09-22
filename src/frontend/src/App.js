import './App.css';
import Header from './Header'
import Search from './Search'
import Settings from './Settings'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App__Header"><Header /></div>
        <Routes>
          <Route path="/Search" element={<div className="App__Search"><Search /></div>} />
          <Route path="/Settings" element={<div className='App__Settings'><Settings /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
