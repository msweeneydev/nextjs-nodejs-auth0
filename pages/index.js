import { useEffect, useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';

export default withRouter(({ router }) => {
  if (router.query.token) {
    const { id, token } = router.query;
    Cookies.set('token', token);
    router.push('/');
  }
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  const [auth, setAuth] = useState([]);
  useEffect(() => {
    async function getAuth() {
      const isAuth = Cookies.get('token');
      setAuth(!!isAuth);
    }
    getAuth();
  }, []);
  console.log(auth);
  return (
    <main>
      <h1>Hello World</h1>
      <Link href={`/api/auth/${!auth ? 'login' : 'logout'}/`}>
        <a>
          <button>{!auth ? 'Login' : 'Logout'}</button>
        </a>
      </Link>
      <Link href="/api/data/secret/">
        <a>
          <button>Secret Data</button>
        </a>
      </Link>
    </main>
  );
});
