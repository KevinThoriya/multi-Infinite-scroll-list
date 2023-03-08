import "./App.css";

import InfiniteList from "./InfiniteList";

function App() {
  return (
    <div className="App">
      <h1>Multi Infinite Scroll List</h1>
      <div className="parentContainer">
        <InfiniteList listId={1} />
        <InfiniteList listId={2} />
        <InfiniteList listId={3} />
        <InfiniteList listId={4} />
      </div>
    </div>
  );
}

export default App;
