import axios from 'axios';
import { describe, test, expect, beforeEach, vi, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import Heroes from '../components/heroes/Heroes.vue';
import HeroCardComponent from '@/components/heroes/HeroCard.vue';

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
            get: vi.fn(() => Promise.resolve({ status: 200, data: mockResolvedValueData })),
            post: vi.fn(() => Promise.resolve({
                status: 200, data: {
                    "voted": true,
                    "data": {
                        "id": 24,
                        "hero_id": 1011334,
                        "votes": 4,
                        "created_at": null,
                        "updated_at": "2023-06-23T16:34:32.000000Z"
                    }
                }
            }))
        }
    }
})



describe('HeroesList', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(Heroes);
    });

    it('should render heroes', () => {
        expect(wrapper.text()).toContain('Here you can vote for your favorite hero')
    })

    it('should fetch heroes', () => {
        expect(wrapper.findAll('[data-test="hero"]').length).toEqual(1);
    });

    it('should show heroes list with component HeroCardComponent', () => {
        expect(wrapper.findComponent(HeroCardComponent).exists()).toBeTruthy();
    });

    it('should filter heroes by name', async () => {
        const input = wrapper.find('[data-test="input-filter"]');
        await input.setValue('3-D Man');
        const button = wrapper.find('[data-test="button-filter"]');
        await button.trigger('click');

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/heroes?page=1&perPage=5&name=3-D Man');
    });

});