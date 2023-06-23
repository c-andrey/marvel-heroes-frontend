import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, test, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';

import Heroes from '../components/heroes/Heroes.vue';
import HeroCardComponent from '@/components/heroes/HeroCard.vue';

const mock = new MockAdapter(axios);


mock.onGet('http://localhost:8000/api/heroes').reply(200, {
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
});



describe('HeroesList', () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(Heroes);
    });

    test('should fetch heroes', () => {
        expect(wrapper.findAll('[data-test="hero"]').length).toEqual(1);
    });

    test('should show heroes list with component HeroCardComponent', () => {
        expect(wrapper.findComponent(HeroCardComponent).exists()).toBeTruthy();
    });

    test('should filter heroes by name', async () => {
        const input = wrapper.find('[data-test="input-filter"]');
        await input.setValue('3-D Man');
        expect(wrapper.findAll('[data-test="hero"]').length).toEqual(1);
    });

});