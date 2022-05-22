import { WiSunrise, WiSunset, WiHumidity, WiCloudyWindy } from 'react-icons/wi'
import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import CityNames from './CityName'

const API = {
  key: 'fc81e576df145fb75aec7db4daae604a',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  // Xóa dấu
  const xoaDau = str => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");

    return str;
  }


  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `${API.base}weather?q=${xoaDau(location.toLowerCase())}&appid=${API.key}&lang=vi&units=metric`

  const checkData = (location) => {
    let count = 0;
    CityNames.forEach(CityName => {
      if (
        CityName.city.toLowerCase() === location ||
        CityName.city.toLowerCase() === location.toLowerCase() ||
        xoaDau(CityName.city.toLowerCase()) === location
      ) { count++ }
    })
    if(count === 0) {
      alert('Thành phố bạn nhập không hợp lệ. Bạn nhập thiếu dấu?')
    }
  }


  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      checkData(location);
      axios.get(url)
        .then(responsive => setData(responsive.data))
        .catch( _ => alert('Xin chào bạn! Hiện tại API chưa cung cấp thành phố này vui lòng thử bằng thành phố khác'))
    }
  }

  console.log(data)


  return (
    <div className="container">
      <div className="main-section">
        <div className="search-bar">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder="Nhập tên thành phố"
            list="cityList"
            className="search-city"
            id="search-input"
          />
          <datalist id="cityList">
            {CityNames.map((CityName, index) => (
              <option key={index} value={CityName.city} />
            ))}
          </datalist>
        </div>
        <div className="info-wrapper">
          {data.name ? <p className="cityName">{data.name}</p> : null}
          {data.weather ? <p className="weather-state">{data.weather[0].description}</p> : null}
          {data.weather ? 
            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} /> :
            null
          }
          {data.main ? <p className='teperature'> {Math.round(data.main.temp)}</p> : null}
        </div>
      </div>
      <div className="additional-section">
        <div className="row">
          <div className="item">
            <div className="label">
              Mặt trời mọc
              <span className="icon"><WiSunrise /></span>
            </div>
            {data.sys ? <div className="value sunrise">{moment.unix(data.sys.sunrise).format('HH:mm')}</div> : null}
          </div>
          <div className="item">
            <div className="label">
              Mặt trời lặn
              <span className="icon"><WiSunset /></span>
            </div>
            {data.sys ? <div className="value sunset">{moment.unix(data.sys.sunset).format('HH:mm')}</div> : null}
          </div>
        </div>

        <div className="row">
          <div className="item">
            <div className="label">
              Độ ẩm
              <span className="icon"><WiHumidity /></span>
            </div>
            {data.main ? <div className="value">
              <span className="humidity">{data.main.humidity}</span>
              %
            </div> : null}
          </div>
          <div className="item">
            <div className="label">
              Gió
              <span className="icon"><WiCloudyWindy /></span>
            </div>
            {data.wind ? <div className="value">
              <span className="wind-speed">{Math.round(data.wind.speed * 3.6)}</span>
              km/h
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
