<script setup lang="ts">
onMounted(() => {
  const menuBtn = document.getElementsByClassName('js-sp-menu')
  const spMenu = document.getElementsByClassName('js-nav')
  
  menuBtn[0].addEventListener('click', () => {
    if (menuBtn[0].classList.contains('is-open')) {
      menuBtn[0].classList.remove('is-open')
      spMenu[0].classList.remove('is-open')
    } else {
      menuBtn[0].classList.add('is-open')
      spMenu[0].classList.add('is-open')
    }
  })
})
</script>

<template>
  <header id="header" class="o-header">
    <div class="o-header__contents">
      <h1 class="o-header__title">
        <NuxtLink to="/" class="o-header__title-link">Soccer App</NuxtLink>
      </h1>
      <button class="o-header__sp-menu-btn u-pc-hide js-sp-menu">
        <span class="o-header__sp-menu-btn-line"></span>
        <span class="o-header__sp-menu-btn-line"></span>
        <span class="o-header__sp-menu-btn-line"></span>
      </button>
    </div>
  </header>
</template>

<style lang="scss">
@import "~/assets/styles/_mixin.scss";
.o-header {
  width: 100%;
  height: 64px;
  position: sticky;
  top: 0;
  left: 0;
  background: #810CAA;
  padding: 0 40px;
  overflow: hidden;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  $block: &;
  @include sp {
    padding: 0 20px;
  }
  &:after {
    content: "";
    display: block;
    background: url('~/assets/img/img_soccer-ball.png') no-repeat top center / contain;
    width: 120px;
    height: 123px;
    position: absolute;
    top: 0;
    right: 20px;
  }
  &__contents {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  &__title {
    line-height: normal;
    z-index: 1;
  }
  &__title-link {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 24px;
    line-height: normal;
    text-decoration: none;
  }
  &__sp-menu-btn {
    width: 30px;
    height: 31px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index: 1;
    &.is-open {
      #{$block}__sp-menu-btn-line {
        &:first-of-type {
          &:after {
            transform: rotate(45deg);
            top: 10px;
          }
        }
        &:nth-of-type(2) {
          &:after {
            opacity: 0;
          }
        }
        &:last-of-type {
          &:after {
            transform: rotate(-45deg);
            top: -10px;
          }
        }
      }
    }
  }
  &__sp-menu-btn-line {
    position: relative;
    display: block;
    width: 100%;
    &:after {
      content: "";
      display: block;
      background: white;
      border-radius: 10px;
      width: 100%;
      height: 3px;
      opacity: 1;
      transition: all .5s;
      position: absolute;
      top: 0;
      left: 0;
    }
    &:first-of-type,
    &:nth-of-type(n+2),
    &:last-of-type {
      &:after {
        transform: rotate(0deg);
      }
    }
  }
}
</style>