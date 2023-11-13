import BackButton from "./BackButton";
const Country = () => {
  const borders = ["France", "Germany", " Netherlands"];
  const languages = ["Dutch", "French", "German"];
  return (
    <main className="text-lightText dark:text-darkText_LightElement">
      <BackButton />
      <div className="flex flex-col gap-10 md:flex-row bg-gray-200">
        <section className="bg-red-300 h-80 md:h-auto md:w-1/2 p-2">
          <img
            src="https://flagcdn.com/be.svg"
            alt="flag"
            className="h-full w-full"
          />
        </section>

        <section className="flex flex-col md:w-1/2 bg-red-800">
          <div className="bg-blue-300 mb-10 p-1">
            <p className="font-bold text-3xl bg-red-500">Belgium</p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 md:flex-row bg-pink-400 justify-between text-lg">
              <div className="bg-indigo-400">
                <p>
                  Native Name: <span>Belgie</span>
                </p>
                <p>
                  Population: <span>11,319,511</span>
                </p>
                <p>
                  Region: <span>Europe</span>
                </p>
                <p>
                  Sub Region: <span>Western Europe</span>
                </p>
                <p>
                  Capital: <span>Brussels</span>
                </p>
              </div>

              <div className="bg-green-300">
                <p>
                  Top Level Domain: <span>.be</span>
                </p>
                <p>
                  Currencies: <span>Euro</span>
                </p>
                <p>
                  Languages: <span>{languages.join(", ")}</span>
                </p>
              </div>
            </div>

            <div className="bg-orange-300">
              <p className="flex flex-wrap items-center gap-1">
                Border Countries:
                <span className="flex flex-wrap gap-3 ">
                  {borders.map((borderCountry) => (
                    <button
                      key={Math.random().toString()}
                      type="button"
                      className="text-lightText dark:text-darkText_LightElement bg-darkText_LightElement dark:bg-darkElement py-0.5 px-5 rounded-sm shadow-lg"
                    >
                      {borderCountry}
                    </button>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
export default Country;
