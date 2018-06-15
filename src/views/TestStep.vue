<template>
  <div class="wrapper">
    <the-sidebar :placeholder="'Search testcases...'"
                 :items="testcases"
                 :routename="'testcase'"
                 :labels="['testcase', '+']">

        <router-link slot="back" to="/projects" tag="span" exact class="label">Go back</router-link>

      </the-sidebar>

   <item :titleLabel="'Testcase'" :title="$route.params.testcaseId">

      <item-list slot="list-bottom"
                 class="run-list"
                 :title="'Test cases'"
                 :labels="['Name', 'Timestamp']">

          <list-item slot="list-item"
                    v-for="item in teststeps"
                    :key="item.title"
                    :item="item"
                    :type="'step'">

            <router-link 
                      slot="routerlink" 
                      class="item-title" 
                      :to="{
                        name: 'step', 
                        params: {
                          steptitle: item.title,
                          item: item
                          }}">{{item.title}}</router-link>
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
import {mapActions} from 'vuex'

export default {
  name: 'Testcase',
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
    },
    activeList: {
      type: Array,
      required: false
    }
  },
    methods: {
    ...mapActions({
      fetchSteps: 'teststeps/FETCH_DATA' // maps 'this.fetchData()' to 'this.$store.dispatch['api/FETCH_DATA'
    })
  },
  created () {
    this.fetchSteps(this.$route)
  },
  computed: {
    teststeps () {
      return this.$store.getters['teststeps/teststeps']
    },
    testcases () {
      return this.$store.getters['testcases/testcases']
    }
  }
}
</script>
