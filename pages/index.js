export async function getServerSideProps() {
  const hasKey = Object.prototype.hasOwnProperty.call(process.env, 'ENVARUNO');
  const value = hasKey ? process.env.ENVARUNO ?? '' : '';

  return {
    props: {
      configured: hasKey,
      length: value.length,
    },
  };
}

export default function Home({ configured, length }) {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Hostinger env test</h1>
      <p>Version server-side activa; pagina renderizada en el servidor.</p>
      <p>
        ENVARUNO status: <strong>{configured ? 'configured' : 'missing'}</strong>
      </p>
      {configured ? (
        <p>
          ENVARUNO length: <strong>{length}</strong>
        </p>
      ) : null}
      <p>
        API: <code>/api/envaruno</code>
      </p>
      <p>
        Debug (returns value): <code>/api/envaruno?show=1</code>
      </p>
      <p>
        Usa <code>.env</code> o <code>.env.production</code> en la raiz del proyecto.
      </p>
    </main>
  );
}
