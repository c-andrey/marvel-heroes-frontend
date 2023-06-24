import { VueWrapper, flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HeroCard from "@/components/heroes/HeroCard.vue";
import HeroesVue from "@/components/heroes/Heroes.vue";
import { makeRemoteHeroes } from "@/factories/usecases/remote-heroes-factory";
import axios from "axios";

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

const mockVoteResolvedValueData = {
    "voted": true,
    "data": {
        "id": 24,
        "hero_id": 1011334,
        "votes": 4,
        "created_at": null,
        "updated_at": "2023-06-23T16:34:32.000000Z"
    }
}

vi.mock('axios', () => {
    return {
        default: {
            request: vi.fn(() => Promise.resolve({ status: 200, data: mockResolvedValueData })),
            post: vi.fn(() => Promise.resolve({ status: 200, data: mockVoteResolvedValueData }))
        }
    }
})

describe("HeroCard Component", () => {

    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(HeroCard, {
            props: {
                data: {
                    id: 1,
                    name: '3-D Man',
                    description: 'Description about the marvel hero 3-D Man',
                    votes: 1
                }
            },
            global: {
                stubs: {
                    Button: true,
                }
            }
        });
    });

    it("should render with data", () => {

        expect(wrapper.text()).toContain('3-D Man');
        expect(wrapper.text()).toContain('Description about the marvel hero 3-D Man');
    });

    it("should up vote the hero", async () => {
        const wrapper = mount(HeroesVue, {
            props: {
                remoteHeroes: makeRemoteHeroes(),
            },
            global: {
                stubs: {
                    Paginator: true,
                    Button: true,
                }
            }
        })

        await flushPromises();

        const heroCardComponent = wrapper.getComponent(HeroCard);

        const button = heroCardComponent.find('[data-test="button-up-vote"]');
        await button.trigger('click');

        expect(heroCardComponent.emitted()).toHaveProperty('vote');
        expect(axios.request).toHaveBeenCalledWith({
            body: undefined,
            headers: undefined,
            method: "post",
            data: {
                hero_id: 1011334,
                action: 'up'
            },
            params: undefined,
            url: "http://localhost:8000/api/heroes/vote"
        })


    });

    it("should down vote the hero", async () => {
        const wrapper = mount(HeroesVue, {
            props: {
                remoteHeroes: makeRemoteHeroes(),
            },
            global: {
                stubs: {
                    Paginator: true,
                    Button: true,
                }
            }
        })

        await flushPromises();

        const heroCardComponent = wrapper.getComponent(HeroCard);

        const button = heroCardComponent.find('[data-test="button-down-vote"]');
        await button.trigger('click');

        expect(heroCardComponent.emitted()).toHaveProperty('vote');
        expect(axios.request).toHaveBeenCalledWith({
            body: undefined,
            headers: undefined,
            method: "post",
            data: {
                hero_id: 1011334,
                action: 'down'
            },
            params: undefined,
            url: "http://localhost:8000/api/heroes/vote"
        })
    });
}
);