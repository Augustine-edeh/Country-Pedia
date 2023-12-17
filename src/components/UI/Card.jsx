import { useContext } from "react";
import CountryDetailContext from "../../store/country-detail-context";
import { useNavigate } from "react-router-dom";
import monthsList from "../../utils/monthsList";
const Card = ({ countryData }) => {
  // console.log(countryData);
  // const selectedCountryCtx = useContext(CountryDetailContext);
  const navigate = useNavigate();

  const selectedCountry = useContext(CountryDetailContext);

  const clickHandler = async () => {
    selectedCountry.setName(countryData.name.common);
    selectedCountry.setSelectedCountry(countryData);
    console.log(selectedCountry.name);
    localStorage.setItem("countryData", JSON.stringify(countryData));
    navigate(`${countryData.name.common}`);
    // Fetching the time and date data for selected country
    await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=XN1YFKSTBENU&format=json&by=position&lat=${countryData.capitalInfo.latlng[0]}&lng=${countryData.capitalInfo.latlng[1]}`
    )
      .then((response) => {
        // Throw an error (when no internet connection)
        if (!response.ok) {
          throw new Error("No internet connection");
        }
        return response.json();
      })
      .then((data) => {
        // Assigning respective time parameters from response data
        const hour = data.formatted.split(" ")[1].split(":")[0];
        const minute = data.formatted.split(" ")[1].split(":")[1];
        const time24hr = `${hour}:${minute}`;

        function convertTo12HourFormat(time_24hr) {
          // Split the time into hours and minutes
          const [hours, minutes] = time_24hr.split(":");

          // Convert hours to a number
          const hoursNum = parseInt(hours, 10);

          // Determine whether it's "am" or "pm" based on the hours
          const period = hoursNum >= 12 ? "pm" : "am";

          // Calculate the 12-hour format hours
          const hours12 = hoursNum % 12 || 12; // 0 should be converted to 12

          // Construct the 12-hour format time string
          const time12hr = `${hours12}:${minutes} ${period}`;

          // Assign time value to countryData object before storing to localStorage
          countryData.time = time12hr;
        }
        convertTo12HourFormat(time24hr);
        // countryData.date = data.formatted.split(" ")[0].replace(/-/g, "/");
        const dateData = data.formatted.split(" ")[0].split("-");
        let [year, month, day] = dateData;
        // remove leading zero from day
        day[0] === "0" ? (day = day[1]) : "";
        // Formatting date to desired format
        const formattedDate = `${monthsList[month - 1]} ${day}, ${year}`;
        countryData.date = formattedDate;
      })
      .catch((error) => console.error(error.message));
    // Storing CountryData object (country Information) to localStorage
    localStorage.setItem("countryData", JSON.stringify(countryData));
  };

  return (
    <button
      className="flex  flex-col shadow-lg h-15 rounded-lg overflow-hidden w-64 mb-10 transition-all duration-300 hover:scale-110 focus:scale-110 text-lightText dark:text-darkText_LightElement bg-lightBg dark:bg-darkElement cursor-pointer outline-none"
      onClick={clickHandler}
    >
      <section className="h-40 w-full">
        <img src={countryData.flags.png} alt="flag" className="w-full h-full" />
      </section>
      <section className="px-5  pb-10 text-left">
        <p className="font-black text-lg mt-8 mb-5">
          {countryData.name.official}
        </p>
        <p>
          <span className="font-normal">Population: </span>
          <span className="font-thin">{countryData.population}</span>
        </p>
        <p>
          <span className="font-normal">Region: </span>
          <span className="font-thin">{countryData.region}</span>
        </p>
        <p>
          <span className="font-normal">Capital: </span>{" "}
          <span className="font-thin">{countryData.capital}</span>
        </p>
      </section>
    </button>
  );
};

export default Card;
