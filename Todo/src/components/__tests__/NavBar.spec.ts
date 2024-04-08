import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { RouterLink } from "vue-router";
import router from "../../router/router";
import store from "../../store/index";
import NavBar from "../NavBar.vue";
/**
 * Pas eu le temps de finir les tests a cause de projets pour l'ecole a finir, reprendrais plus tard
 *
 */
describe("NavBar", () => {
  const wrapper = mount(NavBar, {
    global: {
      plugins: [store, router],
    },
  });

  // Test if the navbar link is rendered
  it("renders navbar link", async () => {
    await router.replace("/view");

    expect(wrapper.html()).toContain("TodoList");
    expect(wrapper.html()).toContain("Add To List");
  });

  it("renders navbar link if no url", async () => {
    await router.replace("/");

    const wrapper = mount(NavBar, {
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.html()).toContain("TodoList");
    expect(wrapper.html()).toContain("Add To List");
  });

  // Test if the navbar link is colored
  it("checks link coloring for /view", async () => {
    await router.replace("/view");

    // Find all RouterLinks
    const links = wrapper.findAllComponents(RouterLink);
    const viewLink = links.filter((link) => link.props("to") === "/view")[0];

    // Check if the class is "text-indigo-600"
    expect(viewLink.classes()).toContain("text-indigo-600");
    expect(viewLink.classes()).toContain("text-sm");
  });

  it("checks link coloring for /add", async () => {
    await router.replace("/add");

    // Find all RouterLinks
    const links = wrapper.findAllComponents(RouterLink);
    const addLink = links.filter((link) => link.props("to") === "/add")[0];

    // Check if the class is "text-indigo-600"
    expect(addLink.classes()).toContain("text-indigo-600");
    expect(addLink.classes()).toContain("text-sm");
  });

  it("checks link coloring for /view and add clicked", async () => {
    await router.replace("/view");

    // Find all RouterLinks
    const links = wrapper.findAllComponents(RouterLink);
    const addLink = links.filter((link) => link.props("to") === "/add")[0];

    // Check if the class is "text-indigo-600"
    expect(addLink.classes()).toContain("text-gray-700");
    expect(addLink.classes()).toContain("text-sm");
  });

  it("checks link coloring for /", async () => {
    await router.replace("/");

    // Find all RouterLinks
    const links = wrapper.findAllComponents(RouterLink);
    const viewLink = links.filter((link) => link.props("to") === "/view")[0];
    const addLink = links.filter((link) => link.props("to") === "/add")[0];

    // Check if the class is "text-indigo-600"
    expect(viewLink.classes()).toContain("text-gray-700");
    expect(addLink.classes()).toContain("text-gray-700");
  });
});
