import "./App.css";

import InfiniteList from "./InfiniteList";

function App() {
  return (
    <div className="App">
      <h1>Multi Infinite Scroll List</h1>
      <div className="parentContainer">
        <InfiniteList />
        <InfiniteList />
        <InfiniteList />
        <InfiniteList />
      </div>
    </div>
  );
}

export default App;
