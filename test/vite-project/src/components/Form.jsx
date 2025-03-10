import React, { useState } from "react";

function Form() {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  function handleSubmit(e){
    e.preventDefault()
    console.log(name)
  }
  return (
    <div>
      <h1>{name.firstName} {name.lastName}</h1>
      <form action="">
        <label>First Name</label>
        <input
          onChange={(e) => setName({...name,firstName:e.target.value})}
          type="text"
          value={name.firstName}
        />
        <label>Last Name</label>
        <input
          onChange={(e) => setName({...name,lastName:e.target.value})}
          type="text"
          value={name.lastName}
        /> 
        <button onClick={(e)=>handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}

export default Form;
