import React, { useState, useEffect } from 'react'
import chars from '../char.json'
import crimes from '../crime.json'
//Succesful mission +10 pt. Fail mission -8 pt. every 100 famous point will add +%1 to success rate.
const CrimePage = () => {
  const [selectedChar, setSelectedChar] = useState(null)
  const [selectedCrime, setSelectedCrime] = useState(null)
  const [successRate, setSuccessRate] = useState(null)

  const handleCharChange = (e) => {
    const type = e.target.value
    const foundChar = chars.find((c) => c.type === type) || null
    setSelectedChar(foundChar)
  }

  const handleCrimeChange = (e) => {
    const name = e.target.value
    const foundCrime = crimes.find((c) => c.name === name) || null
    setSelectedCrime(foundCrime)
  }

  useEffect(() => {
    if (selectedChar && selectedCrime) {
      let totalPoints = 0
      const requirements = selectedCrime.requirements

      if (selectedChar.intelligence >= requirements.intelligence) totalPoints += 1
      if (selectedChar.agility >= requirements.agility) totalPoints += 1
      if (selectedChar.strength >= requirements.strength) totalPoints += 1
      if (selectedChar.charisma >= requirements.charisma) totalPoints += 1
      if (selectedChar.technique >= requirements.technique) totalPoints += 1
      if (selectedChar.composure >= requirements.composure) totalPoints += 1
      if (selectedChar.crime_knowledge >= requirements.crime_knowledge) totalPoints += 1

      const rate = (totalPoints / 7) * 100
      setSuccessRate(rate)
    } else {
      setSuccessRate(null)
    }
  }, [selectedChar, selectedCrime])

  const handleCommitCrime = () => {
    if (successRate === null) return

    const probability = successRate / 100
    const random = Math.random()

    if (random < probability) {
      alert('✅ Crime was SUCCESSFULLY committed!')
    } else {
      alert('❌ Crime FAILED!')
    }
  }

  return (
    <div className="crime-page-container" style={{ padding: 20 }}>
      <h2>Select Criminal Type</h2>
      <select value={selectedChar?.type || ''} onChange={handleCharChange}>
        <option value="">-- Select --</option>
        {chars.map((char, idx) => (
          <option key={idx} value={char.type}>
            {char.type}
          </option>
        ))}
      </select>

      <h2 style={{ marginTop: 20 }}>Select Crime</h2>
      <select value={selectedCrime?.name || ''} onChange={handleCrimeChange}>
        <option value="">-- Select --</option>
        {crimes.map((crime, idx) => (
          <option key={idx} value={crime.name}>
            {crime.name}
          </option>
        ))}
      </select>

      {selectedChar && selectedCrime && (
        <div style={{ marginTop: 30 }}>
          <strong>Selected Criminal:</strong> {selectedChar.type} <br />
          <strong>Selected Crime:</strong> {selectedCrime.name} <br />
          <strong>Success Rate:</strong>{' '}
          {successRate !== null ? `${successRate.toFixed(0)}%` : 'Calculating...'}
        </div>
      )}

      <button style={{ marginTop: 20 }} onClick={handleCommitCrime}>
        Commit Crime
      </button>
    </div>
  )
}

export default CrimePage
