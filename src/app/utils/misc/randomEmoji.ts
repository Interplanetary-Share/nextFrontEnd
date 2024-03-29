import React from 'react';
const animalEmojis = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🐸',
  '🐵',
  '🐔',
  '🐧',
  '🐦',
  '🐤',
  '🐣',
  '🐥',
  '🦆',
  '🦅',
  '🦉',
  '🦇',
  '🐺',
  '🐗',
  '🐴',
  '🦄',
  '🐝',
  '🐛',
  '🦋',
  '🐌',
  '🐚',
  '🐞',
  '🐜',
  '🕷',
  '🦂',
  '🦀',
  '🦑',
  '🐙',
  '🦐',
  '🦞',
];

export const randomAnimalEmoji = () => {
  const randomIndex = Math.floor(Math.random() * animalEmojis.length);
  return animalEmojis[randomIndex];
};
