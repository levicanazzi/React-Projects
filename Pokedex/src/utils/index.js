export const typeHandler = (types, pokemonData) => {
  if (types[1]) {
    return (
      types[0].type.name.charAt(0).toUpperCase() +
      types[0].type.name.substr(1) +
      " | " +
      types[1].type.name.charAt(0).toUpperCase() +
      types[1].type.name.substr(1)
    );
  }
  return (
    types[0].type.name.charAt(0).toUpperCase() + types[0].type.name.substr(1)
  );
};

export const nameFirstLetter = (pokemonData) => {
  return pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.substr(1);
};
