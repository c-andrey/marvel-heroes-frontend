import { VueWrapper, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import HeroCard from "@/components/heroes/HeroCard.vue";

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
            }
        });
    });

    it("should render with data", () => {
        expect(wrapper.text()).toContain('3-D Man');
        expect(wrapper.text()).toContain('Description about the marvel hero 3-D Man');
    });

    it("should up vote the hero", async () => {
        const button = wrapper.find('[data-test="button-up-vote"]');
        await button.trigger('click');
        expect(wrapper.emitted()).toHaveProperty('up-vote');
    });
}
);