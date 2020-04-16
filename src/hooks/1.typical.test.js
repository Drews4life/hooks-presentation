import { renderHook, act } from '@testing-library/react-hooks'
import { useHover } from './1.typical'

it('should set hover status on mouse over', () => {
    const { result } = renderHook(() => useHover());

    expect(result.current[0]).toBe(false);

    act(() => {
        result.current[1].onMouseOver();
    })

    expect(result.current[0]).toBe(true);
});