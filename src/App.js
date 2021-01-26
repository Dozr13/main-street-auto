import React, { Component } from 'react'
import logo from './mainStreetAuto.svg'
import axios from 'axios'
import './App.css'

// Toast notification dependencies
import { ToastContainer, toast } from 'react-toastify'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      vehiclesToDisplay: [],
      buyersToDisplay: [],
    }

    this.getVehicles = this.getVehicles.bind(this)
    this.getPotentialBuyers = this.getPotentialBuyers.bind(this)
    this.sellCar = this.sellCar.bind(this)
    this.addCar = this.addCar.bind(this)
    this.filterByColor = this.filterByColor.bind(this)
    this.filterByMake = this.filterByMake.bind(this)
    this.addBuyer = this.addBuyer.bind(this)
    this.nameSearch = this.nameSearch.bind(this)
    this.resetData = this.resetData.bind(this)
    this.byYear = this.byYear.bind(this)
    this.deleteBuyer = this.deleteBuyer.bind(this)
  }
  
  getVehicles() {
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles`)
    .then( res => {
      toast.success("Got them vehicular rides")
      this.setState({
        vehiclesToDisplay: res.data
      })
    }).catch( err => {
      toast.error("Dag nab it! Ain't got no more vehicles")
      console.log(err)
    })
  }

  getPotentialBuyers() {
    // axios (GET)
    // setState with response -> buyersToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/buyers`)
    .then( res => {
      toast.success(`Woohoo we got us some potential buyers!`)
      this.setState({
        buyersToDisplay: res.data
      })
    }).catch( err => {
      toast.error(`We got no buyers in the lot!`)
    })
  }
//! Black Diamond ^^^
  sellCar(id) {
    // axios (DELETE)
    // setState with response -> vehiclesToDisplay
    axios.delete(`https://joes-autos.herokuapp.com/api/vehicles/${ id }`)
    .then( res => {
      this.setState({
        vehiclesToDisplay: res.data.vehicles
      })
      toast.success("We sold your car!")
    }).catch( err => {
      console.log(err)
      toast.error(`We didn't sell yo car`)
    })
  }

  filterByMake() {
    let make = this.selectedMake.value
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?make=${ make }`)
    .then( res => {
      toast.success(`Here are your vehicles you've requested`)
      this.setState({
        vehiclesToDisplay: res.data
      })
    }).catch( err => {
      toast.error(`Your make filter didn't work`)
    })

  }
//! Black Diamond ^^^
  filterByColor() {
    let color = this.selectedColor.value
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?color=${ color }`)
    .then( res => {
      toast.success(`Here's the ${ color } cars you wanted to see!`)
      this.setState({
        vehiclesToDisplay: res.data
      })
    }).catch( err => {
      toast.error(`Your color filter didn't work`)
    })
  }
//! Black Diamond ^^^
  updatePrice(priceChange, id) {
    // axios (PUT)
    // setState with response -> vehiclesToDisplay
    axios.put(`https://joes-autos.herokuapp.com/api/vehicles/${ id }/${ priceChange }`)
    .then( res => {
      toast.success(`Successfully moved the price ${ priceChange }`)
      this.setState({
        vehiclesToDisplay: res.data.vehicles
      })
    }).catch( err => {
      console.log( err )
      toast.error("Failed to update price")
    })
  }

  addCar() {
    let newCar = {
      make: this.make.value,
      model: this.model.value,
      color: this.color.value,
      year: this.year.value,
      price: +this.price.value,
    }

    // axios (POST)
    // setState with response -> vehiclesToDisplay
    axios.post(`https://joes-autos.herokuapp.com/api/vehicles`, newCar)
    .then( res => {
      toast.success(`Successfully added your: ${newCar.make} ${newCar.model} to the lot!`)
      this.setState({
        vehiclesToDisplay: res.data.vehicles
      })
    }).catch( err => toast.error(`Sorry we don't want that vehicle.`))
  }

  addBuyer() {
    let newBuyer = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value,
    }
    //axios (POST)
    // setState with response -> buyersToDisplay
    axios.post(`https://joes-autos.herokuapp.com/api/buyers`, newBuyer)
    .then( res => {
      toast.success(`You've got some new buyers at the door, waiting to purchase a new car!`)
      this.setState({
        buyersToDisplay: res.data.buyers
      })
    }).catch( err => {
      toast.error(`Nobody want to buy anything today.`)
    })
  }
//! Black Diamond ^^^
  deleteBuyer(id) {
    // axios (DELETE)
    //setState with response -> buyersToDisplay
    axios.delete(`https://joes-autos.herokuapp.com/api/buyers/${ id }`)
    .then( res => {
      toast.success(`Got rid of a buyer`)
      this.setState({
        buyersToDisplay: res.data.buyers
      })
    }).catch( err => {
      toast.error(`The delete function failed.`)
    })
  }

//! Black Diamond ^^^
  nameSearch() {
    let searchLetters = this.searchLetters.value
    // axios (GET)
    // setState with response -> buyersToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/buyers?name=${ searchLetters }`)
    .then( res => {
      toast.success(`We found a buyer with that name!`)
      this.setState({
        buyersToDisplay: res.data
      })
    }).catch( err => {
      toast.error(`Your search didn't work`)
    })
  }
//! Black Diamond ^^^
  byYear() {
    let year = this.searchYear.value
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?year=${ year }`)
    .then( res => {
      toast.success(`Here are the vehicles we have of the year ${ year }`)
      this.setState({
        vehiclesToDisplay: res.data
      })
    }).catch( err => {
      toast.error(`Your year filter didn't work`)
    })
  }
//! Black Diamond ^^^





  // Do not edit the code below
  resetData(dataToReset) {
    axios
      .get('https://joes-autos.herokuapp.com/api/' + dataToReset + '/reset')
      .then((res) => {
        if (dataToReset === 'vehicles') {
          this.setState({ vehiclesToDisplay: res.data.vehicles })
        } else {
          this.setState({ buyersToDisplay: res.data.buyers })
        }
      })
  }
  // Do not edit the code above

  render() {
    const vehicles = this.state.vehiclesToDisplay.map((v) => {
      return (
        <div key={v.id}>
          <p>Make: {v.make}</p>
          <p>Model: {v.model}</p>
          <p>Year: {v.year}</p>
          <p>Color: {v.color}</p>
          <p>Price: {v.price}</p>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice('up', v.id)}
          >
            Increase Price
          </button>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice('down', v.id)}
          >
            Decrease Price
          </button>

          <button className="btn btn-sp" onClick={() => this.sellCar(v.id)}>
            SOLD!
          </button>

          <hr className="hr" />
        </div>
      )
    })

    const buyers = this.state.buyersToDisplay.map((person) => {
      return (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Phone: {person.phone}</p>
          <p>Address: {person.address}</p>

          <button
            className="btn"
            onClick={() => {
              this.deleteBuyer(person.id)
            }}
          >
            No longer interested
          </button>

          <hr className="hr" />
        </div>
      )
    })

    return (
      <div>
        <ToastContainer />

        <header className="header">
          <img src={logo} alt="" />

          <button
            className="header-btn1 btn"
            onClick={() => this.resetData('vehicles')}
          >
            Reset Vehicles
          </button>

          <button
            className="header-btn2 btn"
            onClick={() => this.resetData('buyers')}
          >
            Reset Buyers
          </button>
        </header>

        <div className="btn-container">
          <button className="btn-sp btn" onClick={this.getVehicles}>
            Get All Vehicles
          </button>

          <select
            onChange={this.filterByMake}
            ref={(selectedMake) => {
              this.selectedMake = selectedMake
            }}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by make
            </option>
            <option value="Suzuki">Suzuki</option>
            <option value="GMC">GMC</option>
            <option value="Ford">Ford</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Dodge">Dodge</option>
            <option value="Chrysler">Chrysler</option>
          </select>

          <select
            ref={(selectedColor) => {
              this.selectedColor = selectedColor
            }}
            onChange={this.filterByColor}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by color
            </option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
          </select>

          <input
            onChange={this.nameSearch}
            placeholder="Search by name"
            type="text"
            ref={(searchLetters) => {
              this.searchLetters = searchLetters
            }}
          />

          <input
            ref={(searchYear) => {
              this.searchYear = searchYear
            }}
            className="btn-sp"
            type="number"
            placeholder="Year"
          />

          <button onClick={this.byYear} className="btn-inp">
            Go
          </button>

          <button className="btn-sp btn" onClick={this.getPotentialBuyers}>
            Get Potential Buyers
          </button>
        </div>

        <br />

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="make"
            ref={(make) => {
              this.make = make
            }}
          />
          <input
            className="btn-sp"
            placeholder="model"
            ref={(model) => {
              this.model = model
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="year"
            ref={(year) => {
              this.year = year
            }}
          />
          <input
            className="btn-sp"
            placeholder="color"
            ref={(color) => {
              this.color = color
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="price"
            ref={(price) => {
              this.price = price
            }}
          />

          <button className="btn-sp btn" onClick={this.addCar}>
            Add vehicle
          </button>
        </p>

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="name"
            ref={(name) => {
              this.name = name
            }}
          />
          <input
            className="btn-sp"
            placeholder="phone"
            ref={(phone) => {
              this.phone = phone
            }}
          />
          <input
            className="btn-sp"
            placeholder="address"
            ref={(address) => {
              this.address = address
            }}
          />

          <button onClick={this.addBuyer} className="btn-sp btn">
            Add buyer
          </button>
        </p>

        <main className="main-wrapper">
          <section className="info-box">
            <h3>Inventory</h3>

            {vehicles}
          </section>

          <section className="info-box">
            <h3>Potential Buyers</h3>

            {buyers}
          </section>
        </main>
      </div>
    )
  }
}

export default App
