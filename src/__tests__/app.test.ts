import AppVue from "@/App.vue";
import { makeRemoteHeroes } from "@/factories/usecases/remote-heroes-factory";
import { mount, shallowMount } from "@vue/test-utils";
import axios, { isAxiosError } from "axios";
import { Mocked, describe, expect, it, vi } from "vitest";

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
            request: vi.fn(() => Promise.resolve({ status: 200, data: mockResolvedValueData })),
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

vi.stubEnv('VUE_APP_API_URL', 'http://localhost:8000/api')

describe('App component', () => {

    it('should render App component', () => {
        const wrapper = shallowMount(AppVue)
        expect(wrapper.findComponent(AppVue).exists()).toBeTruthy();
    });

    it('should render App component with heroes component', async () => {
        const wrapper = mount(AppVue)

        expect(wrapper.findComponent({ name: 'Heroes' }).exists()).toBeTruthy();
        expect(wrapper.findComponent({ name: 'Heroes' }).props()).toEqual({ remoteHeroes: makeRemoteHeroes() })
    });
})