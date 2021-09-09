import React, { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
// import Login from './Login';
import Portal from './Portal';

type User =  {
  attributes: {
    email: string
  }
} | null
type GlobalContextType = {
  user:User
}
export const GlobalContext = React.createContext<GlobalContextType>({
  user: null
});

function App() {
  const [user, setUser] = useState<User>(null);
  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);


  // if (user)
  return (
    <GlobalContext.Provider value={{
      user: user
    }}>
      <Portal />
    </GlobalContext.Provider >
  )
  // else
  //   return <Login />
  // return (
  //     <p>User: {user ? JSON.stringify(user.attributes) : 'None'}</p>
  //     {user ? (
  //       <button onClick={() => Auth.signOut()}>Sign Out</button>
  //     ) : (
  //       <Login/>
  //   <Button 
  //   variant="contained"
  //   color="primary"
  //   className={classes.button}
  //   startIcon={<FacebookIcon />}
  //   onClick={() => {
  //     //@ts-ignore
  //     Auth.federatedSignIn({ provider: 'Facebook' })
  //   }}>
  //     Facebook Login
  //   </Button>
  // )}    
  // );
}

export default App;