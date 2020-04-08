<template>
 <div id="editPatient">
   <v-card>
    <v-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.id" :type="mensagem.tipo">{{ mensagem.texto }}</v-alert>
   <v-layout align-center justify-center>
    <v-flex text-xs-center>
    <h3 class="ml-2 mt-2 mr-2">Adicionar Paciente</h3>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-model="paciente.nome" :rules="nameRules"  label="Nome" required ></v-text-field>
          </v-col>
          <v-col cols="12" md="3" >
            <v-text-field v-model="paciente.cpf" :rules="cpfRules" :counter="11" label="CPF" required></v-text-field>
          </v-col>
            <v-col cols="12" md="3">
            <v-text-field v-model="paciente.rg" label="RG"></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="paciente.sexo" :items="optionsSexo" label="Sexo"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field v-mask="phoneMask" v-model="paciente.telefone" label="Telefone" :rules="telRules"  required></v-text-field>
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
          <v-btn  @click="validate" small color="primary" light class="ml-2" :disabled="!valid">Salvar</v-btn>
        </v-row> 
      </v-container>
    </v-form>
  </v-flex>  
 </v-layout>
</v-card>
</div>
</template>

<script>
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask,
  },
   data() {
    return { 
      phoneMask: '(##) #####-####',
      valid: true,
      lazy: false,
      mensagens: [],  
      paciente: {
        nome: "",
        cpf: "",
        rg: "",
        email: "",
        dataNasc: "",
        telefone: "",
        sexo: "",
        convenio: "",
      },
      optionsSexo: [ 'Masculino', 'Feminino'],
      optionsConvenio: [ 'Particular', 'Amil','Assim Saúde', 'Intermédica','Sulamérica','Unimed'],
      nameRules: [
        v => !!v || 'O nome é requerido',
      ],
      cpfRules: [
        v => !!v || 'CPF é requerido',
        v => (v && v.length <= 11) || 'O CPF deve ter 11 números',
      ],
      telRules: [
        v => !!v || 'Telefone é requerido',
      ],
      emailRules: [
        v => !!v || 'E-mail é requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
    }
  },
  methods: {
    validate () {
      const validate = this.$refs.form.validate()
      if(validate){
        this.add()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    add() {
      this.paciente.dataCadastro = new Date().toLocaleDateString('pt-BR')

      this.$store.dispatch('addPaciente',  this.paciente )
      .then(() => {
      this.reset()
         this.mensagens.push({
           texto: "Operação realizada com sucesso!",
           tipo: "success"
         })
      })     
    }
  }
}
</script>
<style>
</style>