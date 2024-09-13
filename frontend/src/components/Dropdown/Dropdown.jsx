import React, { useEffect, useState } from 'react'
import { GETCOUNTRIES, GETCOUNTRYBYID } from '../../../API/ApiService'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllCountries, SelectedCountry } from '../../Redux/Action'
import { Select } from 'antd'
import style from './Dropdown.module.scss'
const Dropdown = () => {
  
  // const [countries, setCountries] = useState([])
  const [selectedOption, setSelectedOption] = useState([])
  const dispatch = useDispatch()
  const getAllCountries=useSelector(state=>state?.allCountries)

  useEffect(() => {
    
    (async () => {
      try {
        const getSelectedCountry = await GETCOUNTRYBYID(selectedOption)
       
        dispatch(SelectedCountry(getSelectedCountry.data))
        
      } catch (error) {
        console.log(error);
      }
    })()
  }, [selectedOption])

  useEffect(() => {
    (async () => {
      try {
        const getCountries = await GETCOUNTRIES()
      dispatch(GetAllCountries(getCountries.data))
        // setCountries(getCountries.data)
      } catch (error) {

      }
    })()
  }, [])
  return (
    <div className={style.dropdowncontainer}>
      <Select
        value={selectedOption}
        onChange={(value) => setSelectedOption(value)}
        placeholder="Select a continent"
        style={{ width: '100% '}}
      >
        {getAllCountries.map(options => (
          <Select.Option key={options.id} value={options.id}>
            {options.name}
          </Select.Option>
        ))}
      </Select>
      
    </div>
  )
}

export default Dropdown