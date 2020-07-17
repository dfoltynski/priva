import React from "react";
import { Switch, Route } from "react-router-dom";

import { RoomDecide, RoomCreate, Nickname, JoinRoom, Chat } from "./components";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={RoomDecide} />
                <Route exact path="/create" component={RoomCreate} />
                <Route exact path="/join" component={JoinRoom} />
                <Route exact path="/your-room" component={Chat} />
                <Route exact path="/nickname" component={Nickname} />
            </Switch>
        </div>
    );
}

export default App;
