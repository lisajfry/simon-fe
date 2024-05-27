import React, { useEffect, useState } from 'react';

const CountryForm = () => {
    const [countries, setCountries] = useState({});
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        // Fetch data from the API
        fetch('https://api.first.org/data/v1/countries')
            .then(response => response.json())
            .then(data => {
                setCountries(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div>
            <h1>Select a Country</h1>
            <form>
                <label htmlFor="country">Country: </label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">--Select a country--</option>
                    {Object.keys(countries).map(code => (
                        <option key={code} value={code}>
                            {countries[code].country}
                        </option>
                    ))}
                </select>
            </form>

            {selectedCountry && (
                <div>
                    <h2>Selected Country Details</h2>
                    <p>Country: {countries[selectedCountry].country}</p>
                    <p>Region: {countries[selectedCountry].region}</p>
                </div>
            )}
        </div>
    );
};

export default CountryForm;
