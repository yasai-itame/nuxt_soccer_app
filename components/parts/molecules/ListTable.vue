<script setup lang="ts">
interface Data {
  propsArray: {
    id: number
    name: string
    dateOfBirth: string
    nationality: string
    position: string
  }[]
}

const props = defineProps<{
  teams: Data[]
}>()
</script>

<template>
  <div class="m-list-table">
    <table class="m-list-table__table">
      <tbody>
      <template v-for="team in teams" :key="team.id">
        <tr>
          <td class="m-list-table__table-title m-list-table__table-title--border" rowspan="3">
            {{ team.position }}
          </td>
          <td class="m-list-table__table-item m-list-table__table-item--first">
            <span class="m-list-table__table-category">Name:</span>{{ team.name }}</td>
        </tr>
        <tr>
          <td class="m-list-table__table-item"><span class="m-list-table__table-category">Birth:</span>{{ team.dateOfBirth }}</td>
        </tr>
        <tr>
          <td class="m-list-table__table-item m-list-table__table-item--last"><span class="m-list-table__table-category">Country:</span>{{ team.nationality }}</td>
        </tr>
      </template>
      </tbody>
      <!-- <tr>
        <td class="m-list-table__table-title m-list-table__table-title--border" rowspan="3">Coach</td>
        <td class="m-list-table__table-item"><span class="m-list-table__table-category">Name:</span>John Doe</td>
      </tr>
      <tr>
        <td class="m-list-table__table-item"><span class="m-list-table__table-category">Name:</span>John Doe</td>
      </tr>
      <tr>
        <td class="m-list-table__table-item m-list-table__table-item--last"><span class="m-list-table__table-category">Name:</span>John Doe</td>
      </tr> -->
    </table>
  </div>
</template>

<style lang="scss">
.m-list-table {
  border-radius: 5px;
  background: rgba(101, 101, 101, 0.80);
  padding: 20px 2.4%;
  &__table {
    width: 100%;
    border-collapse: collapse;
  }
  &__table-title {
    color: #D4ADFC;
    font-family: Archivo Black;
    font-size: 14px;
    width: 20%;
    &--border {
      border-bottom: solid 1px #fff;
    }
  }
  &__table-item {
    font-family: Archivo Black;
    font-size: 14px;
    color: white;
    width: 80%;
    padding-bottom: 10px;
    &--first {
      padding-top: 20px;
    }
    &--last {
      padding-bottom: 20px;
      border-bottom: solid 1px #fff;
    }
  }
  &__table-category {
    color: #D4ADFC;
    padding-right: 10px;
  }
}
</style>