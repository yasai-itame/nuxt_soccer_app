<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>
<template>
  <div class="m-main-visual">
    <h1 class="m-main-visual__title">{{ title }}</h1>
  </div>
</template>

<style lang="scss">
@import "~/assets/styles/_mixin.scss";
.m-main-visual {
  width: 100%;
  height: 240px;
  background: url('~/assets/img/bg_contents-header.png') no-repeat center center / cover;
  position: relative;
  z-index: 1;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.50);
  }
  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFF;
    font-family: Archivo Black;
    font-size: 56px;
    z-index: 2;
    width: 100%;
    text-align: center;
    @include sp {
      font-size: 24px;
    }
  }
}
</style>