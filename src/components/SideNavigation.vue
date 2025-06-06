<template>
  <nav class="side-navigation">
    <div class="nav-background"></div>
    
    <!-- Menu Section -->
    <div class="nav-section">
      <h3 class="section-title">MENU</h3>
      <ul class="nav-list">
        <li class="nav-item" :class="{ active: activeItem === 'dashboard' }" @click="setActive('dashboard')">
          <div class="nav-item-bg"></div>
          <div class="nav-indicator" v-if="activeItem === 'dashboard'"></div>
          <div class="nav-content">
            <div class="nav-icon active-icon" v-if="activeItem === 'dashboard'">
              <img src="@/assets/icons/icon-home.svg" alt="Dashboard" />
            </div>
            <div class="nav-icon" v-else>
              <img src="@/assets/icons/icon-home.svg" alt="Dashboard" />
            </div>
            <span class="nav-text" :class="{ active: activeItem === 'dashboard' }">Dashboard</span>
          </div>
        </li>
        
        <li class="nav-item" :class="{ active: activeItem === 'asset' }" @click="setActive('asset')">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-wallet.svg" alt="My Asset" />
            </div>
            <span class="nav-text">My Asset</span>
          </div>
        </li>
        
        <li class="nav-item" :class="{ active: activeItem === 'analytics' }" @click="setActive('analytics')">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-chart.svg" alt="Analytics" />
            </div>
            <span class="nav-text">Analytics</span>
          </div>
        </li>
        
        <li class="nav-item" :class="{ active: activeItem === 'history' }" @click="setActive('history')">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-time.svg" alt="History" />
            </div>
            <span class="nav-text">History</span>
          </div>
        </li>
        
        <li class="nav-item" :class="{ active: activeItem === 'news' }" @click="setActive('news')">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-news.svg" alt="News" />
            </div>
            <span class="nav-text">News</span>
          </div>
        </li>
      </ul>
    </div>
    
    <!-- General Section -->
    <div class="nav-section">
      <h3 class="section-title">GENERAL</h3>
      <ul class="nav-list">
        <li class="nav-item" :class="{ active: activeItem === 'help' }" @click="setActive('help')">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-info.svg" alt="Help" />
            </div>
            <span class="nav-text">Help</span>
          </div>
        </li>
        
        <li class="nav-item" :class="{ active: activeItem === 'settings' }" @click="setActive('settings')">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-settings.svg" alt="Settings" />
            </div>
            <span class="nav-text">Settings</span>
          </div>
        </li>
        
        <li class="nav-item" :class="{ active: activeItem === 'logout' }" @click="handleLogout">
          <div class="nav-item-bg"></div>
          <div class="nav-content">
            <div class="nav-icon">
              <img src="@/assets/icons/icon-logout.svg" alt="Logout" />
            </div>
            <span class="nav-text">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

interface NavigationEmits {
  navigate: [item: string]
  logout: []
}

const emit = defineEmits<NavigationEmits>()

const activeItem = ref('dashboard')

const setActive = (item: string) => {
  activeItem.value = item
  emit('navigate', item)
}

const handleLogout = () => {
  emit('logout')
}
</script>

<style lang="scss" scoped>
.side-navigation {
  position: relative;
  width: 256px;
  height: 636px;
  background: #ffffff;
  box-shadow: 24px 0px 80px 0px rgba(49, 79, 124, 0.02);
  padding: 32px 16px;
  box-sizing: border-box;
  
  .nav-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    z-index: -1;
  }
  
  .nav-section {
    margin-bottom: 40px;
    
    .section-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 1.71;
      color: #8F98B7;
      margin: 0 0 16px 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
      
      .nav-item {
        position: relative;
        width: 224px;
        height: 56px;
        margin-bottom: 8px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        .nav-item-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(244, 246, 248, 0.73);
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .nav-indicator {
          position: absolute;
          right: -16px;
          top: 13px;
          width: 14.5px;
          height: 29px;
          background: linear-gradient(135deg, #1CAC70 0%, #EDDC46 100%);
          border-radius: 4px 0 0 4px;
        }
        
        .nav-content {
          position: relative;
          display: flex;
          align-items: center;
          padding: 16px;
          height: 100%;
          box-sizing: border-box;
          z-index: 1;
          
          .nav-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid transparent;
            transition: all 0.3s ease;
            
            img {
              width: 16px;
              height: 16px;
              filter: brightness(0) saturate(100%) invert(60%) sepia(8%) saturate(1234%) hue-rotate(202deg) brightness(94%) contrast(86%);
              transition: filter 0.3s ease;
            }
            
            &.active-icon {
              background: linear-gradient(135deg, #1CAC70 0%, #EDDC46 100%);
              border: none;
              
              img {
                filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(109deg) brightness(105%) contrast(105%);
              }
            }
          }
          
          .nav-text {
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 1.5;
            color: #8F98B7;
            transition: color 0.3s ease;
            
            &.active {
              color: #1A1D29;
            }
          }
        }
        
        &:hover {
          .nav-item-bg {
            opacity: 1;
          }
        }
        
        &.active {
          .nav-item-bg {
            opacity: 1;
          }
          
          .nav-content .nav-icon:not(.active-icon) {
            border-color: #E5E7EB;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .side-navigation {
    width: 100%;
    height: auto;
    padding: 16px;
    
    .nav-section {
      margin-bottom: 24px;
      
      .nav-list .nav-item {
        width: 100%;
        
        .nav-indicator {
          right: 0;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .side-navigation {
    padding: 12px;
    
    .nav-section {
      .section-title {
        font-size: 12px;
        margin-left: 12px;
      }
      
      .nav-list .nav-item {
        height: 48px;
        
        .nav-content {
          padding: 12px;
          
          .nav-icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            
            img {
              width: 14px;
              height: 14px;
            }
          }
          
          .nav-text {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>