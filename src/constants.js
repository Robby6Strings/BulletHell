import { Kamehameha, Slash, SolarFlare } from './lib.js';

export const menu = document.getElementById('menu');
export const leaderboard = document.getElementById('leaderboard');
export const startButton = document.getElementById('startButton');
export const playerColorEl = document.getElementById('player_color');
export const scoreEl = document.getElementById('scoreEl');
export const menuScoreEl = document.getElementById('menuScoreEl');
export const killsEl = document.getElementById('killsEl');
export const lifeEl = document.getElementById('lifeEl');
export const menuKillsEl = document.getElementById('menuKillsEl');
export const heatBarEl = document.getElementById('heat');
export const xpBarEl = document.getElementById('xp');
export const lvlEl = document.getElementById('level');
export const levelUpScreen = document.getElementById('levelup');
export const levelUpOptionsEl = document.getElementById('levelup_options');
export const pauseScreen = document.getElementById('pause');
export const playerStatsEl = document.getElementById('player_stats');
export const playerStatsWrapper = document.getElementById(
  'player_stats_container'
);
export const submitScoreDiv = document.getElementById('submit_score');
export const submitScoreButton = document.getElementById('submit_button');
export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
export let x = canvas.width / 2;
export let y = canvas.height / 2;

export const XP_PER_KILL = 100;
export const XP_REQ_MULTI_PER_LEVEL = 1.2;

export let animId;
export const setAnimId = (id) => (animId = id);
export const clearAnimId = () => {
  window.cancelAnimationFrame(animId);
  animId = null;
};

export const FRICTION = 0.97;
export const BULLET_COLOR = 'rgba(255,255,255,.75)';
export const BULLET_SIZE = 5;
export const ENEMY_SPEED = 0.6;

export const PLAYER_STAT_DISPLAYS = [
  {
    key: 'xpMulti',
    displayText: 'XP Multiplier',
  },
  {
    key: 'speed',
    displayText: 'Acceleration',
  },
  {
    key: 'bulletSpeed',
    displayText: 'Bullet Speed',
  },
  {
    key: 'maxSpeed',
    displayText: 'Max Speed',
  },
  {
    key: 'bulletCooldown',
    displayText: 'Bullet Cooldown',
  },
  {
    key: 'damage',
    displayText: 'Bullet Damage',
  },
  {
    key: 'critChance',
    displayText: 'Critical Chance',
  },
  {
    key: 'critDamageMulti',
    displayText: 'Critical Multiplier',
  },
  {
    key: 'maxLife',
    displayText: 'Max Life',
  },
];

export const BONUS_TYPES = [
  {
    type: 'attribute',
    name: '+ Bullet Damage',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'damage',
        amounts: [1, 3, 5, 8],
      },
    ],
  },
  {
    type: 'attribute',
    name: '+ Max Health',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'maxLife',
        amounts: [10, 20, 50, 80],
        triggers: [
          (player, amount) => {
            const percent = player.maxLife / amount;
            player.life += player.maxLife / percent;
            window.renderPlayerLife();
          },
        ],
      },
    ],
  },
  {
    type: 'attribute',
    name: '+ Max Speed',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'maxSpeed',
        amounts: [2, 4, 8, 12],
      },
    ],
  },
  {
    type: 'attribute',
    name: '+ Bullet Speed',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'bulletSpeed',
        amounts: [2, 4, 7, 12],
      },
    ],
  },
  {
    type: 'attribute',
    name: '- Bullet Cooldown',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'bulletCooldown',
        amounts: [-12, -16, -20, -26],
      },
    ],
  },
  {
    type: 'attribute',
    name: '+ XP Multiplier',
    weight: 8,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'xpMulti',
        amounts: [0.4, 1, 2, 4],
      },
    ],
  },
  {
    type: 'attribute',
    name: '+ Critical Chance',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'critChance',
        amounts: [4, 7, 12, 18],
      },
    ],
  },
  {
    type: 'attribute',
    name: '+ Critical Multiplier',
    weight: 5,
    rarity_weights: [9, 6, 4, 2],
    modifiers: [
      {
        key: 'critDamageMulti',
        amounts: [0.07, 0.15, 0.35, 0.5],
      },
    ],
  },
  {
    type: 'ability',
    name: 'Laser',
    weight: 10,
    //weight: 500,
  },
  {
    type: 'ability',
    name: 'Explode',
    weight: 7,
    //weight: 500,
  },
  {
    type: 'ability',
    name: 'Slash',
    weight: 10,
    //weight: 500,
  },
];

export const ITEM_TYPES = [
  {
    name: 'Extra Projectile',
    image: document.getElementById('img_bullet'),
    permanent: false,
    duration: 20,
    weight: 17,
    modifiers: [
      {
        key: 'bulletsFired',
        amount: 2,
      },
    ],
  },
  {
    name: 'Bullet Hell',
    image: document.getElementById('img_bullets'),
    permanent: false,
    duration: 10,
    weight: 3,
    modifiers: [
      {
        key: 'bulletsFired',
        amount: 8,
      },
    ],
  },
  {
    name: 'Laser',
    isAbility: true,
    cooldown: 5000,
    currentTick: 5000,
    trigger: (player, cx, cy) => {
      console.log('kamehameha!');
      addAbilityEffect(
        new Kamehameha(player.x, player.y, 20, 'yellow', { x: 0, y: 0 }, cx, cy)
      );
    },
  },
  {
    name: 'Explode',
    isAbility: true,
    cooldown: 3000,
    currentTick: 3000,
    trigger: (player, cx, cy) => {
      console.log('solar flare!');
      addAbilityEffect(new SolarFlare(player.x, player.y, 20));
    },
  },
  {
    name: 'Slash',
    isAbility: true,
    cooldown: 1000,
    currentTick: 1000,
    trigger: (player, cx, cy) => {
      console.log('slash!');
      addAbilityEffect(
        new Slash(player.x, player.y, 20, 'yellow', { x: 0, y: 0 }, cx, cy)
      );
    },
  },
];

export let bullets = [];
export const addBullet = (b) => bullets.push(b);
export const removeBullet = (i) => bullets.splice(i, 1);
export const clearBullets = () => (bullets = []);

export let enemies = [];
export const addEnemy = (e) => enemies.push(e);
export const removeEnemy = (i) => enemies.splice(i, 1);
export const clearEnemies = () => (enemies = []);

export let particles = [];
export const addParticle = (p) => particles.push(p);
export const removeParticle = (i) => particles.splice(i, 1);
export const clearParticles = () => (particles = []);

export let items = [];
export const addItem = (i) => items.push(i);
export const removeItem = (i) => items.splice(i, 1);
export const clearItems = () => (items = []);

export let abilityEffects = [];
export const addAbilityEffect = (e) => abilityEffects.push(e);
export const removeAbilityEffect = (i) => abilityEffects.splice(i, 1);
export const clearAbilityEffects = () => (abilityEffects = []);

export let damageTexts = [];
export const addDamageText = (i) => damageTexts.push(i);
export const removeDamageText = (i) => damageTexts.splice(i, 1);
export const clearDamageTexts = () => (damageTexts = []);

export let score = 0;
export const addScore = (amnt) => (score += amnt);
export const resetScore = () => (score = 0);

export const set_x = (val) => (x = val);
export const set_y = (val) => (y = val);