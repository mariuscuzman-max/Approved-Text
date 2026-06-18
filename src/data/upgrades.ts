import type { UpgradeDefinition, UpgradePath } from '../types/game';

export const upgrades: UpgradeDefinition[] = [
  {
    id: 'better-basket',
    name: 'Better Basket',
    path: 'farm',
    cost: 1,
    description: 'A small basket for carrying officially recognized fruit.',
    effectLabel: 'World tap value +0.01',
    effectType: 'addTapValue',
    effectValue: 0.01,
  },
  {
    id: 'orchard-permit',
    name: 'Orchard Permit',
    path: 'farm',
    cost: 5,
    description: 'The Office now permits worlds to exist in larger quantities.',
    effectLabel: 'World tap value x2',
    effectType: 'multiplyTapValue',
    effectValue: 2,
  },
  {
    id: 'harvest-routine',
    name: 'Harvest Routine',
    path: 'farm',
    cost: 25,
    description: 'Repeated stamping has been classified as agricultural labor.',
    effectLabel: 'Every 10 stamps grants 5x tap value',
    effectType: 'harvestRoutine',
    effectValue: 5,
  },
  {
    id: 'leaking-tap',
    name: 'Leaking Tap',
    path: 'water',
    cost: 1,
    description: 'A small leak. Officially approved.',
    effectLabel: '+0.005 Meaning/sec',
    effectType: 'addPassiveMeaning',
    effectValue: 0.005,
  },
  {
    id: 'rain-barrel',
    name: 'Rain Barrel',
    path: 'water',
    cost: 5,
    description: 'Collected rain tends to remember where it fell.',
    effectLabel: 'Passive Meaning/sec x2',
    effectType: 'multiplyPassiveMeaning',
    effectValue: 2,
  },
  {
    id: 'irrigation-form',
    name: 'Irrigation Form',
    path: 'water',
    cost: 25,
    description: 'A form authorizing water to move with purpose.',
    effectLabel: '+0.02 Meaning/sec',
    effectType: 'addPassiveMeaning',
    effectValue: 0.02,
  },
];

export function getUpgradesForPath(path: UpgradePath): UpgradeDefinition[] {
  return upgrades.filter((upgrade) => upgrade.path === path);
}
