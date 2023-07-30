import React, { useState } from "react";
import "./App.css";
import rain from "./asset/rain.png";
import clear from "./asset/clear.png";
import clouds from "./asset/clouds.png";
import noData from "./asset/no-data.png";
import haze from "./asset/mist.png";
import getDataWeather from "./api/service";
import TourPage from "./components/tour-page";

const App = () => {
  const [data, setData] = useState(null);
  const [isLocation, setIsLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const img = [
    { value: "Rain", url: rain },
    { value: "Clear", url: clear },
    { value: "Clouds", url: clouds },
    { value: "Haze", url: haze },
  ];

  const onKeyDownData = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
      getDataWeather(isLocation)
        .then(({ data: res }) => {
          setData(res);
          setTimeout(() => setLoading(false), 1000);
        })
        .catch(({ response }) => {
          if (response.data?.message !== "") {
            alert("No Data Result");
            setLoading(false);
            setMessage(true);
          }
        });
      setIsLocation("");
    }
  };

  console.log("data :", data);

  return (
    <>
      <TourPage />
      <div className="app">
        <div className="search-bar">
          <input
            type="text"
            className="input-search form-control form-control-solid shadow-sm  my-first-step"
            placeholder="e.g : Indonesia"
            value={isLocation}
            onChange={(e) => setIsLocation(e?.target.value)}
            onKeyDown={onKeyDownData}
          />
        </div>

        {data !== null ? (
          <>
            {loading ? (
              <>
                <div className="d-flex mt-4 align-items-center">
                  <span className="spinner-border spinner-border-sm me-1"></span>
                  <span>Please wait...</span>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column">
                <div>
                  {data?.weather?.map((item, i) => {
                    return (
                      <div className="d-flex flex-column mt-4" key={i || 0}>
                        <div className="d-flex justify-content-center align-items-center">
                          {img?.map(({ value, url }, i) => {
                            return (
                              <>
                                {item?.main === value && (
                                  <img
                                    key={i || 0}
                                    src={url}
                                    alt={value}
                                    className="w-auto img-weather"
                                  />
                                )}
                              </>
                            );
                          })}
                          <span>
                            {data?.main
                              ? `${data?.main?.temp.toFixed()} °F`
                              : ""}
                          </span>
                        </div>
                        <div className="d-flex w-100 justify-content-center mt-2">
                          <span className="me-2 text-muted d-flex align-items-center">
                            <box-icon
                              type="solid"
                              name="map"
                              size="sm"
                            ></box-icon>
                            {data?.name}
                          </span>{" "}
                          |{" "}
                          <span className="ms-2 text-muted">{item?.main}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 d-flex w-100 justify-content-between border-top pt-3">
                  <div className="d-flex flex-column">
                    <span className="">Humidity</span>
                    <span className="text-muted">
                      {data?.main ? `${data?.main?.humidity}%` : ""}
                    </span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="">Feels</span>
                    <span className="text-muted">
                      {data?.main
                        ? `${data?.main?.feels_like.toFixed()} °C`
                        : ""}
                    </span>
                  </div>
                  <div>
                    <span className="d-flex flex-column">Wind</span>
                    <span className="text-muted">
                      {" "}
                      {data?.wind ? `${data?.wind.speed.toFixed()} mph` : ""}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="d-flex flex-column h-25 mt-4 pt-4 align-items-center justify-content-center">
            <img
              src={noData}
              className=""
              alt="no-data"
              style={{ width: 250 }}
            />
            <span className="text-muted">
              {message ? "No Data Result" : "No Data"}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
