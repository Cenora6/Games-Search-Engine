import React from 'react';
import Games from "./components/Games";
import Search from "./components/Search";
import Music from "./components/Music";

function App() {
    return (
        <section className="background">
            <Music/>
            <Search/>
            <Games/>
        </section>
    );
}

export default App;
