import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Navbar.css'; // Import the custom CSS file

const mapContainerStyle = {
  width: '100%',
  height: '190px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function Navbar(props) {
  const [address, setAddress] = useState('');
  const [work, setWork] = useState(''); // Define state for job search

  const [coordinates, setCoordinates] = useState(center); // Define state for coordinates

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleWorkChange = (event) => {
    setWork(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    const geocodeEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeEndpoint);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  const handleWorkSubmit = async (event) => {
    event.preventDefault();
    console.log('Searching for job:', work);
    // Implement your logic for job search here
  };

  return (
    <>
      <h1>HOMEHERO</h1>
      <form className="d-flex mt-3" onSubmit={handleSearchSubmit}>
        <input
          className="form-control me-2"
          type="text"
          value={address}
          onChange={handleAddressChange}
          style={{
            position: "absolute",
            top: "1rem",
            width: "200px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          placeholder="Enter address"
          aria-label="Enter address"
        />
        <button
          className=" btn-outline-success"
          type="submit"
          style={{
            position: "absolute",
            top: "1.2rem",
            width: "100px",
            right: "35rem",
          }}
        >
          Search
        </button>
      </form>

      {/* Second search input and button */}
      <form className="d-flex mt-3" onSubmit={handleWorkSubmit}>
        <input
          className="form-control me-2"
          type="text"
          value={work}
          onChange={handleWorkChange}
          style={{
            position: "absolute",
            top: "1rem",
            width: "200px",
            right: "2.5%",
            height:"35px",
            transform: "translateX(-50%)",
          }}
          placeholder="Search jobs"
          aria-label="Enter job"
        />
        <button
          className=" btn-outline-success"
          type="submit"
          style={{
            position: "absolute",
            top: "1.2rem",
            width: "100px",
            right: "3rem",
            height:"32px",
          }}
        >
          Search
        </button>
      </form>

      <div className="map-container mt-3">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary vertical-navbar">
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{
            position: "absolute",
            top: "40px",
            left: "2rem",
            fontSize: "1.5rem",
          }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/complaints">
                Complaints
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
