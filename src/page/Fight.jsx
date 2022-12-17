import React, { useEffect, useState } from "react";

function Fight() {
  const myPokemon = localStorage.getItem("my-pokemon");
  const enemyPokemon = localStorage.getItem("enemy-pokemon");
  const [myPokemonHealth, setMyPokemonHealth] = useState(100);
  const [enemyPokemonHealth, setEnemyPokemonHealth] = useState(100);
  const temp = localStorage.getItem("token");
  const data = JSON.parse(temp);
  const jwtToken = data.token;

  useEffect(() => {
    if (enemyPokemonHealth <= 0) {
      alert(`${myPokemon} menang`);
    } else if (myPokemonHealth <= 0) {
      alert(`${enemyPokemon} menang`);
    }
  }, [enemyPokemonHealth, myPokemonHealth, enemyPokemon, myPokemon]);

  const handleFight = async () => {
    const req = await fetch("https://kobarsept.com/api/fight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        character1: myPokemon,
        character2: enemyPokemon,
        player: data.username,
      }),
    });

    const res = await req.json();

    if (enemyPokemonHealth >= 0 || myPokemonHealth >= 0) {
      if (res.winner === myPokemon) {
        const temp = enemyPokemonHealth - 10;
        setEnemyPokemonHealth(temp);
      } else {
        const temp = myPokemonHealth - 10;
        setMyPokemonHealth(temp);
      }
    }
  };
  return (
    <>
      <div>
        {myPokemon} health: {myPokemonHealth}
      </div>

      <div>
        {enemyPokemon} health: {enemyPokemonHealth}
      </div>
      <button
        onClick={handleFight}
        className="bg-sky-500 px-3 rounded text-white"
      >
        FIGHT !
      </button>
    </>
  );
}

export default Fight;
