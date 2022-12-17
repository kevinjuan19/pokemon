export const Button = ({ terpilih, kalimat }) => {
  return (
    <button
      className="rounded bg-indigo-500 text-white p-4 w-full"
      onClick={terpilih}
    >
      {kalimat}
    </button>
  );
};

export const Image = ({ url }) => {
  return <img src={url} className="my-4 mx-auto h-32" alt="gbr" />;
};
export const Paragraf = ({ kalimat }) => {
  return <p className="font-bold text-xl mb-2 text-center">{kalimat}</p>;
};

export const Terpilih = ({ url }) => {
  return (
    <>
      <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>
      <img src={url} className="my-4 mx-auto h-64" alt="gbr" />
    </>
  );
};

export const ListItem = ({ children }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      {children}
    </div>
  );
};
