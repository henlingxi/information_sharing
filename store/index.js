import Vue from 'vue'
import Vuex from 'vuex'

import userinfoAbout from './userinfo'
import articleAbout from './article.js'
import artcateAbout from './artcate.js'
import collectAbout from './collect.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userinfoAbout,
	articleAbout,
	artcateAbout,
	collectAbout
  }
})
