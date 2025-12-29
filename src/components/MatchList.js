import React, { useState, useEffect } from 'react';

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchday, setMatchday] = useState(1);

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.football-data.org/v4/competitions/PL/matches?matchday=${matchday}`,
        {
          headers: {
            'X-Auth-Token': '2eb9f84dd797400eba2da0daac6f02b3', 
          },
        }
      );

      if (!response.ok) {
        throw new Error('Veri çekilemedi! API Anahtarını kontrol et.');
      }

      const data = await response.json();
      setMatches(data.matches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [matchday]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Başlık ve Input Alanı */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#37003c', marginBottom: '15px' }}>Premier Lig Fikstürü</h2>
        <label>Hafta Seçiniz (1-38): </label>
        <input
          type="number"
          min="1"
          max="38"
          value={matchday}
          onChange={(e) => setMatchday(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', width: '60px', textAlign: 'center' }}
        />
      </div>

      {/* Yükleniyor ve Hata Mesajları */}
      {loading && <p style={{textAlign:'center', fontSize:'18px'}}>⏳ Yükleniyor...</p>}
      {error && <p style={{ color: 'red', textAlign:'center' }}>Hata: {error}</p>}

      {/* Maç Listesi */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {matches && matches.map((match) => (
          <div key={match.id} style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            borderRadius: '12px', 
            background: 'white', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            
            {/* Takımlar ve Skor Alanı */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '15px' }}>
              
              {/* Ev Sahibi Takım */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <img 
                  src={match.homeTeam.crest} 
                  alt={match.homeTeam.shortName} 
                  style={{ width: '50px', height: '50px', objectFit: 'contain', marginBottom: '10px' }} 
                />
                <span style={{ fontWeight: 'bold', textAlign: 'center' }}>{match.homeTeam.shortName}</span>
              </div>

              {/* Skor veya Saat */}
              <div style={{ fontSize: '24px', fontWeight: 'bold', padding: '0 15px', color: '#37003c' }}>
                {match.status === 'FINISHED' 
                  ? `${match.score.fullTime.home} - ${match.score.fullTime.away}` 
                  : <span style={{ fontSize: '16px', color: '#666' }}>vs</span>}
              </div>

              {/* Deplasman Takımı */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <img 
                  src={match.awayTeam.crest} 
                  alt={match.awayTeam.shortName} 
                  style={{ width: '50px', height: '50px', objectFit: 'contain', marginBottom: '10px' }} 
                />
                <span style={{ fontWeight: 'bold', textAlign: 'center' }}>{match.awayTeam.shortName}</span>
              </div>
            
            </div>

            {/* Tarih Bilgisi */}
            <div style={{ borderTop: '1px solid #eee', width: '100%', paddingTop: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
              📅 {new Date(match.utcDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' })}
              <br />
              ⏰ {new Date(match.utcDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;