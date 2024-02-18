<script setup lang="ts">
const { $_ } = useNuxtApp()
const loading = ref(false)

let { data: menu, error, pending } = await useAsyncData('sideMenu', async() => {
  return await $fetch('/api/soccer/competitions')
})

/* Dropdown Menu */
// onMounted(async () => {
//   const dropSwitch = document.querySelectorAll<HTMLElement>('.js-drop-switch')

//   dropSwitch.forEach((v) => {
//     v.addEventListener('click', () => {
//       let target = <HTMLElement>v.nextElementSibling
//       target?.classList.toggle('is-open')
//       v?.classList.toggle('is-open')
//       if (target?.classList.contains('is-open')) {
//         target.style.height = target.scrollHeight + 'px'
//       } else {
//         target.style.height = '0px'
//       }
//     })
//   })
// })
/* Dropdown Menu */

</script>

<template>
  <nav id="menu" class="o-menu js-nav">
    <PartsMoleculesLoading :isShow="pending" />
    <template v-if="menu">
      <div class="o-menu__list" v-for="league in menu" :key="league.order">
        <NuxtLink :to="'/match/' + league.id + '?leagueName=' + league.leagueName + '&team=' + league.teamCheck" class="o-menu__list-link">{{ league.leagueName }}</NuxtLink>
      </div>
    </template>
    <template v-if="error">
      <div class="o-menu__list">
        API Error
      </div>
    </template>

    <!-- Dropdown Menu -->
    <!-- <div class="o-menu__list">
      <a class="o-menu__list-link o-menu__list-link--arrow js-drop-switch">
        League
      </a>
      <div class="o-menu__drop-downs">
        <NuxtLink to="/match/1" class="o-menu__list-link o-menu__list-link--drop">Team A</NuxtLink>
        <NuxtLink to="/match/1" class="o-menu__list-link o-menu__list-link--drop">Team A</NuxtLink>
        <NuxtLink to="/match/1" class="o-menu__list-link o-menu__list-link--drop">Team A</NuxtLink>
        <NuxtLink to="/match/1" class="o-menu__list-link o-menu__list-link--drop">Team A</NuxtLink>
      </div>
    </div> -->
    <!-- Dropdown Menu-->
  </nav>
</template>

<style lang="scss">
@import "~/assets/styles/_mixin.scss";
.o-menu {
  width: 240px;
  /* min-height: 100vh;
  height: 100vh; */
  height: 100%;
  overflow-y: scroll;
  background: #3A363E;
  position: absolute;
  //position: fixed;
  transition: all .5s;
  left: 0%;
  z-index: 2;
  @include sp {
    width: 0px;
    left: -100%;
    /* position: fixed; */
    &.is-open {
      width: 240px;
      left: 0;
    }
  }
  &__list {
    position: relative;
    z-index: 0;
  }
  &__list-link {
    display: block;
    color: #FFF;
    font-family: Archivo Black;
    font-size: 12px;
    padding: 20px;
    text-decoration: none;
    cursor: pointer;
    background: #3A363E;
    &--drop {
      padding: 20px 20px 20px 40px;
    }
    &--arrow {
      position: relative;
      padding-right: 40px;
      &:after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        background: url("~/assets/img/icon_arrow.png") no-repeat center center / contain;
        position: absolute;
        top: 50%;
        right: 20px;
        transition: all .3s;
        transform: translateY(-50%) rotate(0deg);
      }
      &.is-open {
        &:after {
          transform: translateY(-48%) rotate(90deg);
        }
      }
    }
    &.is-current {
      background: #6D5D6E;
      &:hover {
        background: #6D5D6E;
      }
    }
    &:hover {
      background: #574A57;
    }
  }
  &__drop-downs {
    width: 100%;
    height: 0;
    transition: all .3s cubic-bezier(0.16, 1, 0.5, 1);
    overflow: hidden;
    z-index: -1;
  }
}
</style>