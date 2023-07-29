import axios from "axios";

export default function getDataWeather(params) {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}weather?q=${params}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`,
  });
}
