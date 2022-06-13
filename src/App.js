import {useState, useEffect} from 'react'

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState('');
  const [submit, setSubmit] = useState('');
  
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = (event) => {
    setDollar(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmit(dollar / Math.floor(coins[event.target[0].value].quotes.USD.price));
  }

  return (
    <div>
     <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
     {loading ? (
          <strong>Loading...</strong>
        ) : (
          <form onSubmit={onSubmit}>
            <select>
              {coins.map((coin, index) => <option value={index} key={index}>{coin.name} - ({coin.symbol}) - ${coin.quotes.USD.price}</option>)}
            </select>
            <hr />
            <input onChange={onChange} value={dollar} type="number"></input><button>Change coin</button>
            <p>{submit}</p>
          </form>
          
        )}
    </div>
  )
}

export default App;
