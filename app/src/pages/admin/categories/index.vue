<template>
  <b-table striped bordered hover :items="items" :fields="fields">
    <template slot="id" slot-scope="row">{{row.value}}</template>
    <template slot="name" slot-scope="row">{{row.value}}</template>
    <template slot="url" slot-scope="row">{{row.value}}</template>
    <template slot="actions" slot-scope="row">
      <b-button-group>
        <b-button variant="info">
          编辑
        </b-button>
        <b-button variant="danger">
          删除
        </b-button>
      </b-button-group>
    </template>
  </b-table>
</template>

<script>
import { ajax, apis } from '@/utils'

const items = [
  { id: 1, name: '前端', url: 'frontend' },
  { id: 2, name: 'nodejs', url: 'nodejs' },
  { id: 3, name: '编程', url: 'program' },
]
const fields = [
  {
    key: 'id',
  },
  {
    key: 'name',
  },
  {
    key: 'url',
  },
  {
    key: 'actions',
  },
]

export default {
  layout: 'admin',
  data() {
    return {
      items,
      fields,
    }
  },
  async mounted() {
    const res = await ajax.get(apis.categories.getAll)
    console.log('get categories', res)
  }
}
</script>

<style scoped>
</style>
