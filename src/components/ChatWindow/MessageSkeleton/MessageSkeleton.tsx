import { Box, Skeleton, Stack } from '@mui/material';
import { skeletonRows } from './messageSkeletonData';

export const MessageSkeleton = () => {
  return (
    <Stack data-testid='message-skeleton' sx={{ gap: 1 }}>
      {skeletonRows.map((el) => (
        <Box key={el.id} sx={{ display: 'flex', justifyContent: el.outgoing ? 'flex-end' : 'flex-start' }}>
          <Skeleton variant='rounded' width={el.width} height={36} sx={{ maxWidth: 360, borderRadius: 4 }} />
        </Box>
      ))}
    </Stack>
  );
};
