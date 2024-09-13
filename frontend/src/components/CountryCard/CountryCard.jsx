import React from 'react';
import countrycardstyle from './CountryCard.module.scss'; 

function CountryCard({ country }) {
  if (!country) return null; 
  
  return (
    <div className={countrycardstyle['country-card']}>
      <div className={countrycardstyle['flag']}>
        <img src={country.flag} alt={`${country.name} flag`} />
      </div>
      <div className={countrycardstyle['details']}>
        <h2 className={countrycardstyle['country-name']}>{country.name}</h2>
        <p className={countrycardstyle['rank']}>Rank: {country.rank}</p>
        {/* <p className={countrycardstyle['continent']}>Continent: {country.continent}</p> */}
      </div>
    </div>
  );
}

export default CountryCard;
