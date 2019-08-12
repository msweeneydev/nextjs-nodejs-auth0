import Link from 'next/link';

export default () => (
  <main>
    <h1>Hello World</h1>
    <Link href="/api/auth/login/">
      <a>
        <button>Login</button>
      </a>
    </Link>
    <Link href="/api/auth/logout/">
      <a>
        <button>Logout</button>
      </a>
    </Link>
    <Link href="/api/data/secret/">
      <a>
        <button>Secret Data</button>
      </a>
    </Link>
  </main>
);
