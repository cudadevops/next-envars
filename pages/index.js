const DEFAULT_ENV_NAME = 'ENVARUNO';

function normalizeName(input) {
  if (Array.isArray(input)) {
    return input[0]?.trim() ?? '';
  }
  if (typeof input === 'string') {
    return input.trim();
  }
  return '';
}

function addVariant(variants, value) {
  if (typeof value !== 'string') {
    return;
  }
  const trimmed = value.trim();
  if (trimmed.length > 0) {
    variants.add(trimmed);
  }
}

function buildVariants(rawName) {
  const variants = new Set();
  const base = rawName.trim();
  const unquoted = base.replace(/^['"]+|['"]+$/g, '');
  const underscored = unquoted.replace(/[\s.-]+/g, '_');

  addVariant(variants, base);
  addVariant(variants, base.toUpperCase());
  addVariant(variants, base.toLowerCase());

  addVariant(variants, unquoted);
  addVariant(variants, unquoted.toUpperCase());
  addVariant(variants, unquoted.toLowerCase());

  addVariant(variants, underscored);
  addVariant(variants, underscored.toUpperCase());
  addVariant(variants, underscored.toLowerCase());

  const prefix = 'NEXT_PUBLIC_';
  const addPrefixed = (value) => {
    if (value.startsWith(prefix)) {
      const withoutPrefix = value.slice(prefix.length);
      addVariant(variants, withoutPrefix);
      addVariant(variants, withoutPrefix.toUpperCase());
      addVariant(variants, withoutPrefix.toLowerCase());
    } else {
      addVariant(variants, `${prefix}${value}`);
    }
  };

  [base, unquoted, underscored].forEach((value) => {
    if (value.length > 0) {
      addPrefixed(value);
      addPrefixed(value.toUpperCase());
      addPrefixed(value.toLowerCase());
    }
  });

  return Array.from(variants);
}

function buildResults(variants) {
  return variants.map((key) => {
    const hasKey = Object.prototype.hasOwnProperty.call(process.env, key);
    const value = hasKey ? process.env[key] ?? '' : '';
    return { key, hasKey, value };
  });
}

function formatValue(item) {
  if (!item.hasKey) {
    return '(missing)';
  }
  if (item.value === '') {
    return '(empty string)';
  }
  return item.value;
}

export async function getServerSideProps({ query }) {
  const inputName = normalizeName(query.name);
  const name = inputName || DEFAULT_ENV_NAME;
  const variants = buildVariants(name);
  const results = buildResults(variants);
  const match =
    results.find((item) => item.hasKey && item.value !== '') ??
    results.find((item) => item.hasKey) ??
    null;

  return {
    props: {
      name,
      results,
      matchKey: match?.key ?? '',
    },
  };
}

export default function Home({ name, results, matchKey }) {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1>Hostinger env test</h1>
      <form method="GET" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <label htmlFor="env-name" style={{ fontWeight: 600 }}>
          Variable
        </label>
        <input
          id="env-name"
          name="name"
          defaultValue={name}
          placeholder="ENVARUNO"
          style={{ flex: 1, padding: '8px 10px' }}
        />
        <button type="submit" style={{ padding: '8px 14px', cursor: 'pointer' }}>
          Probar
        </button>
      </form>
      <p style={{ marginTop: 0 }}>
        Buscando variantes de <strong>{name}</strong> (los nombres son sensibles a mayusculas).
      </p>
      <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Resultados</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {results.map((item) => (
            <li key={item.key} style={{ display: 'flex', gap: 12, padding: '6px 0' }}>
              <code style={{ minWidth: 220 }}>{item.key}</code>
              <span>{formatValue(item)}</span>
              {matchKey === item.key ? <span style={{ color: '#0a6cff' }}>(match)</span> : null}
            </li>
          ))}
        </ul>
      </div>
      <p style={{ marginTop: 12 }}>
        API directa: <code>/api/env?name=ENVARUNO</code>
      </p>
      <p>
        Endpoint fijo: <code>/api/envaruno</code>
      </p>
    </main>
  );
}
