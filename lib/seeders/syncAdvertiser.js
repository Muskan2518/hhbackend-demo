const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '..', '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach((line) => {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  });
}
const { sequelize, Advertiser } = require('../models');

async function run() {
  try {
    await sequelize.authenticate();
    console.log('[sync] DB connection OK');

    await Advertiser.sync();
    console.log('[sync] advertisers table ready');

    const qi = sequelize.getQueryInterface();
    const usersCols = await qi.describeTable('users');
    if (!usersCols.advertiserId) {
      await sequelize.query(
        "ALTER TABLE users ADD COLUMN advertiserId INT NULL, ADD INDEX idx_users_advertiserId (advertiserId)"
      );
      console.log('[sync] users.advertiserId column added');
    } else {
      console.log('[sync] users.advertiserId already exists');
    }

    console.log('[sync] done');
    process.exit(0);
  } catch (e) {
    console.error('[sync] failed:', e.message);
    process.exit(1);
  }
}

run();
