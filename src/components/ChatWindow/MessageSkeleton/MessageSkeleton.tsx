import { Skeleton } from '@mui/material';
import { skeletonRows } from './messageSkeletonData';
import { skeletonSx } from './MessageSkeleton.style';
import styles from './MessageSkeleton.module.scss';

export const MessageSkeleton = () => {
  return (
    <div className={styles.skeleton} data-testid='message-skeleton'>
      {skeletonRows.map((el) => (
        <div key={el.id} className={el.outgoing ? `${styles.row} ${styles.outgoing}` : styles.row}>
          <Skeleton variant='rounded' width={el.width} height={36} sx={skeletonSx} />
        </div>
      ))}
    </div>
  );
};
