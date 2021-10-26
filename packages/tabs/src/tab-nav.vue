<script lang='ts'>
import { h, defineComponent, PropType } from "vue";
import { Pane } from "../../utils/tabs";
import { NOOP } from "@vue/shared";
export default defineComponent({
  name: "CDhnTabNav",
  props: {
    panes: {
      type: Array as PropType<Pane[]>,
      default: () => [] as Pane[],
    },
    onTabClick: {
      type: Function as PropType<
        (tab: Pane, tabName: string, ev: Event) => void
      >,
      default: NOOP,
    },
  },
  setup() {},
  render() {
    const { panes, onTabClick } = this;
    const tabs = panes.map((pane: any, index) => {
      let tabName = pane.props.name || pane.index || `${index}`;
      pane.index = `${index}`;
      const tabLabelContent = pane.instance.slots.label?.() || pane.props.label;
      const tabindex = pane.active ? 0 : -1;
      return h(
        "div",
        {
          class: {
            "c-dhn-tabs__item": true,
            "is-active": pane.active,
            "is-disabled": pane.props.disabled,
          },
          id: `tab-${tabName}`,
          key: `tab-${tabName}`,
          "aria-controls": `pane-${tabName}`,
          role: "tab",
          "aria-selected": pane.active,
          ref: `tab-${tabName}`,
          tabindex: tabindex,
          onClick: (ev) => {
            onTabClick(pane, tabName, ev);
          },
        },
        [tabLabelContent]
      );
    });
    return h(
      "div",
      {
        ref: "el$",
        class: "c-dhn-tabs__nav-wrap",
      },
      [
        h(
          "div",
          {
            class: "c-dhn-tabs__nav",
            ref: "nav$",
            role: "tablist",
          },
          [tabs]
        ),
      ]
    );
  },
});
</script>
