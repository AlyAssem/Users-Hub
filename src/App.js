import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from './components/Header/Header';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import EditScreen from './screens/EditScreen/EditScreen';
import Footer from './components/Footer/Footer';

const App = () => {
  const [users, setUsers] = useState([]);

  const handleCreateUser = (user) => {
    user['id'] = uuidv4();
    setUsers([...users, user]);
  };

  const handleEditUser = (user) => {
    const usersList = users.map((u) => {
      if (u.id === user.id) {
        return user;
      } else {
        return u;
      }
    });

    setUsers(usersList);
  };

  return (
    <Router>
      <Header />
      <main>
        <Route path='/' render={() => <HomeScreen users={users} />} exact />

        <Route
          path='/edit/:uid'
          render={(props) => (
            <EditScreen {...props} users={users} onEditUser={handleEditUser} />
          )}
        />

        <Route
          path='/register'
          render={(props) => (
            <RegisterScreen
              onFormSubmit={handleCreateUser}
              onEditClick={handleEditUser}
              history={props.history}
            />
          )}
        />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
