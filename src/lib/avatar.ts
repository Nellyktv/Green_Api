const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #6a5cff, #2fa8ff)',
  'linear-gradient(135deg, #ff7a59, #ff4f8b)',
  'linear-gradient(135deg, #22c197, #1aa1d6)',
  'linear-gradient(135deg, #ffb340, #ff7849)',
  'linear-gradient(135deg, #a35cff, #e05cff)',
  'linear-gradient(135deg, #3fc8ff, #3d6bff)',
];

// First letters of the first two words: "John Smith" → "JS". A phone number has no letters — returns ''
export const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.match(/\p{L}/u)?.[0] ?? '')
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const getAvatarGradient = (chatId: string) => {
  const hash = [...chatId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
};
