import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)
const axfb = axios.create({ 
	baseURL: 'https://medclinic-9ea80.firebaseio.com/'
})

export default new Vuex.Store({
	
	state: {
		pacientes: []
	},
	mutations: {
		getPacientes(state, pacientes) {
			state.pacientes = pacientes;
		},

		addPaciente(state, paciente) {
			axfb.post('pacientes.json', paciente)
		},

		editPaciente(state, paciente) {
			axfb.patch(`/pacientes/${paciente.id}.json`, paciente.paciente)
		},

		deletePaciente(state, id) {
			axfb.delete(`/pacientes/${id}.json`)
		}
	},
	actions: {
		// load firebase
		loadData({ commit }) {
			axfb.get('pacientes.json')
				.then(res => res.data || [])
				.then(data => {
					commit('getPacientes', data);
			})
		},

		addPaciente({ commit }, paciente) {
			commit('addPaciente', paciente)
		},

		editPaciente({ commit }, paciente) {
			// commit('editPaciente', paciente)
			commit('editPaciente', {id: paciente.id, paciente: paciente.paciente})
		},

		deletePaciente({ commit }, id) {
			commit('deletePaciente', id)
		},
  },
  getters: {
    qtdPacientes(state) {
        return state.pacientes.length();
    }
},
})