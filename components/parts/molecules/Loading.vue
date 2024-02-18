<template>
  <div v-if="props.isShow" class="a-loading">
    <img src="~/assets/img/icon_loading.png" class="a-loading__icon" alt="loading...">
  </div>
</template>

<script setup lang="ts">
type Props = {
  isShow: boolean
}

const props = defineProps<Props>()
</script>

<style lang="scss">
@keyframes loadingAnime {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.a-loading {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: loadingAnime;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    width: 40px;
    display: block;
  }
}
</style>