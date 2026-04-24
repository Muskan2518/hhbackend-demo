import { NextResponse } from 'next/server';
const { sequelize } = require('@/lib/models');

export async function GET() {
  const startedAt = Date.now();

  const env = {
    DB_HOST: !!process.env.DB_HOST,
    DB_USER: !!process.env.DB_USER,
    DB_PASSWORD: !!process.env.DB_PASSWORD,
    DB_NAME: !!process.env.DB_NAME,
    DB_PORT: !!process.env.DB_PORT,
    JWT_SECRET: !!process.env.JWT_SECRET,
    SMTP_HOST: !!process.env.SMTP_HOST,
  };

  let db = { connected: false };
  try {
    await sequelize.authenticate();
    const [[row]] = await sequelize.query(
      "SELECT DATABASE() AS name, VERSION() AS version, NOW() AS serverTime"
    );
    db = {
      connected: true,
      name: row.name,
      version: row.version,
      serverTime: row.serverTime,
    };
  } catch (e) {
    db = { connected: false, error: e.message, code: e.original?.code };
  }

  const payload = {
    status: db.connected ? 'ok' : 'degraded',
    uptime: process.uptime(),
    node: process.version,
    now: new Date().toISOString(),
    latencyMs: Date.now() - startedAt,
    env,
    db,
  };

  return NextResponse.json(payload, { status: db.connected ? 200 : 503 });
}
