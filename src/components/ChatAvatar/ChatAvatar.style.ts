export const avatarSx = (background: string, size: number) => ({
  width: size,
  height: size,
  flexShrink: 0,
  background,
  color: '#fff',
  fontSize: Math.round(size * 0.38),
  fontWeight: 600,
});
