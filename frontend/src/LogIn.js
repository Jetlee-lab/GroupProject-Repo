import { useState } from "react";
import ReactDOM from "react-dom";

function MyLogin(){
  const [inputs, setInputs] =useState({});

  const handleInputChange = (event) => {
    const name=event.target.name;
    const value=event.target.value;
    setInputs({...inputs, [name]: value });
    console.log(inputs);

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
    // submit form data here
  }
  return (
    <form onSubmit={handleSubmit}>
<<<<<<< HEAD
<<<<<<< HEAD
      <label>Enter your name
=======
      <label>Enter your name here
>>>>>>> frontend
=======
      <label>Enter your name here
>>>>>>> a244366d6328ee5ce5e0e169939a959c543f6f4d
      <input type="text"
      name="username"
      value={inputs.username}

        onChange={handleInputChange} />
      </label>
      <label>
        Enter your password
        <input type="password"
        name="password"
        value={inputs.password}
        onChange={handleInputChange} />
      </label>
      <label>
        Enter your email
        <input type="email"
        name="email"
        value={inputs.email}
        onChange={handleInputChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}
const root=ReactDOM.createRoot(document.getElementById('root'));

<<<<<<< HEAD
<<<<<<< HEAD
root.render(<MyLogin />);     
=======
root.render(<MyLogin />);     
>>>>>>> frontend
=======
root.render(<MyLogin />);     
>>>>>>> a244366d6328ee5ce5e0e169939a959c543f6f4d
