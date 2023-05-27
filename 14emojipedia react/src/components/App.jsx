import React from "react";
import Entry from "../components/Entry";
import emojipedia from "../emojipedia";

function createdEntry(emojipedia) {
  return (
    <Entry
      key={emojipedia.id}
      emoji={emojipedia.emoji}
      name={emojipedia.name}
      meaning={emojipedia.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(createdEntry)}</dl>
    </div>
  );
}

export default App;
