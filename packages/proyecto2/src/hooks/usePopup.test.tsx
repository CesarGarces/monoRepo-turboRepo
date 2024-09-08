import { renderHook, act } from '@testing-library/react';
import { usePopups } from './usePopups';

describe('usePopups', () => {
  it('should add a new popup', () => {
    const { result } = renderHook(() => usePopups());

    act(() => {
      result.current.addPopup('Test Title', 'Test Content');
    });

    expect(result.current.popups).toHaveLength(1);
    expect(result.current.popups[0].title).toBe('Test Title');
    expect(result.current.popups[0].content).toBe('Test Content');
  });

  it('should close a popup', () => {
    const { result } = renderHook(() => usePopups());

    act(() => {
      result.current.addPopup('Test Title', 'Test Content');
      const popupId = result.current.popups[0].id;
      result.current.closePopup(popupId);
    });

    expect(result.current.popups).toHaveLength(0);
  });
});