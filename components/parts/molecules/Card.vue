<script setup lang="ts">
import { format } from 'date-fns'

interface Props {
  propsArray: {
    id: number
    homeId: number
    home: string
    homeCrest: string
    awayId: number
    away: string
    awayCrest: string
    winner: string
    status: string
    fullTime: {
      home: number
      away: number
    }
    utcDate: Date
  }[]
  result?: boolean
  teamInfo: boolean
}

const props = withDefaults(defineProps<Props>(), {
  propsArray: () => [],
  result: false,
  teamInfo: false
})

const dateAction = ((date: string) => {
  return format(new Date(date), 'yyyy/MM/dd HH:mm')
})
</script>
<template>
  <div v-for="match in propsArray" :key="match.id" class="m-card m-card--3column" :class="{'is-none': !match.home || !match.away}">
    <div class="m-card__header">
      <div class="m-card__image-frame">
        <template v-if="teamInfo">
          <NuxtLink :to="'/teams/' + match.homeId">
            <img :src="match.homeCrest" class="m-card__image" :alt="match.home">
          </NuxtLink>
        </template>
        <template v-else>
          <img :src="match.homeCrest" class="m-card__image" :alt="match.home">
        </template>
      </div>
      <div class="m-card__image-frame">
        <template v-if="teamInfo">
          <NuxtLink :to="'/teams/' + match.awayId">
            <img :src="match.awayCrest" class="m-card__image" :alt="match.away">
          </NuxtLink>
        </template>
        <template v-else>
          <img :src="match.awayCrest" class="m-card__image" :alt="match.away">
        </template>
      </div>
    </div>
    <template v-if="teamInfo">
      <div class="m-card__title">
        <p class="m-card__title-text">
          <NuxtLink :to="'/teams/' + match.homeId" class="m-card__title-link">{{ match.home }}</NuxtLink>
        </p>
        <p class="m-card__title-vs">VS</p>
        <p class="m-card__title-text">
          <NuxtLink :to="'/teams/' + match.awayId" class="m-card__title-link">{{ match.away }}</NuxtLink>
        </p>
      </div>
    </template>
    <template v-else>
      <div class="m-card__title">
        <p class="m-card__title-text">{{ match.home }}</p>
        <p class="m-card__title-vs">VS</p>
        <p class="m-card__title-text">{{ match.away }}</p>
      </div>
    </template>
    <template v-if="result">
      <p class="m-card__score">{{ match.fullTime.home }} - {{ match.fullTime.away }}</p>
    </template>
    <p class="m-card__time">{{ dateAction(match.utcDate) }}</p>
  </div>
</template>

<style lang="scss">
@import "~/assets/styles/_mixin.scss";
.m-card {
  border-radius: 5px;
  background: rgba(101, 101, 101, 0.80);
  padding: 40px 2.4%;
  &.is-none {
    display: none;
  }
  &--3column {
    width: 30%;
    max-width: 240px;
    min-height: 320px;
    &:nth-of-type(n+4) {
      margin-top: 20px;
    }
    @media screen and (min-width: 769px ) and (max-width: 800px) {
      width: 48%;
      max-width: initial;
      &:nth-of-type(n+3) {
        margin-top: 20px;
      }
    }
    @include sp {
      width: 100%;
      max-width: initial;
      min-height: 200px;
      &:nth-of-type(n+2) {
        margin-top: 20px;
      }
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    max-width: 160px;
    margin: 0 auto 50px;
  }
  &__image-frame {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
  }
  &__image {
    width: 100%;
  }
  /* &__title {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  } */
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  &__title-text {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 14px;
    text-align: center;
    width: 40%;
    word-break: break-all;
  }
  &__title-vs {
    color: white;
    font-family: Archivo Black;
    font-size: 12px;
    text-align: center;
  }
  &__title-link {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 14px;
    text-decoration: none;
  }
  &__score {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }
  &__time {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      content: "";
      display: block;
      width: 24px;
      height: 24px;
      background: url("~/assets/img/icon_time.png") no-repeat center center / contain;
      margin-right: 3px;
    }
  }
}
</style>