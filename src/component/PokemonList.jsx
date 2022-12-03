export const ListPokemon = ({ children }) => {
  return (
    <div id="pokemon-list" className="grid grid-cols-4 gap-4">
      {children}
    </div>
  );
};
