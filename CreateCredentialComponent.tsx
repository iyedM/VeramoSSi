import React, { useEffect, useState } from 'react';
// Adjust the import path as necessary
import { createCredential } from './create-credential';
import  createIdentifier  from './create-identifier';

function CreateCredentialComponent() {
//did
const [identifier, setIdentifier] = useState<any>(null);
useEffect(() => {
    const fetchData = async () => {
      try {
        const newIdentifier = await createIdentifier();
        setIdentifier(newIdentifier);
      } catch (error) {
        console.error('Error creating identifier:', error);
      }
    };
    fetchData();

});
// end creation did
  const [you, setYou] = useState('');
  const [driver, setDriver] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [credentialOutput, setCredentialOutput] = useState('');

  const handleCreateCredential = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const verifiableCredential = await createCredential(you, driver, weight, date);
      setCredentialOutput(`New credential created:\n${JSON.stringify(verifiableCredential, null, 2)}`);
    } catch (error) {
        const errorMessage = (error as Error).message;
      console.error('Error creating credential:', errorMessage);
      setCredentialOutput(`Error creating credential: ${errorMessage}`);
    }
  };

  return (
    <div>
        <div>
      <h1>Your DID</h1>
      {identifier && (
        <pre>{JSON.stringify(identifier, null, 2)}</pre>
      )}
    </div>
      <h1>Create Credential</h1>
      <form onSubmit={handleCreateCredential}>
        <label htmlFor="you">Your Name:</label>
        <input type="text" id="you" value={you} onChange={(e) => setYou(e.target.value)} required /><br /><br />
        
        <label htmlFor="driver">Driver Name:</label>
        <input type="text" id="driver" value={driver} onChange={(e) => setDriver(e.target.value)} required /><br /><br />
        
        <label htmlFor="weight">Weight:</label>
        <input type="text" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required /><br /><br />
        
        <label htmlFor="date">Date (DD-MM-YYYY):</label>
        <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br /><br />
        
        <button type="submit">Create Credential</button>
      </form>

      {credentialOutput && <pre>{credentialOutput}</pre>}
    </div>
  );
}

export default CreateCredentialComponent;
