import React from 'react';
import Games from "./components/Games";
import Search from "./components/Search";

function App() {
    return (
        <section className="background">
            <Search/>
            <Games/>
        </section>
    );
}

export default App;
