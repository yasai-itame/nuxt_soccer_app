<script setup lang="ts">
const emit = defineEmits<{(e: 'clickEvent', value?: string): void}>()
const onClick = (value?: string): void => {
  emit('clickEvent', value)
}

interface Props {
  text?: string;
  color?: string;
  position?: string;
  size?: string;
}

const props = defineProps({
  objProps: {
    type: Object as () => Props
  }
})

const objProps: Ref<Props> = computed(() => ({ ...props.objProps }))
</script>

<template>
  <button @click="onClick" class="a-button" :class="[objProps.color, objProps.position, objProps.size]">{{ objProps.text }}</button>
</template>

<style lang="scss">
@import "~/assets/styles/_mixin.scss";
button {
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
}
.a-button {
  font-family: Archivo Black;
  width: 100%;
  display: block;
  border-radius: 8px;
  background: #fff;
  color: #810CAA;
  &--center {
    margin: 0 auto;
  }
  &--purple,
  &.is-current {
    background: #810CAA;
    color: #D4FF29;
  }
  /* &--white {
    background: #fff;
    color: #810CAA;
  } */
  &--large {
    max-width: 360px;
    font-size: 32px;
    padding: 6px;
  }
  &--middle {
    font-size: 16px;
    max-width: 128px;
    padding: 6px;
    @include sp {
      font-size: 14px;
    }
  }
}
</style>
