export async function getServerSideProps() {
  return {
    props: {
      value: process.env.ENVARUNO ?? '',
    },
  };
}

export default function Home({ value }) {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Hostinger env test</h1>
      <p>
        ENVARUNO: <strong>{value || '(empty)'}</strong>
      </p>
      <p>
        API: <code>/api/envaruno</code>
      </p>
    </main>
  );
}
