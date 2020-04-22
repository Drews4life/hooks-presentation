import React from 'react';
import GenericComponent from './component';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { act } from 'react-test-renderer'

import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

const mockFetchEvents = jest.fn(() => Promise.resolve(['ev1']))
const mockUpdateEvents = jest.fn();
const mockSendStatistics = jest.fn();

const props = {
    fetchCurrentEvents: mockFetchEvents,
    updateEvents: mockUpdateEvents,
    sendStatistics: mockSendStatistics,
}

// const comp = shallow(...) does not work for some reason
//  the shallow renderer doesn't do updates ?????

describe('GenericComponent', () => {
    let wrapper;

    beforeEach(async () => {
        //cuz useEffect calls async func then updates state
        await act(async () => {
            wrapper = mount(<GenericComponent {...props} />)
        })

        mockUpdateEvents.mockClear();
        mockSendStatistics.mockClear();
    });

    it('should add items to events on mount', () => {
        wrapper.update();

        expect(wrapper.find('.event').length).toBe(1)
    });

    it('should display items if toggle was called', () => {
        act(() => wrapper.find('.btn-event').props().onClick());

        wrapper.update();

        expect(wrapper.find('.event').length).toBe(2)
    });
    
    it('should show banner on toggle', () => {
        act(() => wrapper.find('.btn-banner').props().onClick());

        wrapper.update();

        expect(wrapper.find('.banner').exists()).toBe(true);
    });

    it('should show banner and panel on toggle', () => {
        act(() => {
            wrapper.find('.btn-banner').props().onClick()
            wrapper.find('.btn-panel').props().onClick()
        });

        wrapper.update();

        expect(wrapper.find('.panel').exists()).toBe(true);
    })

    it('should call update events when new event added', () => {
        act(() => wrapper.find('.btn-event').props().onClick());

        wrapper.update();

        expect(props.updateEvents).toHaveBeenCalledTimes(1);
    })


    it('should call send statistics when panel and banner status changes', () => {
        act(() => wrapper.find('.btn-panel').props().onClick());

        wrapper.update();

        expect(props.sendStatistics).toHaveBeenCalledTimes(1);

        act(() => wrapper.find('.btn-banner').props().onClick());

        wrapper.update();

        expect(props.sendStatistics).toHaveBeenCalledTimes(2);
    })

    it('should send statistics when component unmounts', () => {
        act(() => { wrapper.unmount() });

        expect(props.sendStatistics).toHaveBeenCalledTimes(1);
        expect(props.sendStatistics).toHaveBeenCalledWith('unmount');
    })
})