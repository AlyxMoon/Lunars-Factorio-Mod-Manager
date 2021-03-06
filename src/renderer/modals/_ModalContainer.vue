<template>
  <div
    :class="{ transparent: !visible }"
    class="modal-overlay"
    @click="hideModal"
  >
    <transition name="zoom">
      <div
        v-if="visible"
        class="modal-container"
        @click.stop
      >
        <div class="modal-menu">
          <div class="modal-title">
            <slot name="title">
              title
            </slot>
          </div>
          <button
            class="btn subtle"
            @click="hideModal"
          >
            X
          </button>
        </div>
        <hr class="mt-0">

        <div class="modal-content">
          <slot name="content">
            content
          </slot>
        </div>
        <hr class="mb-0">

        <div class="modal-footer">
          <slot name="footer">
            <button
              class="btn green small"
              :disabled="disableFooter"
              @click="$emit('confirm')"
            >
              <slot name="confirm-text">
                Confirm
              </slot>
            </button>
            <button
              class="btn red small"
              :disabled="disableFooter"
              @click="hideModal"
            >
              <slot name="cancel-text">
                Cancel
              </slot>
            </button>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ModalContainer',
  props: {
    disableFooter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get () {
        return this.$store.state.modals[this.$parent.$vnode.key].show
      },
    },
  },
  mounted () {
    this.$store.watch(
      ({ modals }) => modals[this.$parent.$vnode.key].show,
      () => {
        if (!this.visible) {
          this.$emit('hidden')
        }
      }
    )
  },
  methods: {
    ...mapMutations({
      hideModal: 'HIDE_MODAL',
    }),
  },
}
</script>

<style lang="scss">
.modal-overlay {
  @include absolute;
  background-color: #111111AA;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  &.transparent {
    background-color: transparent;
    pointer-events: none;
  }
}

.modal-container {
  background-color: $background-primary-color;
  border: 2px solid $element-border-color;
  border-radius: 10px;
  box-shadow: 0 0 10px 8px $element-shadow-color;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 500px;
  max-width: 90%;
  min-height: 400px;
  max-height: 80%;
  padding: 0 10px;

  hr {
    border-color: $highlight-color;
    margin: 0 -10px;
  }
}

.modal-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  button {
    color: $text-light-color;
    margin-top: -5px;
    margin-right: -5px;
  }
}

.modal-content {
  flex-grow: 1;
  padding: 10px 15px;
  margin: 0 -10px;

  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 0;

  button {
    margin: 0 5px;
  }
}
</style>
