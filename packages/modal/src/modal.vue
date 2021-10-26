<template>
	<teleport to="body">
		<div class="c-dhn-modal_modal" v-show="visible">
			<div class="c-dhn-modal_content">
				<div class="c-dhn-modal_header">
					<slot name="title"></slot>
					<button
						class="c-dhn-modal__headerbtn"
						type="button"
						@click="_handleClose()"
					></button>
				</div>
				<div class="c-dhn-modal_body">
					<slot></slot>
				</div>
				<div v-if="$slots.footer" class="c-dhn-modal_footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CDhnModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  setup (props, { emit }) {
    const handleClose = function () {
      emit('handleClose')
    }
    return {
      handleClose
    }
  },
  emits: {
    handleClose: null
  },
  methods: {
    _handleClose () {
      this.handleClose()
    }
  }
})
</script>


<style  lang="scss">
</style>
