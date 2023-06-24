import axios from 'axios';
import { describe, expect, beforeEach, vi, it } from 'vitest';
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';

import Heroes from '../components/heroes/Heroes.vue';
import { makeRemoteHeroes } from '@/factories/usecases/remote-heroes-factory';

const mockResolvedValueData = {
    "heroes": {
        "offset": 0,
        "limit": 5,
        "total": 1562,
        "count": 5,
        "results": [
            {
                "id": 1011334,
                "name": "3-D Man",
                "description": "",
                "modified": "2014-04-29T14:18:17-0400",
                "thumbnail": {
                    "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                    "extension": "jpg"
                },
                "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011334"
            }
        ],
        "page": 1,
        "pages": 313
    }

}

vi.mock('axios', () => {
    return {
        default: {
            request: vi.fn(() => Promise.resolve({ status: 200, data: mockResolvedValueData }))
        }
    }
})


describe('HeroesList', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(Heroes, {
            props: {
                remoteHeroes: makeRemoteHeroes(),
            },
            global: {
                stubs: {
                    Button: true,
                    Card: true,
                    InputText: true,
                    Paginator: true,
                    HeroCard: true
                }
            }
        });

    });

    it('should render heroes', async () => {
        await flushPromises()
        expect(wrapper.find('div.heroes-list__header')).toBeTruthy()

    })

    it('should fetch heroes', async () => {
        await flushPromises()
        expect(wrapper.findAll('[data-test="hero"]').length).toEqual(1);
    });

    it('should show heroes list with component HeroCardComponent', async () => {
        await flushPromises()
        expect(wrapper.findAll('[data-test-id="1011334"]')).toBeTruthy();
    });

    it('should filter heroes by name', async () => {
        await flushPromises()
        const input = wrapper.find('[data-test="input-filter"]');
        await input.setValue('3-D Man');
        const button = wrapper.find('[data-test="button-filter"]');
        await button.trigger('click');

        expect(axios.request).toHaveBeenCalledWith({
            data: undefined,
            headers: undefined,
            method: "get",
            params: {
                name: "3-D Man",
                page: 1,
                perPage: 10
            },
            url: "http://localhost:8000/api/heroes"
        });
    });

});