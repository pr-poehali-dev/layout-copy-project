import React, { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

// Types
interface Player {
  level: number;
  exp: number;
  expToNext: number;
  hp: number;
  maxHp: number;
  gold: number;
  attack: number;
  defense: number;
  critChance: number;
  equipment: Equipment;
  appearance: Appearance;
}

interface Equipment {
  weapon: Item | null;
  armor: Item | null;
  accessory: Item | null;
}

interface Appearance {
  hairColor: string;
  armorStyle: string;
}

interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  attack?: number;
  defense?: number;
  hp?: number;
  critChance?: number;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  level: number;
}

interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  gold: number;
  exp: number;
}

interface Dungeon {
  id: string;
  name: string;
  difficulty: number;
  description: string;
  waves: number;
  enemyTypes: string[];
  minLevel: number;
}

interface GameState {
  currentScreen: 'locations' | 'inventory' | 'profile' | 'shop' | 'forge' | 'dungeon';
  selectedDungeon: string | null;
  currentWave: number;
  enemies: Enemy[];
  currentEnemyIndex: number;
  inCombat: boolean;
  waveBreak: boolean;
  breakTimer: number;
  darkMode: boolean;
}

const FantasyRPG: React.FC = () => {
  // Game state
  const [player, setPlayer] = useState<Player>({
    level: 1,
    exp: 0,
    expToNext: 100,
    hp: 100,
    maxHp: 100,
    gold: 50,
    attack: 10,
    defense: 5,
    critChance: 5,
    equipment: { weapon: null, armor: null, accessory: null },
    appearance: { hairColor: '#8B4513', armorStyle: 'leather' }
  });

  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'locations',
    selectedDungeon: null,
    currentWave: 0,
    enemies: [],
    currentEnemyIndex: 0,
    inCombat: false,
    waveBreak: false,
    breakTimer: 0,
    darkMode: false
  });

  const [inventory, setInventory] = useState<Item[]>([]);

  // Dungeons data
  const dungeons: Dungeon[] = [
    { id: 'goblin_caves', name: 'Пещеры гоблинов', difficulty: 1, description: 'Тёмные пещеры, кишащие злобными гоблинами', waves: 3, enemyTypes: ['goblin', 'goblin_warrior'], minLevel: 1 },
    { id: 'spider_nest', name: 'Паучье логово', difficulty: 2, description: 'Запутанные туннели, полные ядовитых пауков', waves: 4, enemyTypes: ['spider', 'giant_spider'], minLevel: 5 },
    { id: 'undead_crypt', name: 'Склеп мертвецов', difficulty: 3, description: 'Древнее кладбище с восставшими мертвыми', waves: 5, enemyTypes: ['skeleton', 'zombie', 'wraith'], minLevel: 10 },
    { id: 'orc_stronghold', name: 'Крепость орков', difficulty: 4, description: 'Укреплённая крепость жестоких орков', waves: 6, enemyTypes: ['orc', 'orc_berserker', 'orc_shaman'], minLevel: 15 },
    { id: 'elemental_caverns', name: 'Пещеры стихий', difficulty: 5, description: 'Магические пещеры с элементалями', waves: 7, enemyTypes: ['fire_elemental', 'ice_elemental', 'earth_elemental'], minLevel: 25 },
    { id: 'troll_bridge', name: 'Мост троллей', difficulty: 6, description: 'Древний мост, охраняемый могучими троллями', waves: 8, enemyTypes: ['troll', 'cave_troll', 'mountain_troll'], minLevel: 35 },
    { id: 'dark_forest', name: 'Тёмный лес', difficulty: 7, description: 'Проклятый лес с тёмными существами', waves: 9, enemyTypes: ['dire_wolf', 'dark_elf', 'treant'], minLevel: 45 },
    { id: 'demon_portal', name: 'Демонический портал', difficulty: 8, description: 'Портал в преисподнюю с демонами', waves: 10, enemyTypes: ['imp', 'demon', 'shadow_demon'], minLevel: 55 },
    { id: 'dragon_lair', name: 'Логово дракона', difficulty: 9, description: 'Пещера древнего дракона и его прислужников', waves: 8, enemyTypes: ['kobold', 'dragonkin', 'young_dragon'], minLevel: 70 },
    { id: 'void_realm', name: 'Царство Пустоты', difficulty: 10, description: 'Измерение хаоса с неописуемыми ужасами', waves: 12, enemyTypes: ['void_spawn', 'chaos_beast', 'void_lord'], minLevel: 85 }
  ];

  // Enemy templates
  const enemyTemplates = {
    goblin: { name: 'Гоблин', baseHp: 25, baseAttack: 8, baseDefense: 2, baseGold: 5, baseExp: 15 },
    goblin_warrior: { name: 'Гоблин-воин', baseHp: 40, baseAttack: 12, baseDefense: 4, baseGold: 8, baseExp: 25 },
    spider: { name: 'Паук', baseHp: 30, baseAttack: 10, baseDefense: 1, baseGold: 6, baseExp: 18 },
    giant_spider: { name: 'Гигантский паук', baseHp: 60, baseAttack: 18, baseDefense: 3, baseGold: 12, baseExp: 35 },
    skeleton: { name: 'Скелет', baseHp: 35, baseAttack: 14, baseDefense: 6, baseGold: 8, baseExp: 20 },
    zombie: { name: 'Зомби', baseHp: 80, baseAttack: 16, baseDefense: 8, baseGold: 10, baseExp: 30 },
    wraith: { name: 'Призрак', baseHp: 45, baseAttack: 20, baseDefense: 2, baseGold: 15, baseExp: 40 },
    orc: { name: 'Орк', baseHp: 70, baseAttack: 22, baseDefense: 10, baseGold: 15, baseExp: 45 },
    orc_berserker: { name: 'Орк-берсерк', baseHp: 90, baseAttack: 28, baseDefense: 8, baseGold: 20, baseExp: 60 },
    orc_shaman: { name: 'Орк-шаман', baseHp: 65, baseAttack: 25, baseDefense: 12, baseGold: 25, baseExp: 55 },
    fire_elemental: { name: 'Огненный элементаль', baseHp: 100, baseAttack: 35, baseDefense: 15, baseGold: 30, baseExp: 75 },
    ice_elemental: { name: 'Ледяной элементаль', baseHp: 120, baseAttack: 30, baseDefense: 20, baseGold: 35, baseExp: 80 },
    earth_elemental: { name: 'Земляной элементаль', baseHp: 150, baseAttack: 25, baseDefense: 25, baseGold: 40, baseExp: 85 },
    troll: { name: 'Тролль', baseHp: 200, baseAttack: 40, baseDefense: 30, baseGold: 50, baseExp: 120 },
    cave_troll: { name: 'Пещерный тролль', baseHp: 250, baseAttack: 45, baseDefense: 35, baseGold: 60, baseExp: 140 },
    mountain_troll: { name: 'Горный тролль', baseHp: 300, baseAttack: 50, baseDefense: 40, baseGold: 75, baseExp: 160 },
    dire_wolf: { name: 'Лютый волк', baseHp: 180, baseAttack: 55, baseDefense: 25, baseGold: 45, baseExp: 130 },
    dark_elf: { name: 'Тёмный эльф', baseHp: 160, baseAttack: 60, baseDefense: 30, baseGold: 65, baseExp: 150 },
    treant: { name: 'Энт', baseHp: 350, baseAttack: 45, baseDefense: 50, baseGold: 80, baseExp: 180 },
    imp: { name: 'Бес', baseHp: 120, baseAttack: 65, baseDefense: 20, baseGold: 55, baseExp: 140 },
    demon: { name: 'Демон', baseHp: 400, baseAttack: 75, baseDefense: 45, baseGold: 100, baseExp: 220 },
    shadow_demon: { name: 'Теневой демон', baseHp: 300, baseAttack: 85, baseDefense: 35, baseGold: 120, baseExp: 250 },
    kobold: { name: 'Кобольд', baseHp: 250, baseAttack: 70, baseDefense: 40, baseGold: 80, baseExp: 180 },
    dragonkin: { name: 'Драконид', baseHp: 500, baseAttack: 90, baseDefense: 60, baseGold: 150, baseExp: 300 },
    young_dragon: { name: 'Молодой дракон', baseHp: 800, baseAttack: 120, baseDefense: 80, baseGold: 300, baseExp: 500 },
    void_spawn: { name: 'Порождение Пустоты', baseHp: 600, baseAttack: 100, baseDefense: 50, baseGold: 200, baseExp: 400 },
    chaos_beast: { name: 'Зверь Хаоса', baseHp: 900, baseAttack: 130, baseDefense: 70, baseGold: 350, baseExp: 600 },
    void_lord: { name: 'Повелитель Пустоты', baseHp: 1500, baseAttack: 180, baseDefense: 100, baseGold: 500, baseExp: 1000 }
  };

  // Items data
  const shopItems: Item[] = [
    // Weapons
    { id: 'iron_sword', name: 'Железный меч', type: 'weapon', attack: 15, price: 100, rarity: 'common', level: 1 },
    { id: 'steel_sword', name: 'Стальной меч', type: 'weapon', attack: 25, price: 300, rarity: 'common', level: 10 },
    { id: 'enchanted_blade', name: 'Зачарованный клинок', type: 'weapon', attack: 40, critChance: 10, price: 800, rarity: 'rare', level: 20 },
    { id: 'flame_sword', name: 'Огненный меч', type: 'weapon', attack: 60, critChance: 15, price: 2000, rarity: 'epic', level: 35 },
    { id: 'dragon_slayer', name: 'Драконоборец', type: 'weapon', attack: 100, critChance: 25, price: 10000, rarity: 'legendary', level: 60 },
    
    // Armor
    { id: 'leather_armor', name: 'Кожаная броня', type: 'armor', defense: 10, hp: 20, price: 80, rarity: 'common', level: 1 },
    { id: 'chain_mail', name: 'Кольчуга', type: 'armor', defense: 20, hp: 40, price: 250, rarity: 'common', level: 8 },
    { id: 'plate_armor', name: 'Латная броня', type: 'armor', defense: 35, hp: 80, price: 600, rarity: 'rare', level: 18 },
    { id: 'magic_robes', name: 'Магические одеяния', type: 'armor', defense: 25, hp: 100, critChance: 8, price: 1200, rarity: 'epic', level: 30 },
    { id: 'dragon_scale', name: 'Драконья чешуя', type: 'armor', defense: 60, hp: 200, critChance: 12, price: 8000, rarity: 'legendary', level: 55 },
    
    // Accessories
    { id: 'power_ring', name: 'Кольцо силы', type: 'accessory', attack: 8, price: 150, rarity: 'common', level: 5 },
    { id: 'health_amulet', name: 'Амулет здоровья', type: 'accessory', hp: 50, price: 200, rarity: 'common', level: 7 },
    { id: 'crit_pendant', name: 'Кулон критов', type: 'accessory', critChance: 12, price: 500, rarity: 'rare', level: 15 },
    { id: 'berserker_ring', name: 'Кольцо берсерка', type: 'accessory', attack: 25, critChance: 8, price: 1500, rarity: 'epic', level: 28 },
    { id: 'immortal_pendant', name: 'Кулон бессмертия', type: 'accessory', hp: 150, defense: 20, critChance: 15, price: 6000, rarity: 'legendary', level: 50 }
  ];

  // Load game data
  useEffect(() => {
    const savedData = localStorage.getItem('fantasyRPG');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPlayer(data.player || player);
      setInventory(data.inventory || []);
      setGameState(prev => ({ ...prev, darkMode: data.darkMode || false }));
    }
  }, []);

  // Save game data
  const saveGame = useCallback(() => {
    const saveData = {
      player,
      inventory,
      darkMode: gameState.darkMode
    };
    localStorage.setItem('fantasyRPG', JSON.stringify(saveData));
  }, [player, inventory, gameState.darkMode]);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(saveGame, 10000);
    return () => clearInterval(interval);
  }, [saveGame]);

  // Calculate player stats
  const getPlayerStats = useCallback(() => {
    let totalAttack = player.attack;
    let totalDefense = player.defense;
    let totalHp = player.maxHp;
    let totalCrit = player.critChance;

    if (player.equipment.weapon) {
      totalAttack += player.equipment.weapon.attack || 0;
      totalCrit += player.equipment.weapon.critChance || 0;
    }
    if (player.equipment.armor) {
      totalDefense += player.equipment.armor.defense || 0;
      totalHp += player.equipment.armor.hp || 0;
      totalCrit += player.equipment.armor.critChance || 0;
    }
    if (player.equipment.accessory) {
      totalAttack += player.equipment.accessory.attack || 0;
      totalDefense += player.equipment.accessory.defense || 0;
      totalHp += player.equipment.accessory.hp || 0;
      totalCrit += player.equipment.accessory.critChance || 0;
    }

    return { totalAttack, totalDefense, totalHp, totalCrit };
  }, [player]);

  // Level up logic
  const checkLevelUp = useCallback(() => {
    setPlayer(prev => {
      if (prev.exp >= prev.expToNext) {
        const newLevel = prev.level + 1;
        const remainingExp = prev.exp - prev.expToNext;
        const newExpToNext = Math.floor(100 * Math.pow(1.15, newLevel - 1));
        const hpIncrease = 20 + Math.floor(newLevel * 2);
        const attackIncrease = 2 + Math.floor(newLevel * 0.5);
        const defenseIncrease = 1 + Math.floor(newLevel * 0.3);

        return {
          ...prev,
          level: newLevel,
          exp: remainingExp,
          expToNext: newExpToNext,
          maxHp: prev.maxHp + hpIncrease,
          hp: prev.maxHp + hpIncrease, // Full heal on level up
          attack: prev.attack + attackIncrease,
          defense: prev.defense + defenseIncrease,
          critChance: prev.critChance + 0.5
        };
      }
      return prev;
    });
  }, []);

  // Create enemy based on template and level scaling
  const createEnemy = useCallback((templateKey: string, dungeonLevel: number): Enemy => {
    const template = enemyTemplates[templateKey as keyof typeof enemyTemplates];
    const levelMultiplier = 1 + (dungeonLevel - 1) * 0.3 + (player.level - 1) * 0.1;
    
    const scaledHp = Math.floor(template.baseHp * levelMultiplier);
    const scaledAttack = Math.floor(template.baseAttack * levelMultiplier);
    const scaledDefense = Math.floor(template.baseDefense * levelMultiplier);
    const scaledGold = Math.floor(template.baseGold * levelMultiplier);
    const scaledExp = Math.floor(template.baseExp * levelMultiplier);

    return {
      id: `${templateKey}_${Date.now()}_${Math.random()}`,
      name: template.name,
      hp: scaledHp,
      maxHp: scaledHp,
      attack: scaledAttack,
      defense: scaledDefense,
      gold: scaledGold,
      exp: scaledExp
    };
  }, [player.level]);

  // Start dungeon
  const startDungeon = (dungeonId: string) => {
    const dungeon = dungeons.find(d => d.id === dungeonId);
    if (!dungeon || player.level < dungeon.minLevel) return;

    // Generate first wave
    const enemies = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () => {
      const randomEnemyType = dungeon.enemyTypes[Math.floor(Math.random() * dungeon.enemyTypes.length)];
      return createEnemy(randomEnemyType, dungeon.difficulty);
    });

    setGameState(prev => ({
      ...prev,
      currentScreen: 'dungeon',
      selectedDungeon: dungeonId,
      currentWave: 1,
      enemies,
      currentEnemyIndex: 0,
      inCombat: true,
      waveBreak: false
    }));
  };

  // Combat logic
  const attack = useCallback(() => {
    if (!gameState.inCombat || gameState.enemies.length === 0) return;

    const currentEnemy = gameState.enemies[gameState.currentEnemyIndex];
    if (!currentEnemy || currentEnemy.hp <= 0) return;

    const stats = getPlayerStats();
    const isCrit = Math.random() * 100 < stats.totalCrit;
    const damage = Math.max(1, Math.floor((stats.totalAttack * (isCrit ? 2 : 1)) - currentEnemy.defense * 0.5));

    // Update enemy HP
    const updatedEnemies = [...gameState.enemies];
    updatedEnemies[gameState.currentEnemyIndex] = {
      ...currentEnemy,
      hp: Math.max(0, currentEnemy.hp - damage)
    };

    setGameState(prev => ({ ...prev, enemies: updatedEnemies }));

    // Check if enemy died
    if (updatedEnemies[gameState.currentEnemyIndex].hp <= 0) {
      // Give rewards
      setPlayer(prev => ({
        ...prev,
        gold: prev.gold + currentEnemy.gold,
        exp: prev.exp + currentEnemy.exp
      }));

      // Check if all enemies in wave are dead
      const allDead = updatedEnemies.every(enemy => enemy.hp <= 0);
      if (allDead) {
        // Start next wave or finish dungeon
        const dungeon = dungeons.find(d => d.id === gameState.selectedDungeon);
        if (dungeon && gameState.currentWave < dungeon.waves) {
          // Start wave break
          setGameState(prev => ({
            ...prev,
            waveBreak: true,
            breakTimer: 3,
            inCombat: false
          }));
        } else {
          // Dungeon completed
          setGameState(prev => ({
            ...prev,
            currentScreen: 'locations',
            selectedDungeon: null,
            inCombat: false
          }));
        }
      } else {
        // Move to next enemy
        const nextAliveIndex = updatedEnemies.findIndex((enemy, index) => 
          index > gameState.currentEnemyIndex && enemy.hp > 0
        );
        if (nextAliveIndex !== -1) {
          setGameState(prev => ({ ...prev, currentEnemyIndex: nextAliveIndex }));
        }
      }
    }
  }, [gameState, getPlayerStats]);

  // Enemy attack
  const enemyAttack = useCallback(() => {
    if (!gameState.inCombat || gameState.enemies.length === 0) return;

    const currentEnemy = gameState.enemies[gameState.currentEnemyIndex];
    if (!currentEnemy || currentEnemy.hp <= 0) return;

    const stats = getPlayerStats();
    const damage = Math.max(1, Math.floor(currentEnemy.attack - stats.totalDefense * 0.5));

    setPlayer(prev => ({
      ...prev,
      hp: Math.max(0, prev.hp - damage)
    }));
  }, [gameState, getPlayerStats]);

  // Combat timer
  useEffect(() => {
    if (gameState.inCombat && !gameState.waveBreak) {
      const interval = setInterval(() => {
        attack();
        setTimeout(enemyAttack, 500);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameState.inCombat, gameState.waveBreak, attack, enemyAttack]);

  // Wave break timer
  useEffect(() => {
    if (gameState.waveBreak && gameState.breakTimer > 0) {
      const timeout = setTimeout(() => {
        setGameState(prev => {
          if (prev.breakTimer <= 1) {
            // Start next wave
            const dungeon = dungeons.find(d => d.id === prev.selectedDungeon);
            if (dungeon) {
              const enemies = Array.from({ length: Math.floor(Math.random() * 6) + 2 }, () => {
                const randomEnemyType = dungeon.enemyTypes[Math.floor(Math.random() * dungeon.enemyTypes.length)];
                return createEnemy(randomEnemyType, dungeon.difficulty);
              });

              return {
                ...prev,
                currentWave: prev.currentWave + 1,
                enemies,
                currentEnemyIndex: 0,
                inCombat: true,
                waveBreak: false,
                breakTimer: 0
              };
            }
          }
          return { ...prev, breakTimer: prev.breakTimer - 1 };
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.waveBreak, gameState.breakTimer, createEnemy]);

  // Check level up
  useEffect(() => {
    checkLevelUp();
  }, [player.exp, checkLevelUp]);

  // Equipment functions
  const equipItem = (item: Item) => {
    setPlayer(prev => {
      const newEquipment = { ...prev.equipment };
      const oldItem = newEquipment[item.type];
      
      newEquipment[item.type] = item;
      
      return { ...prev, equipment: newEquipment };
    });

    setInventory(prev => prev.filter(i => i.id !== item.id));
  };

  const unequipItem = (type: keyof Equipment) => {
    const item = player.equipment[type];
    if (!item) return;

    setPlayer(prev => ({
      ...prev,
      equipment: { ...prev.equipment, [type]: null }
    }));

    setInventory(prev => [...prev, item]);
  };

  const buyItem = (item: Item) => {
    if (player.gold >= item.price && player.level >= item.level) {
      setPlayer(prev => ({ ...prev, gold: prev.gold - item.price }));
      setInventory(prev => [...prev, item]);
    }
  };

  const sellItem = (item: Item) => {
    const sellPrice = Math.floor(item.price * 0.6);
    setPlayer(prev => ({ ...prev, gold: prev.gold + sellPrice }));
    setInventory(prev => prev.filter(i => i.id !== item.id));
  };

  // Render functions
  const renderHeader = () => {
    const stats = getPlayerStats();
    return (
      <header className={`sticky top-0 z-50 border-b p-4 ${gameState.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGameState(prev => ({ ...prev, darkMode: !prev.darkMode }))}
              className="text-lg"
            >
              {gameState.darkMode ? '🔆' : '🌙'}
            </Button>
            <div className="text-sm font-medium">
              Уровень {player.level}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Heart" size={16} className="text-red-500" />
              <div className="flex items-center gap-2">
                <div className={`w-24 h-2 rounded-full overflow-hidden ${gameState.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${(player.hp / stats.totalHp) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium min-w-0">
                  {player.hp}/{stats.totalHp}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-yellow-500">💰</span>
              <span className="font-medium">{player.gold.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderNavigation = () => (
    <nav className={`border-b p-4 ${gameState.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex gap-4 max-w-6xl mx-auto">
        {['locations', 'inventory', 'profile'].map(screen => (
          <Button
            key={screen}
            variant={gameState.currentScreen === screen ? 'default' : 'ghost'}
            onClick={() => setGameState(prev => ({ ...prev, currentScreen: screen as any }))}
            className="capitalize"
          >
            {screen === 'locations' && <Icon name="MapPin" size={16} className="mr-2" />}
            {screen === 'inventory' && <Icon name="Package" size={16} className="mr-2" />}
            {screen === 'profile' && <Icon name="User" size={16} className="mr-2" />}
            {screen === 'locations' ? 'Локации' : screen === 'inventory' ? 'Инвентарь' : 'Профиль'}
          </Button>
        ))}
      </div>
    </nav>
  );

  const renderLocations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Город</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          onClick={() => setGameState(prev => ({ ...prev, currentScreen: 'shop' }))}
        >
          <Icon name="ShoppingBag" size={24} className="mb-2" />
          <span>Магазин</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          onClick={() => setGameState(prev => ({ ...prev, currentScreen: 'forge' }))}
        >
          <Icon name="Hammer" size={24} className="mb-2" />
          <span>Кузница</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-24 flex flex-col items-center justify-center"
          onClick={() => setGameState(prev => ({ ...prev, currentScreen: 'dungeons' }))}
        >
          <Icon name="Sword" size={24} className="mb-2" />
          <span>Подземелья</span>
        </Button>
      </div>

      {gameState.currentScreen === 'dungeons' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Выберите подземелье</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dungeons.map(dungeon => (
              <div
                key={dungeon.id}
                className={`p-4 rounded-lg border ${
                  player.level >= dungeon.minLevel 
                    ? gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white cursor-pointer hover:bg-gray-50'
                    : 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => player.level >= dungeon.minLevel && startDungeon(dungeon.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{dungeon.name}</h4>
                  <div className="flex">
                    {Array.from({ length: dungeon.difficulty }, (_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{dungeon.description}</p>
                <div className="text-xs text-gray-500">
                  Мин. уровень: {dungeon.minLevel} | Волн: {dungeon.waves}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderShop = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setGameState(prev => ({ ...prev, currentScreen: 'locations' }))}>
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>
        <h2 className="text-2xl font-bold">Магазин</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems.filter(item => player.level >= item.level).map(item => (
          <div key={item.id} className={`p-4 rounded-lg border ${gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{item.name}</h4>
              <span className={`text-xs px-2 py-1 rounded ${
                item.rarity === 'legendary' ? 'bg-orange-500 text-white' :
                item.rarity === 'epic' ? 'bg-purple-500 text-white' :
                item.rarity === 'rare' ? 'bg-blue-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {item.rarity}
              </span>
            </div>
            
            <div className="text-sm space-y-1 mb-3">
              {item.attack && <div>Атака: +{item.attack}</div>}
              {item.defense && <div>Защита: +{item.defense}</div>}
              {item.hp && <div>HP: +{item.hp}</div>}
              {item.critChance && <div>Крит. шанс: +{item.critChance}%</div>}
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-yellow-600">💰 {item.price}</span>
              <Button
                size="sm"
                disabled={player.gold < item.price}
                onClick={() => buyItem(item)}
              >
                Купить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Инвентарь</h2>
      
      {/* Equipment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Экипировка</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['weapon', 'armor', 'accessory'] as const).map(type => (
            <div key={type} className={`p-4 rounded-lg border ${gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              <h4 className="font-medium mb-2 capitalize">
                {type === 'weapon' ? 'Оружие' : type === 'armor' ? 'Броня' : 'Аксессуар'}
              </h4>
              {player.equipment[type] ? (
                <div>
                  <div className="font-medium text-sm">{player.equipment[type]!.name}</div>
                  <div className="text-xs text-gray-500 space-y-1 mt-1">
                    {player.equipment[type]!.attack && <div>Атака: +{player.equipment[type]!.attack}</div>}
                    {player.equipment[type]!.defense && <div>Защита: +{player.equipment[type]!.defense}</div>}
                    {player.equipment[type]!.hp && <div>HP: +{player.equipment[type]!.hp}</div>}
                    {player.equipment[type]!.critChance && <div>Крит: +{player.equipment[type]!.critChance}%</div>}
                  </div>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => unequipItem(type)}>
                    Снять
                  </Button>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">Пусто</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inventory items */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Предметы</h3>
        {inventory.length === 0 ? (
          <div className="text-gray-500">Инвентарь пуст</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.map(item => (
              <div key={item.id} className={`p-4 rounded-lg border ${gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <div className="text-xs text-gray-500 space-y-1 mt-1 mb-3">
                  {item.attack && <div>Атака: +{item.attack}</div>}
                  {item.defense && <div>Защита: +{item.defense}</div>}
                  {item.hp && <div>HP: +{item.hp}</div>}
                  {item.critChance && <div>Крит: +{item.critChance}%</div>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => equipItem(item)}>
                    Надеть
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => sellItem(item)}>
                    Продать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => {
    const stats = getPlayerStats();
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Профиль</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats */}
          <div className={`p-6 rounded-lg border ${gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h3 className="text-lg font-semibold mb-4">Характеристики</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Уровень:</span>
                <span className="font-medium">{player.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Опыт:</span>
                <span className="font-medium">{player.exp}/{player.expToNext}</span>
              </div>
              <div className="flex justify-between">
                <span>Здоровье:</span>
                <span className="font-medium">{stats.totalHp}</span>
              </div>
              <div className="flex justify-between">
                <span>Атака:</span>
                <span className="font-medium">{stats.totalAttack}</span>
              </div>
              <div className="flex justify-between">
                <span>Защита:</span>
                <span className="font-medium">{stats.totalDefense}</span>
              </div>
              <div className="flex justify-between">
                <span>Крит. шанс:</span>
                <span className="font-medium">{stats.totalCrit.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className={`p-6 rounded-lg border ${gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <h3 className="text-lg font-semibold mb-4">Внешность</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Цвет волос</label>
                <input
                  type="color"
                  value={player.appearance.hairColor}
                  onChange={(e) => setPlayer(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, hairColor: e.target.value }
                  }))}
                  className="w-full h-10 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Стиль брони</label>
                <select
                  value={player.appearance.armorStyle}
                  onChange={(e) => setPlayer(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, armorStyle: e.target.value }
                  }))}
                  className="w-full p-2 rounded border bg-background"
                >
                  <option value="leather">Кожаная</option>
                  <option value="chain">Кольчужная</option>
                  <option value="plate">Латная</option>
                  <option value="robe">Мантия</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDungeon = () => {
    const dungeon = dungeons.find(d => d.id === gameState.selectedDungeon);
    if (!dungeon) return null;

    const currentEnemy = gameState.enemies[gameState.currentEnemyIndex];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => setGameState(prev => ({ 
              ...prev, 
              currentScreen: 'locations',
              selectedDungeon: null,
              inCombat: false 
            }))}
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Покинуть подземелье
          </Button>
          <h2 className="text-2xl font-bold">{dungeon.name}</h2>
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold">
            Волна {gameState.currentWave} из {dungeon.waves}
          </div>
          {gameState.waveBreak && (
            <div className="text-yellow-600 font-medium">
              Приготовьтесь! {gameState.breakTimer}
            </div>
          )}
        </div>

        {gameState.enemies.length > 0 && !gameState.waveBreak && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Враги</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameState.enemies.map((enemy, index) => (
                <div
                  key={enemy.id}
                  className={`p-4 rounded-lg border transition-all ${
                    index === gameState.currentEnemyIndex
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : enemy.hp <= 0
                      ? 'border-gray-300 bg-gray-100 dark:bg-gray-800 opacity-50'
                      : gameState.darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-center">
                    <h4 className="font-semibold">{enemy.name}</h4>
                    {enemy.hp > 0 ? (
                      <>
                        <div className={`w-full h-2 rounded-full mt-2 mb-1 overflow-hidden ${gameState.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full bg-red-500 transition-all duration-300"
                            style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                          />
                        </div>
                        <div className="text-sm">{enemy.hp}/{enemy.maxHp} HP</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Атака: {enemy.attack} | Защита: {enemy.defense}
                        </div>
                      </>
                    ) : (
                      <div className="text-red-500 font-medium mt-2">💀 Убит</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {currentEnemy && currentEnemy.hp > 0 && (
              <div className="text-center">
                <div className="text-lg font-medium mb-2">
                  🎯 Цель: {currentEnemy.name}
                </div>
                <div className="text-sm text-gray-600">
                  Автоматическая атака каждые 2 секунды
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderForge = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => setGameState(prev => ({ ...prev, currentScreen: 'locations' }))}>
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>
        <h2 className="text-2xl font-bold">Кузница</h2>
      </div>
      
      <div className="text-center py-12">
        <Icon name="Hammer" size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Кузница временно закрыта</h3>
        <p className="text-gray-600">Улучшение предметов будет доступно в следующих обновлениях</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors ${gameState.darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {renderHeader()}
      {renderNavigation()}
      
      <main className="max-w-6xl mx-auto p-6">
        {gameState.currentScreen === 'locations' && renderLocations()}
        {gameState.currentScreen === 'dungeons' && renderLocations()}
        {gameState.currentScreen === 'shop' && renderShop()}
        {gameState.currentScreen === 'forge' && renderForge()}
        {gameState.currentScreen === 'inventory' && renderInventory()}
        {gameState.currentScreen === 'profile' && renderProfile()}
        {gameState.currentScreen === 'dungeon' && renderDungeon()}
      </main>
    </div>
  );
};

export default FantasyRPG;