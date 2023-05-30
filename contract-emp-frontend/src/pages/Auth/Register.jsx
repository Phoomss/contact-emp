import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/user/register", {
        name,
        surname,
        email,
        password,
        role,
        company_id: companyID,
      });

      const data = response.data;

      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setSuccessMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during registration.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Surname:
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="card">Card</option>
            <option value="company">Company</option>
          </select>
        </label>
        <br />
        {role === "card" && (
          <label>
            Company ID:
            <input type="text" value={companyID} onChange={(e) => setCompanyID(e.target.value)} />
          </label>
        )}
        <br />
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p>Error: {errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Register;