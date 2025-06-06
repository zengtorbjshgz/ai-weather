<template>
  <div class="weather-container">
    <div class="weather-header">
      <h2>天气信息</h2>
      <button @click="refreshWeather" :disabled="loading" class="refresh-btn">
        <span v-if="loading">加载中...</span>
        <span v-else>刷新</span>
      </button>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="refreshWeather" class="retry-btn">重试</button>
    </div>

    <div v-else-if="weatherData" class="weather-content">
      <!-- 当前位置信息 -->
      <div class="location-info">
        <h3>{{ weatherData.result.location.city }} - {{ weatherData.result.location.name }}</h3>
      </div>

      <!-- 当前天气 -->
      <div class="current-weather">
        <div class="temperature">
          <span class="temp-value">{{ weatherData.result.now.temp }}°C</span>
          <span class="feels-like">体感温度 {{ weatherData.result.now.feels_like }}°C</span>
        </div>
        <div class="weather-desc">
          <p class="text">{{ weatherData.result.now.text }}</p>
          <p class="wind">{{ weatherData.result.now.wind_dir }} {{ weatherData.result.now.wind_class }}</p>
          <p class="humidity">湿度 {{ weatherData.result.now.rh }}%</p>
        </div>
      </div>

      <!-- 空气质量 -->
      <div class="air-quality">
        <h4>空气质量</h4>
        <div class="aqi-info">
          <span class="aqi-value" :class="getAQILevel(weatherData.result.now.aqi)">AQI {{ weatherData.result.now.aqi }}</span>
          <span class="pm25">PM2.5: {{ weatherData.result.now.pm25 }}</span>
        </div>
      </div>

      <!-- 未来几天预报 -->
      <div class="forecast" v-if="weatherData.result.forecasts">
        <h4>未来几天</h4>
        <div class="forecast-list">
          <div v-for="forecast in weatherData.result.forecasts.slice(0, 5)" :key="forecast.date" class="forecast-item">
            <div class="date">{{ formatDate(forecast.date) }}</div>
            <div class="week">{{ forecast.week }}</div>
            <div class="weather">{{ forecast.text_day }}</div>
            <div class="temp-range">{{ forecast.low }}° ~ {{ forecast.high }}°</div>
          </div>
        </div>
      </div>

      <!-- 生活指数 -->
      <div class="indexes" v-if="weatherData.result.indexes">
        <h4>生活指数</h4>
        <div class="indexes-grid">
          <div v-for="index in weatherData.result.indexes" :key="index.name" class="index-item">
            <span class="index-name">{{ index.name }}</span>
            <span class="index-brief">{{ index.brief }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="loading">
      <p>正在获取天气信息...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Location {
  country: string
  province: string
  city: string
  name: string
  id: string
}

interface CurrentWeather {
  temp: number
  feels_like: number
  rh: number
  wind_class: string
  wind_dir: string
  text: string
  prec_1h: number
  clouds: number
  vis: number
  aqi: number
  pm25: number
  pm10: number
  no2: number
  so2: number
  o3: number
  co: number
  uptime: string
}

interface WeatherIndex {
  name: string
  brief: string
  detail: string
}

interface Forecast {
  date: string
  week: string
  high: number
  low: number
  wc_day: string
  wc_night: string
  wd_day: string
  wd_night: string
  text_day: string
  text_night: string
  aqi: number
}

interface WeatherResult {
  location: Location
  now: CurrentWeather
  indexes: WeatherIndex[]
  forecasts: Forecast[]
  alerts?: any[]
}

interface WeatherResponse {
  status: number
  result: WeatherResult
}

const weatherData = ref<WeatherResponse | null>(null)
const loading = ref(false)
const error = ref('')

// 百度天气API密钥 - 从环境变量获取
const BAIDU_AK = import.meta.env.VITE_BAIDU_API_KEY || ''

// 默认位置（北京）
const DEFAULT_LOCATION = {
  lat: 39.9093,
  lng: 116.3964
}

// 获取用户地理位置
const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('浏览器不支持地理位置获取'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        console.warn('获取地理位置失败:', error.message)
        resolve(DEFAULT_LOCATION) // 使用默认位置
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 300000 // 5分钟缓存
      }
    )
  })
}

// 将经纬度转换为百度坐标系
const convertToBaiduCoords = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `/api/baidu/geoconv/v1/?coords=${lng},${lat}&from=1&to=5&ak=${BAIDU_AK}`
    )
    const data = await response.json()
    if (data.status === 0 && data.result && data.result.length > 0) {
      return {
        lat: data.result[0].y,
        lng: data.result[0].x
      }
    }
  } catch (error) {
    console.warn('坐标转换失败:', error)
  }
  return { lat, lng }
}

// 根据坐标获取区域ID
const getDistrictId = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await fetch(
      `/api/baidu/reverse_geocoding/v3/?ak=${BAIDU_AK}&output=json&coordtype=bd09ll&location=${lat},${lng}`
    )
    const data = await response.json()
    if (data.status === 0 && data.result && data.result.addressComponent) {
      // 尝试从地址组件中获取区域代码
      const adcode = data.result.addressComponent.adcode
      if (adcode) {
        return adcode
      }
    }
  } catch (error) {
    console.warn('获取区域ID失败:', error)
  }
  // 默认返回北京东城区的ID
  return '110101'
}

// 获取天气数据
const fetchWeatherData = async () => {
  loading.value = true
  error.value = ''

  try {
    // 检查API密钥
    if (!BAIDU_AK || BAIDU_AK === 'YOUR_BAIDU_API_KEY') {
      throw new Error('请先在.env.local文件中配置百度API密钥 (VITE_BAIDU_API_KEY)')
    }

    // 获取用户位置
    const location = await getUserLocation()
    console.log('获取到位置:', location)

    // 转换为百度坐标系
    const baiduCoords = await convertToBaiduCoords(location.lat, location.lng)
    console.log('百度坐标:', baiduCoords)

    // 获取区域ID
    const districtId = await getDistrictId(baiduCoords.lat, baiduCoords.lng)
    console.log('区域ID:', districtId)

    // 调用天气API
    const weatherUrl = `/api/baidu/weather/v1/?district_id=${districtId}&data_type=all&ak=${BAIDU_AK}`
    const response = await fetch(weatherUrl)
    
    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.status !== 0) {
      throw new Error(`API错误: ${data.message || '未知错误'}`)
    }

    weatherData.value = data
  } catch (err) {
    console.error('获取天气数据失败:', err)
    error.value = err instanceof Error ? err.message : '获取天气数据失败'
  } finally {
    loading.value = false
  }
}

// 刷新天气数据
const refreshWeather = () => {
  fetchWeatherData()
}

// 获取AQI等级样式
const getAQILevel = (aqi: number): string => {
  if (aqi <= 50) return 'aqi-good'
  if (aqi <= 100) return 'aqi-moderate'
  if (aqi <= 150) return 'aqi-unhealthy-sensitive'
  if (aqi <= 200) return 'aqi-unhealthy'
  if (aqi <= 300) return 'aqi-very-unhealthy'
  return 'aqi-hazardous'
}

// 格式化日期
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

// 组件挂载时获取天气数据
onMounted(() => {
  fetchWeatherData()
})
</script>

<style scoped lang="scss">
.weather-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    color: #333;
    font-size: 24px;
  }
  
  .refresh-btn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover:not(:disabled) {
      background: #0056b3;
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}

.error-message {
  text-align: center;
  padding: 20px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 8px;
  margin-bottom: 20px;
  
  .retry-btn {
    margin-top: 10px;
    padding: 8px 16px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    
    &:hover {
      background: #c82333;
    }
  }
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
}

.location-info {
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    color: #333;
    font-size: 20px;
  }
}

.current-weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  border-radius: 12px;
  
  .temperature {
    .temp-value {
      font-size: 48px;
      font-weight: bold;
      display: block;
    }
    
    .feels-like {
      font-size: 14px;
      opacity: 0.9;
    }
  }
  
  .weather-desc {
    text-align: right;
    
    p {
      margin: 5px 0;
      font-size: 14px;
    }
    
    .text {
      font-size: 18px;
      font-weight: 500;
    }
  }
}

.air-quality {
  margin-bottom: 30px;
  
  h4 {
    margin: 0 0 10px 0;
    color: #333;
  }
  
  .aqi-info {
    display: flex;
    gap: 20px;
    align-items: center;
    
    .aqi-value {
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: bold;
      color: white;
      
      &.aqi-good { background: #00e400; }
      &.aqi-moderate { background: #ffff00; color: #333; }
      &.aqi-unhealthy-sensitive { background: #ff7e00; }
      &.aqi-unhealthy { background: #ff0000; }
      &.aqi-very-unhealthy { background: #8f3f97; }
      &.aqi-hazardous { background: #7e0023; }
    }
    
    .pm25 {
      color: #666;
    }
  }
}

.forecast {
  margin-bottom: 30px;
  
  h4 {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  .forecast-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
  }
  
  .forecast-item {
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    text-align: center;
    
    .date {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    
    .week {
      color: #666;
      font-size: 12px;
      margin-bottom: 8px;
    }
    
    .weather {
      color: #007bff;
      margin-bottom: 5px;
    }
    
    .temp-range {
      font-weight: bold;
      color: #333;
    }
  }
}

.indexes {
  h4 {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  .indexes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .index-item {
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .index-name {
      color: #333;
      font-weight: 500;
    }
    
    .index-brief {
      color: #007bff;
      font-weight: bold;
    }
  }
}

@media (max-width: 768px) {
  .weather-container {
    margin: 10px;
    padding: 15px;
  }
  
  .current-weather {
    flex-direction: column;
    text-align: center;
    gap: 15px;
    
    .weather-desc {
      text-align: center;
    }
  }
  
  .forecast-list {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .indexes-grid {
    grid-template-columns: 1fr;
  }
}
</style>