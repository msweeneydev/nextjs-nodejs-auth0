import { useEffect, useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Cookies from 'js-cookie';
import parseJwt from '../lib/parseJwt';

export default withRouter(({ router }) => {
  if (router.query.token) {
    const { id, token } = router.query;
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('id', id, { expires: 1 });
    router.push('/');
  }
  if (router.query.logout) {
    Cookies.remove('token');
    Cookies.remove('id');
    router.push('/logout');
  }
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    function getAuth() {
      const isAuth = Cookies.get('token');
      const newProfile = parseJwt(Cookies.get('id'));
      setAuth(!!isAuth);
      setProfile({ ...newProfile });
    }
    getAuth();
  }, [auth]);
  console.log('AUTH', auth);
  console.log('PROFILE', profile);
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
