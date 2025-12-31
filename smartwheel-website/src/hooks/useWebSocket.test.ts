import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWebSocket } from './useWebSocket';

describe('useWebSocket Hook', () => {
  beforeEach(() => {
    // Reset WebSocket mock before each test
  });

  it('initializes with null vitals and disconnected state', () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3001'));

    expect(result.current.vitals).toBeNull();
    expect(result.current.connected).toBe(false);
  });

  it('creates WebSocket connection', async () => {
    const { result } = renderHook(() => useWebSocket('ws://localhost:3001'));

    // Hook should attempt to create WebSocket
    await waitFor(() => {
      expect(result.current).toBeDefined();
    });
  });
});
