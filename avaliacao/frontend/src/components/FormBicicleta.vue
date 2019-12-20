<template>
    <b-form>
        <b-form-group
            id="input-codigo"
            label="Código"
            label-for="txtCodigo"
            description="Informe o código único do ativo"
            :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo"
                v-model="content.codigo"
                type="text"
                required
                placeholder="código do ativo"
                @input="handleInput"
                :disabled="!content.isNew"/>
        </b-form-group>

    <!-- campo da descrição -->
        <b-form-group
            id="input-codigo"
            label="Descrição"
            label-for="txtDescricao"
            :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo"
                v-model="content.descricao"
                type="text"
                required
                placeholder="Digite a Descrição"
                @input="handleInput"
                :disabled="!content.isNew"/>
        </b-form-group>
<!-- // campo da descrição -->     


        </b-form>
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            content: {
                codigo: this.value.codigo,
                // ativo: (this.value.ativo ==='Y'),
                isNew: this.value.isNew
            }

        }
    },
    methods: {
        handleInput () {
            let retorno = {
                codigo: this.content.codigo,
                descricao: this.content.descricao,
                // ativo: this.content.ativo ? 'Y' : 'N',
                isNew: this.content.isNew
            };
            this.$emit('input', retorno);
        }
    }
}
</script>
