<template>
  <div class="ativos">
    <h1>Ativos</h1>
    <hr />
    <b-button v-b-modal.criaBicicleta>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    
    <b-table striped hover :items="bicicletas" :fields="fields">
        <!-- <template slot="cell(ativo)" slot-scope="{ item: { ativo }}">
            <font-awesome-icon
                :icon="ativo === 'Y' ? 'check' : 'times'"
            />
        </template> -->
        <template slot="cell(actionDelete)" slot-scope="{ item: { codigo }}">
            <b-button v-on:click="excluirBicicleta(codigo)">
                <font-awesome-icon icon="trash" />
            </b-button>
        </template>
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeEditaBicicleta(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
    </b-table>

    <b-modal id="criaBicicleta"
        title="Novo Ativo"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovaBicicleta"  
        @ok="saveNovaBicicleta">
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>

    <b-modal id="editaBicicleta"
        :title="'Alterar o Ativo - ' + bicicletaAtual.codigo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editarBicicleta">
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>

    <b-modal id="excluirBicicleta"
        :title="'Exclui a bicileta - ' + bicicletaAtual.codigo"
        ok-title="Excluir"
        cancel-title="Cancelar"
        @ok="excluirBicicleta">
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>

  </div>
</template>

<script>
import FormBicicleta from '../components/FormBicicleta';
import axios from 'axios';

export default {
    //formBicicleta
        components: {FormBicicleta},
        data: () => {
            return {
                bicicletaAtual: {
                    codigo: '',
                    ativo: '',
                    isNew: true
                },
 //formBicicleta

            bicicletas: [],

            fields: [
                {
                    key: 'codigo',
                    label: 'Codigo'
                },
                {
                    key: 'descricao',
                    label: 'Descrição'
                },
                
                {
                    key: 'actionDelete',
                    label: ''
                },
                {
                    key: 'actionEdit',
                    label: ''
                }
            ]
        }
    },

    methods: {
        //  beforeExcluiBicicleta(bicicleta) {
        //     this.bicicletaAtual = {
        //         codigo: bicicleta.codigo,
        //         ativo: bicicleta.ativo,
        //         isNew: false
        //      }
        //     },
        //     this.$root.$emit('bv::show::modal', 'excluirBicicleta');
        // },
        //        async excluirBicicleta(codigo) {
        //            this.bicicletas.splice(0, this.bicicletas.length);
        //             let dados = await axios.delete(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`);
        //             this.bicicletas.pop();                                         
                
        //       },

//nao funcionando está excluindo dodos os dados
        //  async excluirBicicleta() {
        //     this.bicicletas.splice(0, this.bicicletas.length);
        //     let dados = await axios.delete(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`);
        //     this.bicicletas.pop(dados);
        //      this.$root.$emit('bv::show::modal', 'excluirBicicleta');
        // },

//nao funcionando

        beforeEditaBicicleta(bicicleta) {
            this.bicicletaAtual = {
                codigo: bicicleta.codigo,
                ativo: bicicleta.ativo,
                isNew: true
            }
            this.$root.$emit('bv::show::modal', 'editaBicicleta');
        },

        async editarBicicleta() {
           let payload = {
                ativo: this.bicicletaAtual.ativo
            };

            try {
                await axios.put(`http://localhost:3000/ativos/${this.bicicletaAtual.codigo}`, payload);
                await this.carregaBicicletas();
            } catch(err) {
                alert('erro ao atualizar a bicicleta');
            }
        },
        async carregaBicicletas() {
            this.bicicletas.splice(0, this.bicicletas.length);
            let dados = await axios.get('http://localhost:3000/ativos/');
            this.bicicletas.push(...dados.data);
        },
        beforeNovaBicicleta() {
            this.bicicletaAtual.codigo = '';
            this.bicicletaAtual.ativo = 'Y';
            this.bicicletaAtual.isNew = true;
        },
        async saveNovaBicicleta() {
            let payload = {
                codigo: this.bicicletaAtual.codigo,
                ativo: this.bicicletaAtual.ativo
            };

            try {
                await axios.post('http://localhost:3000/ativos/', payload);
                await this.carregaBicicletas();
            } catch(err) {
                alert('erro ao inserir a bicicleta');
            }
        }
    },
    async mounted() {
        await this.carregaBicicletas();
       // await this.carregaBicicletas.pop();
    }
}
</script>