<template>
  <div class="wrapper">
    <the-sidebar :placeholder="'Search projects...'" :routename="'project'" :items="projects"/>

    <item :titleLabel="'Project'" :title="$route.params.projecttitle">

      <item-list slot="list-bottom"
                 class="run-list"
                 :title="'Runs'"
                 :labels="['Name']">

        <list-item slot="list-item"
                   v-for="item in runs"
                   :key="item.title"
                   :item="item"
                   :type="'run'">

          <router-link slot="routerlink"
                       class="item-title"
                       :to="{
                         name: 'run',
                         params: {
                           runId: item.title
                            }
                          }">
              {{item.title}}
              </router-link>
            </list-item>
        </item-list>
      </item>
    </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import Item from '@/components/Item'
import ItemList from '@/components/list/ItemList'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'Project',
  components: {
    TheSidebar,
    Item,
    ItemList,
    ListItem
  },
  props: {
    title: {
      type: String,
      required: false
    },
    item: {
      type: Object,
      required: false
    }
  },
  computed: {
    projects () {
      return this.$store.getters['projects/projects']
    },
    runs () {
      return this.$store.getters['runs/runs']
    }
  }
}
</script>
