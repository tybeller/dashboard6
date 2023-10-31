import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'

import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';

function App() {
  // make a api call to "https://api.openbrewerydb.org/v1/breweries" to get a list of breweries
  // store the list of breweries in state
  // display the list of breweries
  // add a search bar to filter the list of breweries

  const [breweries, setBreweries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredBreweries, setFilteredBreweries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState([])
  const [type, setType] = useState([])
  const [bD, setBD] = useState([{}])
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    fetch('https://api.openbrewerydb.org/v1/breweries')
      .then((res) => res.json())
      .then((data) => {
        setBreweries(data)
        setIsLoading(false)
        console.log(data)
        getStats(data)
      })
  }, []);

  useEffect(() => {
    setFilteredBreweries(
      breweries.filter((brewery) =>
        brewery.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }
  , [search, breweries]);

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  // create a table for the breweries with their Name, brewery_type, country, state, city, website_url, and phone number.
  // add a search bar to filter the list of breweries by name

  //implement filters to allow users to filter by state and brewery type

  //filter text by name
  const getStats = (data) => {
    const states = []
    const types = []
    //make a json list of states and the count of each type of brewery in its state
    const barData = []



    for (let i = 0; i < data.length; i++) {
      if (!states.includes(data[i].state)) {
        states.push(data[i].state)
      }
      if (!types.includes(data[i].brewery_type)) {
        types.push(data[i].brewery_type)
      }
    }
    setState(states)
    setType(types)

    for (let i = 0; i < states.length; i++) {
      barData.push(
        {
          name: states[i],
          micro: 0,
          regional: 0,
          brewpub: 0,
          large: 0,
          planning: 0,
          bar: 0,
          contract: 0,
          proprietor: 0,
          closed: 0
        }
      )
    }
  
    for (let i = 0; i < data.length; i++) {
      // for each brewery, find the state in the barData and add 1 to the corresponding type
      for (let j = 0; j < barData.length; j++) {
        if (data[i].state === barData[j].name) {
          switch (data[i].brewery_type) {
            case "micro":
              barData[j].micro += 1
              break;
            case "regional":
              barData[j].regional += 1
              break;
            case "brewpub":
              barData[j].brewpub += 1
              break;
            case "large":
              barData[j].large += 1
              break;
            case "planning":
              barData[j].planning += 1
              break;
            case "bar":
              barData[j].bar += 1
              break;
            case "contract":
              barData[j].contract += 1
              break;
            case "proprietor":
              barData[j].proprietor += 1
              break;
            case "closed":
              barData[j].closed += 1
              break;
            default:
              break;
          }
        }
      }
    }
    setBD(barData)
  }

  const filterByState = (state) => {
    setFilteredBreweries(
      breweries.filter((brewery) =>
        brewery.state.toLowerCase().includes(state.toLowerCase())
      )
    )
  }

  const filterByType = (type) => {
    setFilteredBreweries(
      breweries.filter((brewery) =>
        brewery.brewery_type.toLowerCase().includes(type.toLowerCase())
      )
    )
  }

  const filterByName = (name) => {
    setSearch(name)
  }

  const handleRowClick = (id) => {
    navigate(`/${id}`);
  }

  
  

  return (
    <>
    <div className="App">
      <h1>BIG BREW</h1>
      <div className="stats-holder">
        <h2>We are tracking {type.length} different types of breweries in {state.length} states for a total of {breweries.length} breweries</h2>
        <p>Number of Breweries in Query: {filteredBreweries.length}</p>
      </div>
      <div className="filter-holder">
        <input 
          type="text" 
          placeholder="Search by name..." 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select onChange={(e) => filterByState(e.target.value)}>
          Map by State
          <option value="">State</option>
          {state.map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
        <select onChange={(e) => filterByType(e.target.value)}>
          Map by Type
          <option value="">Type</option>
          {type.map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>

      
      </div>
      <div className="table-holder">
        <BarChart className='barChart' width={1100} height={500} data={bD}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="micro" fill="#8884d8" />
          <Bar dataKey="regional" fill="#82ca9d" />
          <Bar dataKey="brewpub" fill="#FF0000" />
          <Bar dataKey="large" fill="#0000FF" />
          <Bar dataKey="planning" fill="#00FF00" />
          <Bar dataKey="bar" fill="#FFFF00" />
          <Bar dataKey="contract" fill="#FF00FF" />
          <Bar dataKey="proprietor" fill="#00FFFF" />
          <Bar dataKey="closed" fill="#000000" />

        </BarChart>
      </div> 
      <div className="table-holder">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Website</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredBreweries.map((brewery) => (
              <tr key={brewery.id} onClick={() => handleRowClick(brewery.id)}>
                <td key="name">{brewery.name}</td>
                <td key="type">{brewery.brewery_type}</td>
                <td key="country">{brewery.country}</td>
                <td key="state">{brewery.state}</td>
                <td key="city">{brewery.city}</td>
                <td key="website">{brewery.website_url}</td>
                <td key="phone">{brewery.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

      
    </>
  )
}

export default App
