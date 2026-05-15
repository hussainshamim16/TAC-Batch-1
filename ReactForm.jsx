import React, { useState } from 'react';

function RegisterForm() {
  // 1. Ek hi object mein saari fields define kar dein
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'developer' // Default value select box ke liye
  });

  // 2. Single handler function jo sab inputs ko handle karega
  const handleChange = (event) => {
    // event.target se 'name' aur 'value' ko nikaalna (Destructuring)
    const { name, value } = event.target;

    // State ko update karna smart tarike se
    setFormData((prevData) => ({
      ...prevData,      // Purani saari fields copy hongi (Spread Operator)
      [name]: value     // Sirf wo field badlegi jis ka 'name' match karega (Computed Property)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Form Data Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      
      {/* Input 1: Username */}
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" // State ki key se match hona chahiye
          value={formData.username} 
          onChange={handleChange} 
        />
      </div>

      {/* Input 2: Email */}
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" // State ki key se match hona chahiye
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>

      {/* Input 3: Password */}
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
        />
      </div>

      {/* Input 4: Select Dropdown (Yeh bhi isi tarah handle hoga) */}
      <div>
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <button type="submit">Submit Data</button>
    </form>
  );
}

export default RegisterForm;
