<script setup lang="ts">
interface Props {
  tag?: string;
  title?: string;
  color?: string;
  position?: string;
  fontSize?: string;
}

const props = defineProps({
  objProps: {
    type: Object as () => Props
  }
})

const objProps: Ref<Props> = computed(() => ({ ...props.objProps }))
</script>

<template>
  <template v-if="objProps.tag === 'h2'">
    <h2 class="a-title" :class="`${objProps.position} ${objProps.color} ${objProps.fontSize}`">{{ objProps.title }}</h2>
  </template>
  <template v-else>
    <h1 class="a-title" :class="`${objProps.position} ${objProps.color} ${objProps.fontSize}`">{{ objProps.title }}</h1>
  </template>
</template>

<style lang="scss">
.a-title {
  font-family: Archivo Black;
  &--center {
    text-align: center;
  }
  &--large {
    font-size: 48px;
  }
  &--yellow {
    color: #FBFF50;
  }
  &--light-purple {
    color: #D4ADFC;
  }
}
</style>