import { useEffect, useState } from "react";
import Header from "./Components/UI/Header";
import Search from "./Components/UI/Search";
import Filter from "./Components/UI/Filter";
import CountryCard from "./Components/UI/CountryCard";
import Container from "./Components/UI/Container";
import Footer from "./Components/UI/Footer";
import ErrorPage from "./Components/UI/FetchError";
import LoadingUI from "./Components/UI/LoadingUI";
import CountryNotFoundUI from "./Components/UI/CountryNotFoundUI";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState();
  const [isFetchError, setIsFetchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const searchHandler = (searchValue) => {
    setResult(
      countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase())
      )
    );
  };

  const filterHandler = (region) => {
    setResult(
      countries.filter((country) =>
        country.region.toLowerCase().includes(region.toLowerCase())
      )
    );
  };

  const underConstructionNote =
    " 🚧 Project Under Construction 🚧\n\nThanks for stopping by! This project is currently under development and we're crafting an amazing responsive experience for the best adventure, just for you.\n \n-Country-Pedia Team 🚀📱 ";

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not fetch data");
        }
      })
      .then((data) => {
        // console.log(data);
        alert(underConstructionNote);
        setCountries(data);
        setResult(data);
      })
      .catch((error) => {
        setIsFetchError(true);
        setErrorMessage(error.message);
        console.log(error.message);
      });
  }, []);

  return (
    <section className="min-h-screen bg-lightBg dark:bg-darkBg relative">
      <Header />
      <main className="p-5 md:p-10 xl:px-40 2xl:px-72">
        <Container
          styleClasses={"mt-24 mb-20 flex justify-between  flex-wrap gap-12"}
        >
          <Search onSearch={searchHandler} />
          <Filter onFilter={filterHandler} />
        </Container>

        <Container
          styleClasses={"flex flex-wrap justify-around gap-5 lg:gap-10 mb-40"}
        >
          {countries.length > 0 ? (
            isFetchError ? (
              <ErrorPage errorMessage={errorMessage} />
            ) : result.length > 0 ? (
              result
                .sort((a, b) =>
                  a.name.common
                    .toUpperCase()
                    .localeCompare(b.name.common.toUpperCase())
                )
                .map((country) => (
                  <CountryCard
                    countryData={country}
                    key={Math.random().toString()}
                  />
                ))
            ) : (
              <CountryNotFoundUI />
            )
          ) : (
            <>
              {isFetchError ? (
                <ErrorPage errorMessage={errorMessage} />
              ) : (
                <LoadingUI />
              )}
            </>
          )}
        </Container>
      </main>
      <Footer />
    </section>
  );
};

export default App;
