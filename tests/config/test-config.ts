// Test reporting configuration and utilities
export const testConfig = {
  // Test environment configuration
  environment: {
    os: 'Windows 11',
    node: process.version,
    browser: 'Chromium',
    viewport: '1920x1080',
    timestamp: new Date().toISOString()
  },
  
  // Test categories for reporting
  categories: {
    unit: {
      name: 'Unit Tests',
      description: 'Tests for individual components and functions',
      color: '#4CAF50'
    },
    e2e: {
      name: 'End-to-End Tests',
      description: 'Tests for complete user workflows',
      color: '#2196F3'
    },
    visual: {
      name: 'Visual Tests',
      description: 'Tests for UI appearance and layout',
      color: '#FF9800'
    },
    accessibility: {
      name: 'Accessibility Tests',
      description: 'Tests for accessibility compliance',
      color: '#9C27B0'
    },
    performance: {
      name: 'Performance Tests',
      description: 'Tests for performance metrics',
      color: '#F44336'
    }
  },
  
  // Test thresholds
  thresholds: {
    unit: {
      coverage: 80,
      timeout: 10000
    },
    e2e: {
      timeout: 60000,
      retries: 2
    },
    visual: {
      timeout: 30000,
      retries: 1
    }
  },
  
  // Reporting settings
  reporting: {
    allure: {
      enabled: true,
      outputDir: 'allure-results',
      reportDir: 'allure-report'
    },
    junit: {
      enabled: true,
      outputFile: 'test-results/junit-results.xml'
    },
    html: {
      enabled: true,
      outputDir: 'test-results/html-report'
    }
  }
};

// Utility functions for test reporting
export const testUtils = {
  // Generate test metadata
  generateTestMetadata: (testName: string, category: string) => {
    return {
      name: testName,
      category: category,
      timestamp: new Date().toISOString(),
      environment: testConfig.environment,
      labels: [
        { name: 'framework', value: 'design-toolkit' },
        { name: 'category', value: category },
        { name: 'environment', value: 'windows-11' }
      ]
    };
  },
  
  // Capture test evidence
  captureEvidence: async (page: any, testName: string) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Take screenshot
    await page.screenshot({ 
      path: `tests/screenshots/${testName}-${timestamp}.png`,
      fullPage: true 
    });
    
    // Capture console logs
    const logs = await page.evaluate(() => {
      return window.console.logs || [];
    });
    
    return {
      screenshot: `tests/screenshots/${testName}-${timestamp}.png`,
      logs: logs,
      timestamp: timestamp
    };
  },
  
  // Generate test summary
  generateTestSummary: (results: any[]) => {
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === 'passed').length,
      failed: results.filter(r => r.status === 'failed').length,
      skipped: results.filter(r => r.status === 'skipped').length,
      duration: results.reduce((acc, r) => acc + (r.duration || 0), 0),
      timestamp: new Date().toISOString()
    };
    
    return {
      ...summary,
      successRate: Math.round((summary.passed / summary.total) * 100),
      categories: testConfig.categories
    };
  }
};

// Export configuration for use in tests
export default testConfig;
