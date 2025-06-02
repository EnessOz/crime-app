import React, { useState, useEffect } from 'react'
//Ün seviyesi eklenecek. Her başarı +10. Her başarısızlık -8. Her 100 ün + %1 ekleyecek.

import chars from '../char.json'
import crimes from '../crime.json'

const CrimePage = () => {
  const [selectedChar, setSelectedChar] = useState(null)
  const [selectedCrime, setSelectedCrime] = useState(null)
  const [successRate, setSuccessRate] = useState(null)

  const handleCharChange = (e) => {
    const tip = e.target.value
    const foundChar = chars.find((c) => c.tip === tip) || null
    setSelectedChar(foundChar)
  }

  const handleCrimeChange = (e) => {
    const isim = e.target.value
    const foundCrime = crimes.find((c) => c.isim === isim) || null
    setSelectedCrime(foundCrime)
  }

  useEffect(() => {
    if (selectedChar && selectedCrime) {
      let totalPoints = 0
      const gereksinimler = selectedCrime.gereksinimler

      if (selectedChar.zeka >= gereksinimler.zeka) totalPoints += 1
      if (selectedChar.ceviklik >= gereksinimler.ceviklik) totalPoints += 1
      if (selectedChar.guc >= gereksinimler.guc) totalPoints += 1
      if (selectedChar.karizma >= gereksinimler.karizma) totalPoints += 1
      if (selectedChar.teknik >= gereksinimler.teknik) totalPoints += 1
      if (selectedChar.sogukkanlilik >= gereksinimler.sogukkanlilik) totalPoints += 1
      if (selectedChar.suc_bilgisi >= gereksinimler.suc_bilgisi) totalPoints += 1

      const oran = (totalPoints / 7) * 100
      setSuccessRate(oran)
    } else {
      setSuccessRate(null)
    }
  }, [selectedChar, selectedCrime])

  const handleCommitCrime = () => {
    if (successRate === null) return

    const probability = successRate / 100
    const random = Math.random()

    if (random < probability) {
      alert('✅ Suç BAŞARIYLA işlendi!')
    } else {
      alert('❌ Suç BAŞARISIZ oldu!')
    }
  }

  return (
    <div className="crime-page-container" style={{ padding: 20 }}>
      <h2>Suçlu Tipi Seç</h2>
      <select value={selectedChar?.tip || ''} onChange={handleCharChange}>
        <option value="">-- Seçiniz --</option>
        {chars.map((char, idx) => (
          <option key={idx} value={char.tip}>
            {char.tip}
          </option>
        ))}
      </select>

      <h2 style={{ marginTop: 20 }}>Suç Seç</h2>
      <select value={selectedCrime?.isim || ''} onChange={handleCrimeChange}>
        <option value="">-- Seçiniz --</option>
        {crimes.map((crime, idx) => (
          <option key={idx} value={crime.isim}>
            {crime.isim}
          </option>
        ))}
      </select>

      {selectedChar && selectedCrime && (
        <div style={{ marginTop: 30 }}>
          <strong>Seçilen Suçlu:</strong> {selectedChar.tip} <br />
          <strong>Seçilen Suç:</strong> {selectedCrime.isim} <br />
          <strong>Başarı Oranı:</strong>{' '}
          {successRate !== null ? `${successRate.toFixed(2)}%` : 'Hesaplanıyor...'}
        </div>
      )}

      <button style={{ marginTop: 20 }} onClick={handleCommitCrime}>
        Suçu İşle
      </button>
    </div>
  )
}

export default CrimePage
