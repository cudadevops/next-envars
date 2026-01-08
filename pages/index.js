import pkg from '../package.json';

const APP_VERSION = pkg.version;
const value = process.env.NEXT_PUBLIC_ENVARUNO;
const status = value === undefined ? 'missing' : value === '' ? 'empty' : 'set';
const displayValue = value === undefined ? '(missing)' : value === '' ? '(empty)' : value;

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Hostinger env test</h1>
      <p>Version estatica: variables NEXT_PUBLIC_ se inyectan en el build.</p>
      <p>
        App version: <strong>{APP_VERSION}</strong>
      </p>
      <p>
        NEXT_PUBLIC_ENVARUNO status: <strong>{status}</strong>
      </p>
      <p>
        NEXT_PUBLIC_ENVARUNO value: <strong>{displayValue}</strong>
      </p>
      <p>Si cambias la variable, debes recompilar y redeployar.</p>
    </main>
  );
}
