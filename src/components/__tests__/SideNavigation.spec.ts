import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SideNavigation from '../SideNavigation.vue'

describe('SideNavigation', () => {
  it('renders properly', () => {
    const wrapper = mount(SideNavigation)
    expect(wrapper.find('.side-navigation').exists()).toBe(true)
  })

  it('renders all menu sections', () => {
    const wrapper = mount(SideNavigation)
    const sections = wrapper.findAll('.section-title')
    expect(sections).toHaveLength(2)
    expect(sections[0].text()).toBe('MENU')
    expect(sections[1].text()).toBe('GENERAL')
  })

  it('renders all navigation items', () => {
    const wrapper = mount(SideNavigation)
    const navItems = wrapper.findAll('.nav-item')
    expect(navItems).toHaveLength(8)
    
    // Check menu items (Dashboard, My Asset, Analytics, History, News)
    const menuItems = wrapper.findAll('.nav-section').at(0)?.findAll('.nav-item') || []
    expect(menuItems).toHaveLength(5)
    
    // Check general items (Help, Settings, Logout)
    const generalItems = wrapper.findAll('.nav-section').at(1)?.findAll('.nav-item') || []
    expect(generalItems).toHaveLength(3)
  })

  it('has dashboard as default active item', () => {
    const wrapper = mount(SideNavigation)
    const activeItem = wrapper.find('.nav-item.active')
    expect(activeItem.exists()).toBe(true)
    expect(activeItem.find('.nav-text').text()).toBe('Dashboard')
  })

  it('shows indicator for active item', () => {
    const wrapper = mount(SideNavigation)
    const indicator = wrapper.find('.nav-indicator')
    expect(indicator.exists()).toBe(true)
    
    // Indicator should be in the dashboard item (first item)
    const dashboardItem = wrapper.find('.nav-item.active')
    expect(dashboardItem.find('.nav-indicator').exists()).toBe(true)
  })

  it('emits navigate event when clicking on menu item', async () => {
    const wrapper = mount(SideNavigation)
    const assetItem = wrapper.findAll('.nav-item')[1] // My Asset item
    
    await assetItem.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('navigate')
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['asset'])
  })

  it('changes active item when clicking', async () => {
    const wrapper = mount(SideNavigation)
    const analyticsItem = wrapper.findAll('.nav-item')[2] // Analytics item
    
    await analyticsItem.trigger('click')
    
    expect(analyticsItem.classes()).toContain('active')
    expect(analyticsItem.find('.nav-text').text()).toBe('Analytics')
  })

  it('emits logout event when clicking logout', async () => {
    const wrapper = mount(SideNavigation)
    const logoutItem = wrapper.findAll('.nav-item')[7] // Last item (Logout)
    
    await logoutItem.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('logout')
    expect(wrapper.emitted('logout')?.[0]).toEqual([])
  })

  it('renders all icons correctly', () => {
    const wrapper = mount(SideNavigation)
    const icons = wrapper.findAll('.nav-icon img')
    expect(icons).toHaveLength(8)
    
    // Check specific icons by alt text
    const expectedAlts = [
      'Dashboard',
      'My Asset',
      'Analytics', 
      'History',
      'News',
      'Help',
      'Settings',
      'Logout'
    ]
    
    icons.forEach((icon, index) => {
      expect(icon.attributes('alt')).toBe(expectedAlts[index])
      expect(icon.attributes('src')).toBeDefined()
    })
  })

  it('applies active icon styling to dashboard by default', () => {
    const wrapper = mount(SideNavigation)
    const activeIcon = wrapper.find('.nav-icon.active-icon')
    expect(activeIcon.exists()).toBe(true)
    
    // Should be in the first nav item (Dashboard)
    const firstNavItem = wrapper.find('.nav-item')
    expect(firstNavItem.find('.nav-icon.active-icon').exists()).toBe(true)
  })

  it('updates active icon when changing selection', async () => {
    const wrapper = mount(SideNavigation)
    const assetItem = wrapper.findAll('.nav-item')[1] // My Asset item
    
    await assetItem.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Dashboard should no longer have active icon since asset is now selected
    const dashboardItem = wrapper.findAll('.nav-item')[0]
    expect(dashboardItem.find('.nav-icon.active-icon').exists()).toBe(false)
    
    // Asset item should now be active but not have active-icon class (only dashboard when active has special styling)
    expect(assetItem.classes()).toContain('active')
    
    // When dashboard is clicked again, it should have the active-icon class
    await dashboardItem.trigger('click')
    await wrapper.vm.$nextTick()
    expect(dashboardItem.find('.nav-icon.active-icon').exists()).toBe(true)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(SideNavigation)
    const navElement = wrapper.find('nav')
    expect(navElement.exists()).toBe(true)
    
    // Check if images have alt attributes
    const images = wrapper.findAll('img')
    images.forEach(img => {
      expect(img.attributes('alt')).toBeDefined()
      expect(img.attributes('alt')).not.toBe('')
    })
  })

  it('maintains proper structure for responsive design', () => {
    const wrapper = mount(SideNavigation)
    
    // Check main container
    expect(wrapper.find('.side-navigation').exists()).toBe(true)
    
    // Check sections
    expect(wrapper.findAll('.nav-section')).toHaveLength(2)
    
    // Check lists
    expect(wrapper.findAll('.nav-list')).toHaveLength(2)
    
    // Check background element
    expect(wrapper.find('.nav-background').exists()).toBe(true)
  })

  it('handles multiple rapid clicks correctly', async () => {
    const wrapper = mount(SideNavigation)
    const items = wrapper.findAll('.nav-item')
    
    // Click multiple items rapidly
    await items[1].trigger('click') // Asset
    await items[2].trigger('click') // Analytics
    await items[3].trigger('click') // History
    
    // Should emit all events
    expect(wrapper.emitted('navigate')).toHaveLength(3)
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['asset'])
    expect(wrapper.emitted('navigate')?.[1]).toEqual(['analytics'])
    expect(wrapper.emitted('navigate')?.[2]).toEqual(['history'])
    
    // Last clicked item should be active
    expect(items[3].classes()).toContain('active')
  })
})