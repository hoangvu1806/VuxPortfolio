#!/usr/bin/env node

/**
 * Giscus Environment Variables Checker
 * This script checks if Giscus environment variables are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Checking Giscus Environment Variables...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

console.log(`📁 .env.local file: ${envExists ? '✅ Found' : '❌ Not found'}`);

if (!envExists) {
  console.log('\n❌ Error: .env.local file not found!');
  console.log('\nTo fix this:');
  console.log('1. Create .env.local file in your project root');
  console.log('2. Add the following lines:');
  console.log('\n   NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id_here');
  console.log('   NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id_here');
  console.log('\n3. Get IDs from: https://giscus.app');
  process.exit(1);
}

// Read .env.local content
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

console.log('\n📋 Environment variables found:');

let repoIdFound = false;
let categoryIdFound = false;

lines.forEach(line => {
  const [key, value] = line.split('=');
  if (key === 'NEXT_PUBLIC_GISCUS_REPO_ID') {
    repoIdFound = true;
    const isValid = value && value.length > 10 && !value.includes('your_repo_id');
    console.log(`   NEXT_PUBLIC_GISCUS_REPO_ID: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    if (!isValid) {
      console.log(`     Current value: "${value}"`);
      console.log('     Should be like: "R_kgDOExample123"');
    }
  }
  
  if (key === 'NEXT_PUBLIC_GISCUS_CATEGORY_ID') {
    categoryIdFound = true;
    const isValid = value && value.length > 10 && !value.includes('your_category_id');
    console.log(`   NEXT_PUBLIC_GISCUS_CATEGORY_ID: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    if (!isValid) {
      console.log(`     Current value: "${value}"`);
      console.log('     Should be like: "DIC_kwDOExample456"');
    }
  }
});

if (!repoIdFound) {
  console.log('   NEXT_PUBLIC_GISCUS_REPO_ID: ❌ Missing');
}

if (!categoryIdFound) {
  console.log('   NEXT_PUBLIC_GISCUS_CATEGORY_ID: ❌ Missing');
}

// Final status
console.log('\n🎯 Status:');
if (repoIdFound && categoryIdFound) {
  console.log('✅ Environment variables are configured!');
  console.log('\nIf comments still don\'t work:');
  console.log('1. Ensure GitHub repository is public');
  console.log('2. Enable Discussions in repository settings');
  console.log('3. Install Giscus app: https://github.com/apps/giscus');
  console.log('4. Check browser console for errors');
} else {
  console.log('❌ Environment variables are missing or invalid!');
  console.log('\nNext steps:');
  console.log('1. Visit: https://giscus.app');
  console.log('2. Configure with repository: hoangvu1806/VuxPortfolio');
  console.log('3. Copy the generated IDs to .env.local');
  console.log('4. Restart your development server');
}

console.log('\n🔗 Useful links:');
console.log('   • Giscus setup: https://giscus.app');
console.log('   • Documentation: ./GISCUS_SETUP.md');
console.log('   • Repository: https://github.com/hoangvu1806/VuxPortfolio');
