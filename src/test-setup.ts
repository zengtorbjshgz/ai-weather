import { config } from '@vue/test-utils'

// Global test configuration
config.global.stubs = {
  // Stub any components that might cause issues in tests
}

// Mock any global properties if needed
config.global.mocks = {
  // Add any global mocks here
}

// Configure global plugins
config.global.plugins = [
  // Add any plugins needed for testing
]