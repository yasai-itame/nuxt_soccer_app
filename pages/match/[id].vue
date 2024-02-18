<script setup lang="ts">
const id = useRoute().params.id
const leagueName = useRoute().query.leagueName
const team = useRoute().query.team
const teamCheck = team === 'on' ? true : false

const { data: matches, error } = await useAsyncData('matches', async () => {
  return await $fetch(`/api/match/${id}`)
})

if (error.value) {
  console.error(error.value)
  throw createError(error.value)
}

function isString(value: any): value is string {
  return typeof value === "string";
}

const matchFilter = computed(() => {
  let result = matches.value?.some((v: any): boolean => {
    if (isString(v.status)) {
      return v.status != 'FINISHED'
    } else {
      return false
    }
  })
  return result
})

const matchData = computed(() => {
  let result = matches.value?.filter((v: any) => {
    if (isString(v.status)) {
      if (v.status != 'FINISHED') {
        return v
      }
    }
  })
  return result
})

const resultData = computed(() => {
  let result = matches.value?.filter((v: any) => {
    if (isString(v.status)) {
      if (v.status == 'FINISHED') {
        return v
      }
    }
  })
  return result
})

const matchTab = ref<HTMLElement | null>()
const resultTab = ref<HTMLElement | null>()

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T
}

const matchAction = (value?: HTMLEvent<HTMLButtonElement>) => {
  value?.target.classList.add('is-current')
  value?.target.nextElementSibling?.classList.remove('is-current')
  if (resultTab.value != undefined && matchTab.value != undefined) {
    resultTab.value.classList.add('is-none')
    matchTab.value.classList.remove('is-none')
  }
}

const resultAction = (value?: HTMLEvent<HTMLButtonElement>) => {
  value?.target.classList.add('is-current')
  value?.target.previousElementSibling?.classList.remove('is-current')
  if (matchTab.value != undefined && resultTab.value != undefined) {
    matchTab.value.classList.add('is-none')
    resultTab.value.classList.remove('is-none')
  }
}
</script>

<template>
  <Header />
  <div class="t-contents">
    <SideMenu />
    <div class="t-contents__box">
      <template v-if="matches">
        <PartsMoleculesMainVisual :title="leagueName" />
        <div class="t-contents__header">
          <div class="u-mb40">
            <PartsAtomsTitle :objProps="{title: 'Match Day', color: 'a-title--light-purple', position: 'a-title--center'}" />
          </div>
          <div class="t-contents__button-wrapper">
            <template v-if="matchFilter">
              <PartsAtomsButton @clickEvent="matchAction" class="is-current" :objProps="{text: 'Match Day', size: 'a-button--middle'}" />
            </template>
            <PartsAtomsButton @clickEvent="resultAction" :class="{'u-ml20pc u-ml10sp': matchFilter, 'is-current': !matchFilter}" :objProps="{text: 'Result', size: 'a-button--middle'}" />
            <!-- <template v-if="teamCheck">
              <PartsAtomsButton class="u-margin-pc-left u-ml10sp" :objProps="{text: 'Club', size: 'a-button--middle'}" />
            </template> -->
          </div>
        </div>
        <template v-if="matchData.length">
          <div ref="matchTab">
            <div class="t-contents__3column">
              <PartsMoleculesCard :propsArray="matchData" :teamInfo="teamCheck" />
            </div>
          </div>
        </template>
        <template v-if="resultData.length">
          <div ref="resultTab" :class="{'is-none': matchData.length}">
            <div class="t-contents__3column">
              <PartsMoleculesCard :propsArray="resultData" :result="true" :teamInfo="teamCheck" />
            </div>
          </div>
        </template>
      </template>
      <template v-if="error">
        <PartsMoleculesMainVisual :title="'API Error'" />
      </template>
    </div>
  </div>
</template>
<style lang="scss">
.is-none {
  display: none;
}
</style>