import AppVue from "@/App.vue";
import HeroCardVue from "@/components/heroes/HeroCard.vue";
import HeroesVue from "@/components/heroes/Heroes.vue";
import { VueWrapper, mount } from "@vue/test-utils";
import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";

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


describe('App component', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(AppVue);
    });

    it('should render App component', () => {
        expect(wrapper.findComponent(AppVue).exists()).toBeTruthy();
    });

    it('should render App component with heroes component', async () => {

        expect(wrapper.findComponent({ name: 'Heroes' }).exists()).toBeTruthy();
    });

    it('should render App component with heroes component with heroes list', async () => {
        expect(wrapper.findComponent(HeroesVue).exists()).toBeTruthy();
        expect(axios.get).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/heroes?page=1&perPage=5');
    });

    it('should render App component with heroes component with heroes list with HeroCard component', async () => {

        expect(wrapper.findComponent(HeroCardVue).exists()).toBeTruthy();
    })

    it('should render components and vote on a hero', async () => {
        const button = wrapper.find('[data-test="button-up-vote"]');
        await button.trigger('click');
        expect(wrapper.getComponent(HeroCardVue).emitted()).toHaveProperty('vote');
        expect(axios.post).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/vote', { action: "up", hero_id: 1011334 });
    });
})