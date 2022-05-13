#### configs

npm
```sh
npm i eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-prettier prettier -D
```

Configuración del archivo eslintrc.js
```json
module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    semi: ["error", "alwals"],
  },
};
```


Configuración del archivo prettier.config.js
```json
module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 200,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
};
```


Script en package.json
```json
"lint:fix": "eslint src/ --fix"
```


config goncy
```json
module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next',
    'next/core-web-vitals'
  ],
  rules: {
    semi: ['error', 'never'],
    'no-console': 'warn',
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        trailingComma: 'none',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ],
    'react/self-closing-comp': 'warn',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true
      }
    ]
  }
}
```


### npx tailwindcss init -p

postCSS tailwind
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

tailwind.configs.js
```json
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
    },
  },
};
```


#### cambios de tailwind en tiempo real 
.env.local
doc de la api https://api.escuelajs.co/docs/
```js
TAILWIND_MODE=watch
NEXT_PUBLIC_API_URL=https://api.escuelajs.co
NEXT_PUBLIC_API_VERSION=v1
```


#### postcss config
postcss.config.js
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```


#### styles 
tailwind.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```



# Config @decorador
jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@styles/*": ["styles/*"],
      "@components/*": ["components/*"],
      "@public/*": ["public/*"]
    },
  },
}
```


```json
npm i @heroicons/react @headlessui/react
```

Para los que tengan errores cargando las imagenes (como a mi me pasó) recuerden agregar los dominios en el next.config.js
```js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com']
  },
}
```


useAuth
```
npm install js-cookie
npm install axios
```


#Fetch
```js
const options = {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    const response = await fetch(endPoints.auth.login, options).then((res) => res.json());
    const { access_token } = response;

Y para hacer el GET sería así

const options = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };

      const data = await fetch(endPoints.auth.profile, options).then((res) => res.json());```
```

fnFetch
```js
export const makeFetch =(path = "", method = "GET", body = {})=> {
    const access_token = Cookies.get("access_token");
    const options = {
        method,
        headers: {
            accept: "*/*",
            "Content-Type": "application/json",
        },
    };
    if (method !== "GET") {
        options.body = JSON.stringify(body);
    }
    if (access_token) {
        options.headers.Authorization = `bearer ${access_token}`;
    }
    returnfetch(path, options);
};
```

Submit temporal
```js
  const submitHandler =(event)=> {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);

    auth
      .signIn(email, password)
      .then(()=> {
        console.log('Login sucess');
        let actualUrl = window.location.origin;
        let redireccion = actualUrl + '/dashboard';
        window.location.assign(redireccion, 'dashboard');
      })
      .catch((error)=> {
        if (error.response?.status === 401) {
          alert('Usuario o contraseña incorrectos');
        }
      });
  };
```


Modifique un poco el hook de useAuth para que tome el token desde las cookies y obtenga al usuario y pueda ser usado sin necesidad de tener que hacer el login cada que querramos identificar a nuestro usuario. Aca el resultado:

// Libraries
```js
import { useState, useContext, createContext, useEffect, useCallback } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/index';

const AuthContext = createContext();

const useAuthProvider =()=> {
  const [user, setUser] = useState(null);

  /**
   * Function to get the user from the API with the token stored in the cookies
   */
  const fetchUser = useCallback(async ()=> {
    try {
      const token = cookie.get('token');

      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);

        setUser(user);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  const signIn = async(email, password) => {
    try {
      const options = {
        Headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      };

      const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);

      if (access_token) {
        const token = access_token.access_token;
        cookie.set('token', token, { expires: 5 });
      }

      await fetchUser();
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(fetchUser, [fetchUser]);

  return { user, signIn };
};

export const AuthProvider =({ children })=> {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth =()=> {
  return useContext(AuthContext);
};
```



Generate avatars with initials - User Initial avatars
```sh
https://ui-avatars.com/api/?background=random&?size=128&?name=Cheat+Modes4

`https://ui-avatars.com/api/?background=random&?size=${size}&?font-size=${fs}&?rounded=${rBool}`

&?bold=${bBool}
&?color=ff0000 || &?color=${fColor}
&?name=${name}+${surname}
```

```js
```

```js
```