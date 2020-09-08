import React, {
  useState,
  useEffect
} from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Explore from "./pages/Explore";
import Filter from "./pages/Filter";
import Learn from "./pages/Learn";
import Contribute from "./pages/Contribute";
import Account from "./pages/Account";
import BottomNavigation from "./components/navigation/BottomNavigation";
import axios from 'axios'
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Splash from './pages/Splash';

const getToilets = (setStateFunction) => {
  axios.get('/api/allToilets')
    .then(response => {
      setStateFunction(response.data)
    })
}

export const filterToilets = (allToilets, selectedFilterTags) => {
  let requiredVals = []
  Object.keys(selectedFilterTags).forEach(key => {
    if (selectedFilterTags[key]) {
      requiredVals.push(key)
    }
  });
  if (requiredVals.length === 0) {
    return allToilets
  }
  let resArr = allToilets.filter(x => x.tags.includes(...requiredVals))
  return resArr
}

export default function App() {
  const [allToilets, setToilets] = useState([])
  const [refreshToilets, setRefreshToilets] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const [selectedFilterTags, setSelectedFilterTags] = useState(
    {
      baby: false,
      wheelchair: false,
      squat: false,
      urinal: false,
      electric: false,
      regular: false
    }
  )
  useEffect(() => {
    getToilets(setToilets)
    setRefreshToilets(false);
  }, [selectedFilterTags, refreshToilets, authenticatedUser])

  useEffect(() => {
    if (!authenticatedUser) {
      axios.get('/api/users/refresh')
        .then(response => {
          setAuthenticatedUser({
            name: response.data.name,
            email: response.data.email
          })
        })
        .catch(error => {
          // No currently logged in user, via cookies
        })
    }
  })

  return (
    <div className="container">
      <Switch>
        <PrivateRoute path="/explore" user={authenticatedUser}>
          <Explore toilets={filterToilets(allToilets, selectedFilterTags)} />
        </PrivateRoute>
        <PrivateRoute path="/filter" user={authenticatedUser}>
          <Filter
            selectedFilterTags={selectedFilterTags}
            setSelectedFilterTags={setSelectedFilterTags}
          />
        </PrivateRoute>
        <PrivateRoute path="/learn" user={authenticatedUser}>
          <Learn />
        </PrivateRoute>
        <PrivateRoute path="/contribute" user={authenticatedUser}>
          <Contribute
            toilets={allToilets} 
            currentUser={authenticatedUser}
            setRefreshToilets={setRefreshToilets}
          />
        </PrivateRoute>
        <PrivateRoute path="/account" user={authenticatedUser}>
          <Account user={authenticatedUser} />
        </PrivateRoute>
      </Switch>
      <Route exact path="/">
        <Splash />
      </Route>
      <Route path="/login" >
        <Login
          authenticatedUser={authenticatedUser}
          setAuthenticatedUser={setAuthenticatedUser}
        />
      </Route>
      <Route path="/register">
        <Register
          authenticatedUser={authenticatedUser}
          setAuthenticatedUser={setAuthenticatedUser}
        />
      </Route>
      <Route path="/(explore|filter|learn|contribute|account)">
        <BottomNavigation />
      </Route>
    </div>
  );
}
