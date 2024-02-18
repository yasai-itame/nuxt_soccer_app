<template>
  <div id="o-start">
    <div class="o-start-contents">
      <img src="~/assets/img/img_soccer-ball.png" class="o-start-contents__logo" alt="">
      <div class="u-mb60pc u-mb20sp">
        <PartsAtomsTitle :objProps="{title: 'Soccer App', position: 'a-title--center', color: 'a-title--yellow', fontSize: 'a-title--large'}" />
      </div>
      <PartsAtomsButton :objProps="{text: 'START', position: 'a-button--center', size: 'a-button--large', color: 'a-button--purple'}" />
    </div>
  </div>
</template>

<style lang="scss">
@import "~/assets/styles/_mixin.scss";
#o-start {
  position: relative;
  background: url('~/assets/img/bg_top_pc.png') no-repeat top center / cover;
  height: 100vh;
  @include sp {
    background: url('~/assets/img/bg_top_sp.png') no-repeat top center / cover;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(169, 0, 173, 0.05) -1.77%, rgba(170, 47, 212, 0.90) 100%);
  }
}
.o-start-contents {
  width: 100%;
  padding: 0 20px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &__logo {
    display: block;
    width: 180px;
    margin: 0 auto 80px;
  }
}
</style>