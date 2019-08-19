import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import parseJwt from '../lib/parseJwt';

export default () => {
  const router = useRouter();
  const { id, logout, token } = router.query;
  const [auth, setAuth] = useState(false);
  const [profile, setProfile] = useState(undefined);
  useEffect(() => {
    function getAuth() {
      if (token) {
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('id', id, { expires: 1 });
      }
      if (logout) {
        Cookies.remove('token');
        Cookies.remove('id');
      }
      router.replace('/');
      const isAuth = Cookies.get('token');
      const newProfile = parseJwt(Cookies.get('id'));
      setAuth(!!isAuth);
      setProfile(newProfile);
      return null;
    }
    getAuth();
  }, [id, logout, token]);
  const getSecret = async () => {
    const res = await fetch('/api/data/secret', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });
    const secret = await res.text();
    const newProfile = { ...profile, secret };
    setProfile(newProfile);
  };
  return (
    <>
      <Head>
        <title>Next.js + Node.js + Auth0</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      <main>
        <h1>Next.js + Node.js + Auth0</h1>
        <div className="buttons">
          <button onClick={getSecret}>Tell Me a Secret!</button>
          <Link href={`/api/auth/${!auth ? 'login' : 'logout'}/`}>
            <a>
              <button>{!auth ? 'Login' : 'Logout'}</button>
            </a>
          </Link>
        </div>
        {profile && profile.secret && <p>{profile.secret}</p>}
      </main>
      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};
