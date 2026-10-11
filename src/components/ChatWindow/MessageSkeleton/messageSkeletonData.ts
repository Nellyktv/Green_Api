type SkeletonRow = { id: number; outgoing: boolean; width: string };

export const skeletonRows: SkeletonRow[] = [
  { id: 1, outgoing: false, width: '45%' },
  { id: 2, outgoing: false, width: '30%' },
  { id: 3, outgoing: true, width: '40%' },
  { id: 4, outgoing: false, width: '55%' },
  { id: 5, outgoing: true, width: '25%' },
  { id: 6, outgoing: true, width: '50%' },
];
