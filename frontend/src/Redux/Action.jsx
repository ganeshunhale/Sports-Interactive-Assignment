import {SELECTEDCOUNTRY,ALLCOUNTRIES} from "./type"


export const SelectedCountry = (data) => {
    return {
      type: SELECTEDCOUNTRY,
      data: data,
    };
  };
export const GetAllCountries = (data) => {
    return {
      type: ALLCOUNTRIES,
      data: data,
    };
  };
  