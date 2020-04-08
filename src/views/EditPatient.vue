<template>
 <div id="editPatient">
 <v-card>
    <v-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.id" :type="mensagem.tipo">{{ mensagem.texto }}</v-alert>
   <v-layout align-center justify-center>
    <v-flex text-xs-center>
<v-card v-if="id !== null">
 <v-form ref="form" v-model="valid"
      lazy-validation >
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="paciente.nome" :rules="nameRules"  label="Nome" required ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" >
            <v-text-field v-model="paciente.cpf" :rules="cpfRules" :counter="11" label="CPF" required></v-text-field>
          </v-col>
            <v-col cols="12" md="3">
            <v-text-field v-model="paciente.rg" label="RG" required></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
                <v-select v-model="paciente.sexo" :items="optionsSexo" label="Sexo"></v-select>
          </v-col>
        </v-row>
          <v-row>
          <v-col cols="12" md="3">
             <v-text-field v-mask="phoneMask" v-model="paciente.telefone" label="Telefone"></v-text-field>
          </v-col>
          <v-col cols="12" md="3" >
            <v-text-field v-model="paciente.dataNasc"  type="date" label="Data Nascimento"></v-text-field>
          </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="paciente.email" :rules="emailRules" label="E-mail" required></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
                <v-select v-model="paciente.convenio" :items="optionsConvenio" label="Plano de Saúde"></v-select>
          </v-col>
        </v-row>
        <v-row>
              <v-btn @click.prevent="edit(id)" small color="primary" light class="ml-2">Salvar</v-btn>
        </v-row> 
      </v-container>
    </v-form>
 </v-card>
 
 <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">CPF</th>
            <th class="text-left">Telefone</th>
            <th class="text-left">E-mail</th>
            <th class="text-left">Data Cadastro</th>
            <th class="text-left" colspan="2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paciente, id) in pacientes" :key="id">
            <td>{{ paciente.nome }}</td>
            <td>{{ paciente.cpf }}</td>
            <td>{{ paciente.telefone }}</td>
            <td>{{ paciente.email }}</td>
            <td>{{ paciente.dataCadastro }}</td>
            <td>
              <v-icon small class="mr-2" @click="carregar(id)">mdi-pencil</v-icon>
            </td>
            <td>
              <v-icon small class="mr-2" @click="del(id, paciente.nome)">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
    </v-simple-table>
     </v-flex>     
 </v-layout>
 </v-card>
 </div>
</template>

<script>
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask,
  },
  created () {
    this.$store.dispatch('loadData')
  }, 
  updated () {
    this.$store.dispatch('loadData')
  },
  computed: { 
    ...mapState(['pacientes'])
  },
   data() {
    return {
      phoneMask: '(##) #####-####',
      valid: true,
      mensagens: [],
      id: null,
      optionsSexo: [
        { value: "Masculino", text: "Masculino" },
        { value: "Femenino", text: "Feminino" }
      ],
      optionsConvenio: [
        { value: "Particular", text: "Particular" },
        { value: "Plano de Saúde", text: "Plano de Saúde" }
      ],
      nameRules: [
        v => !!v || 'O nome é requerido',
      ],
      cpfRules: [
        v => !!v || 'CPF é requerido',
        v => (v && v.length <= 11) || 'O CPF deve ter 11 números',
      ],
      emailRules: [
        v => !!v || 'E-mail é requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    carregar(id) {
      this.id = id;
      this.paciente = { ...this.pacientes[id] }
    },
    edit(id) {
      this.$store.dispatch('editPaciente', { id, paciente: this.paciente})
      .then(() => {
           this.reset() 
           this.id = null 
           this.mensagens.push({
           texto: "Operação realizada com sucesso!",
           tipo: "success",
         })
      })
    },
    del(id, paciente) {
      this.$store.dispatch('deletePaciente', id)
        .then(() => {
          this.mensagens.push({
            texto: 'Paciente: "'+ paciente + '" deletado com sucesso!',
            tipo: "warning"
          });
        })
    },

  }
}
</script>

<style>

</style>