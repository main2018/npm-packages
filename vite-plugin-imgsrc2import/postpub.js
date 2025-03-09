// scripts/postpub.js
const { execSync } = require('child_process');

// 获取传递的参数
const args = process.argv.slice(2);
const commitMessage = args[0] || 'update'; // 如果没有传递参数，使用默认值

// 执行 Git 命令
execSync('git add .', { stdio: 'inherit' });
execSync(`git commit -am "${commitMessage}"`, { stdio: 'inherit' });
// execSync('git push -u origin main', { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });