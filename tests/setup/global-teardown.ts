// Global teardown for Playwright tests
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown for Playwright tests...');
  
  try {
    // Clean up any global resources
    console.log('✅ Global teardown completed successfully');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    throw error;
  }
}

export default globalTeardown;
