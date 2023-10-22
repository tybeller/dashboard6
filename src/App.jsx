import { useState, useEffect } from 'react'
import './App.css'

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

  useEffect(() => {
    setIsLoading(true)
    fetch('https://api.openbrewerydb.org/v1/breweries')
      .then((res) => res.json())
      .then((data) => {
        setBreweries(data)
        setIsLoading(false)
        console.log(data)
        getStates(data)
        getTypes(data)
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
  const getStates = (data) => {
    const states = []
    for (let i = 0; i < data.length; i++) {
      if (!states.includes(data[i].state)) {
        states.push(data[i].state)
      }
    }
    setState(states)
  }
  const getTypes = (data) => {
    const types = []
    for (let i = 0; i < data.length; i++) {
      if (!types.includes(data[i].brewery_type)) {
        types.push(data[i].brewery_type)
      }
    }
    setType(types)
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
              <tr key={brewery.id}>
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
