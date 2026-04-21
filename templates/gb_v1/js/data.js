/* ======================================================
   Gameboy DMG (gb_v1) — Habit Tracker / Gamified Dashboard
   ====================================================== */
var GB_DATA = {
  hero: {
    level: 14,
    xpCurrent: 420,
    xpMax: 600,
    title: 'Morning Warrior'
  },
  kpi: [
    { icon: '⚔', label: 'Streak',   value: '18d' },
    { icon: '★',  label: 'Level',    value: '14' },
    { icon: '♥', label: 'HP',       value: '84/100' },
    { icon: '◆', label: 'XP Today', value: '+120' }
  ],
  quests: [
    { name: '6AM WAKE',       xp: 20, done: true  },
    { name: '30MIN WORKOUT',  xp: 40, done: true  },
    { name: 'READ 20 PAGES',  xp: 25, done: true  },
    { name: 'DRINK 8 GLASSES',xp: 15, done: false },
    { name: 'DEEP WORK 4H',   xp: 60, done: false },
    { name: 'JOURNAL 3 LINES',xp: 15, done: false },
    { name: 'NO SUGAR',       xp: 20, done: false },
    { name: '10K STEPS',      xp: 30, done: true  }
  ],
  heatmap: [
    3,3,2,3,3,0,0,2,3,3, 3,2,3,0,2,3,3,3,2,0, 3,3,3,3,2,3,0,3,3,2
  ],
  achievements: [
    { icon: '🏆', name: 'FIRST WEEK',  unlocked: true },
    { icon: '🔥', name: '30 STREAK',   unlocked: true },
    { icon: '⭐', name: 'LVL 10',      unlocked: true },
    { icon: '💎', name: 'LVL 25',      unlocked: false },
    { icon: '🥇', name: '100 STREAK',  unlocked: false },
    { icon: '🎖', name: 'PERFECT DAY', unlocked: true  },
    { icon: '⚡', name: 'POWER WEEK',  unlocked: false },
    { icon: '🏅', name: '365 DAYS',    unlocked: false }
  ]
};
