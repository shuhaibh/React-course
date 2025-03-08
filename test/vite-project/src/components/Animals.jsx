import React from "react";

function Animals() {
  let animals = ["Cat", "Dog", "Horse"];
  return (
    <div>
      <ul>
        {animals.map((animal) => (
          <li> {animal} </li>
        ))}
      </ul>
    </div>
  );
}

export default Animals;
