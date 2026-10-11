import { beforeEach, describe, expect, it } from 'vitest';
import { useConnectionStore } from './useConnectionStore';

describe('useConnectionStore', () => {
  beforeEach(() => {
    useConnectionStore.setState({ online: true });
  });

  it('is online by default', () => {
    expect(useConnectionStore.getState().online).toBe(true);
  });

  it('setOnline switches the connection state', () => {
    useConnectionStore.getState().setOnline(false);
    expect(useConnectionStore.getState().online).toBe(false);

    useConnectionStore.getState().setOnline(true);
    expect(useConnectionStore.getState().online).toBe(true);
  });
});
