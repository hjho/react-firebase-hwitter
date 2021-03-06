import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import { Redirect } from "react-router-dom";

const AppRouter = ({refreshHwitter, isLogin, hwitter}) => {

    return (
        <Router>
            {isLogin && <Navigation hwitter={hwitter} />}
            <Switch>
            {isLogin ? (
            <div style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
                }}
            >
                <Route exact path="/react-firebase-hwitter">
                    <Home hwitter={hwitter} />
                </Route>
                <Route exact path="/react-firebase-hwitter/profile">
                    <Profile hwitter={hwitter} refreshHwitter={refreshHwitter}/>
                </Route>
            </div>
            ) : (
            <div>
                <Route exact path="/react-firebase-hwitter">
                    <Auth />
                </Route>
                <Redirect from="*" to="/react-firebase-hwitter" />
            </div>
            )}
            </Switch>
        </Router>
    );
};

export default AppRouter;