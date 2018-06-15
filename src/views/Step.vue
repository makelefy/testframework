<template>
  <div class="wrapper">
    <the-sidebar :placeholder="'Search steps...'"
                 :items="teststeps"
                 :routename="'step'"
                 :labels="['step', '+']">

        <router-link slot="back" to="/projects" tag="span" exact class="label">Go back</router-link>

      </the-sidebar>

   <item :titleLabel="'Step'" :title="$route.params.steptitle" :log="item"></item>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import Item from '@/components/Item'
import {mapActions} from 'vuex'


export default {
  name: 'Step',
  components: {
    TheSidebar,
    Item
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
