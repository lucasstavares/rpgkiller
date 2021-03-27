import './App.css';
import PlayerCard from './player-card'

function App() {

  const players = [
    {
      name: 'daniel',
      role: 'master',
      bars: [],
      img: ''
    },
    {
      name: 'lucas',
      role: 'player',
      bars: [],
      img: ''
    },
    {
      name: 'mateus',
      role: 'player',
      bars: [],
      img: ''
    }
  ]


  return (
    <div className="App">
      <section className="table-players-container">
        {players.map(player => {
          return <PlayerCard name={player.name} role={player.role} bars={player.bars} img={player.img}/>
        })}
        
      </section>
    </div>
  );
}

export default App;
