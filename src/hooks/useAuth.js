import React from "react";
import Cookie from "js-cookie";
import axios from "axios";
import endPoints from "@services/api"


/* It's creating a context object. */
const AuthContext = React.createContext();

/** //? ()=> Provider
 * The ProviderAuth function is a wrapper for the AuthContext.Provider component.
 * @returns The ProviderAuth component is being returned.
 */
export const ProviderAuth =({ children })=> {
  const auth = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * It returns the value of the AuthContext.Provider component
 */ 
export const useAuth =()=> React.useContext(AuthContext);

// |$| autenticacion    
/** //! ()=> Le Authentication
 * It's a function that returns an object with two properties: user and signIn
 * @returns An object with two properties: user and signIn.
 */
const useProvideAuth =()=> {
  const [user, setUser] = React.useState(null);

  /**
   * It's sending a post request to the login endpoint 
   * with the email and password as the body and then
   * setting a cookie with the name `token` and the 
   * value of `access_token.access_token` and it expires
   * in 4 days.
   * </code>
   * @param email - It's the email of the user.
   * @param password - It's the password of the user.
   */
  const signIn = async(email, password)=> {
    if (email=="rodri@dev.com" && password=="dev") { //!<- fake user
      return setUser({ email: 'rodri@dev.com',
        name: 'RodriDev', department: 'Owner',
        title: 'Developer', role: 'LeCreator',
      })
    };

    /* It's an object with a property called Headers 
    and it's value is an object with two properties:
    accept and Content-Type. */
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    /*  It's destructuring the data property from 
    the response object and assigning it to the variable
    access_token. */
    const { data: access_token } = await axios.post(
      endPoints.auth.login, { email, password }, options,
    );

    /* It's setting a cookie with the name `token` and 
    the value of `access_token.access_token` and it
    expires in 4 days. */
    if(access_token) {
      const token = access_token.access_token;
      Cookie.set( 'token', access_token.access_token, { expires: 4 });

      /* It's setting the Authorization header to the value 
      of `Bearer ` and then it's sending a get request to the
      profile endpoint and then it's destructuring the data 
      property from the response object and assigning it to 
      the variable user and then it's logging the user to 
      the console and then it's setting the user state to the
      value of user. */
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      console.log(user);
      setUser(user);
    };
  };

  /* It's returning an object with two properties: user and signIn. */
  return { user, signIn, };
};