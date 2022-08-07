export default function fetchCountries(result) {
    
    return fetch(`https://restcountries.com/v3.1/name/${result}?fields=capital,name,population,flags,languages`)
        .then(
            (response) => {
                console.log(response)
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            }
        )
}