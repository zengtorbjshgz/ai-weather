<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import SideNavigation from './components/SideNavigation.vue'
import WeatherDisplay from './components/WeatherDisplay.vue'
</script>

<template>
  <div class="app-container">
    <!-- 侧边导航 -->
    <aside class="sidebar">
      <SideNavigation />
    </aside>
    
    <!-- 主内容区域 -->
    <main class="main-content">
      <header class="app-header">
        <img alt="Weather App" class="logo" src="./assets/logo.svg" width="40" height="40" />
        <h1>天气预报</h1>
      </header>
      
      <!-- 天气展示区域 -->
      <div class="weather-section">
        <WeatherDisplay />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  width: 280px;
  background: #fff;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 20px;
  overflow-y: auto;
}

.app-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  h1 {
    margin: 0;
    color: #333;
    font-size: 28px;
    font-weight: 600;
  }
}

.weather-section {
  width: 100%;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 260px;
  }
  
  .main-content {
    margin-left: 260px;
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .main-content {
    margin-left: 0;
    padding: 10px;
  }
  
  .app-header {
    padding: 15px;
    
    h1 {
      font-size: 24px;
    }
  }
}
</style>
