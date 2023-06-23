import AppVue from "@/App.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";


describe('App component', () => {
    it('should render App component', () => {
        const wrapper = mount(AppVue);
        expect(wrapper.findComponent(AppVue).exists()).toBeTruthy();
    });

    it('should render App component with heroes component', () => {
        const wrapper = mount(AppVue);
        expect(wrapper.findComponent({ name: 'Heroes' }).exists()).toBeTruthy();

    });

})