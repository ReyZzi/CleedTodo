import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import store from "../../store/index";
import TodoFrom from "../TodoForm.vue";

describe("Add to list", () => {
  const wrapper = mount(TodoFrom, {
    global: {
      plugins: [store],
    },
  });
  it("turn input ring red & show error message when Add button is clicked with empty input", async () => {
    const form = wrapper.find("form");

    // Trigger click button
    await form.trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    const inputElement = wrapper.find("input");
    const errorMessage = wrapper.find("#error");
    // Verify if class is red
    expect(inputElement.classes()).toContain("ring-red-300");
    expect(errorMessage.text()).toContain("Todo text cannot be empty");
  });
});
