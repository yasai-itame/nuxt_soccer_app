<script setup lang="ts">
const id = useRoute().params.id

const { data: teams, error } = await useAsyncData('teams', async () => {
  return await $fetch(`/api/team/${id}`)
})

if (error.value) {
  console.error(error.value)
  throw createError(error.value)
}

</script>
<template>
  <Header />
  <div class="t-contents">
    <SideMenu />
    <div class="t-contents__box">
      <template v-if="teams">
        <PartsMoleculesMainVisual :title="teams.teamName" />
        <div class="t-contents__header">
          <div class="u-mb40">
            <PartsAtomsTitle :objProps="{title: 'Teams', color: 'a-title--light-purple', position: 'a-title--center'}" />
          </div>
        </div>
        <div class="t-contents__1column">
          <PartsMoleculesListTable :teams="teams.teamData" />
        </div>
      </template>
      <template v-if="error">
        <PartsMoleculesMainVisual :title="'API Error'" />
      </template>
    </div>
  </div>
</template>