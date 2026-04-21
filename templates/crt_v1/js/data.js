/* ======================================================
   Cathode Ray Terminal (crt_v1) — DevOps / Monitoring Data
   ====================================================== */
var CRT_DATA = {
  sysbar: [
    { label: 'HOST',    value: 'mergeui-prod-01' },
    { label: 'UPTIME',  value: '42 days 7:14' },
    { label: 'LOAD',    value: '0.84 0.92 0.88' },
    { label: 'REGION',  value: 'us-east-1' },
    { label: 'KERNEL',  value: 'Linux 6.8.0' }
  ],
  kpi: [
    { id: 'SYS-01', label: 'Uptime (30d)', value: '99.97%', trend: 'SLO 99.9 · OK',    state: '' },
    { id: 'REQ-02', label: 'Req/s',        value: '2,418',  trend: 'peak 3,204 today', state: '' },
    { id: 'ERR-03', label: 'Error Rate',   value: '0.42%',  trend: '▲ above 0.3 SLO',  state: 'warn' },
    { id: 'LAT-04', label: 'Latency p99',  value: '184ms',  trend: '▲ +28ms vs 1h',    state: 'warn' }
  ],
  services: [
    { name: 'api-gateway',         status: 'online',  latency: '42ms',  state: '' },
    { name: 'auth-service',        status: 'online',  latency: '28ms',  state: '' },
    { name: 'db-primary',          status: 'online',  latency: '6ms',   state: '' },
    { name: 'db-replica-02',       status: 'lagging', latency: '212ms', state: 'warn' },
    { name: 'webhook-dispatcher',  status: 'online',  latency: '54ms',  state: '' },
    { name: 'notification-worker', status: 'online',  latency: '38ms',  state: '' },
    { name: 'search-index',        status: 'stale',   latency: '—',     state: 'err'  },
    { name: 'cache-redis',         status: 'online',  latency: '1ms',   state: '' }
  ],
  logs: [
    { time: '14:22:18', level: 'ERR',  src: 'search-index', msg: 'Connection refused — worker did not respond within 30s' },
    { time: '14:22:12', level: 'WARN', src: 'db-replica-02', msg: 'Replication lag 214ms exceeded threshold 100ms' },
    { time: '14:22:02', level: 'INFO', src: 'api-gateway',  msg: 'Route /api/v1/download — p99 194ms (rolling 5m)' },
    { time: '14:21:47', level: 'WARN', src: 'api-gateway',  msg: 'Rate limiter tripped for client 182.16.x.x (12/min)' },
    { time: '14:21:33', level: 'INFO', src: 'auth-service', msg: 'JWT rotation cycle completed in 82ms' },
    { time: '14:21:11', level: 'INFO', src: 'webhook-dispatcher', msg: 'Lemonsqueezy order_refunded processed: ord_8125603' },
    { time: '14:20:54', level: 'ERR',  src: 'search-index', msg: 'Fatal: index shard corruption detected in shard-03' },
    { time: '14:20:28', level: 'INFO', src: 'notification-worker', msg: 'Sent 14 email notifications (Loops)' },
    { time: '14:19:59', level: 'WARN', src: 'cache-redis', msg: 'Memory usage 78% — consider eviction policy' },
    { time: '14:19:31', level: 'INFO', src: 'db-primary',  msg: 'Checkpoint completed — 1,428 wal segments archived' }
  ],
  latencyChart: {
    labels: ['−10m','−9m','−8m','−7m','−6m','−5m','−4m','−3m','−2m','−1m','now'],
    p50:  [42, 46, 44, 48, 52, 58, 62, 64, 68, 72, 78],
    p99:  [120, 132, 128, 134, 140, 148, 156, 162, 168, 176, 184]
  }
};
