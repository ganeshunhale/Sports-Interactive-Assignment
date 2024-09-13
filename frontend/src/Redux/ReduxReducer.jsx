import {SELECTEDCOUNTRY,ALLCOUNTRIES} from "./type"



const initialState ={
    selectedCountry:{},
    allCountries:[]

}
const ReduxReducer=(state=initialState,action)=>{

    switch (action.type) {
        case SELECTEDCOUNTRY:
          return {
            ...state,
            selectedCountry: action.data,
            
          };
        case ALLCOUNTRIES:
          return {
            ...state,
            allCountries: action.data,
            
          };


          default:
             return state;
        }
}
export default ReduxReducer