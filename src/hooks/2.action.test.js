import { renderHook, act } from '@testing-library/react-hooks'
import { useAction } from './2.action'

const mockResolveFn = jest.fn(() => Promise.resolve('OK'));
const mockRejectFn = jest.fn(() => Promise.reject('YOU SUCK'));

describe('useAction', () => {
    it('should contain successful result', async () => {
        const { result } = renderHook(() => useAction(mockResolveFn));

        await act(async () => result.current[1]());

        expect(result.current[0].result).toBe('OK');
    });

    it('should contain rejected result', async () => {
        const { result } = renderHook(() => useAction(mockRejectFn));
        
        await act(async () => result.current[1]());

        expect(result.current[0].error).toBe('YOU SUCK');
    })
})