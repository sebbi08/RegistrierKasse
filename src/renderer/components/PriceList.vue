<template>
    <div>
        <div class="md-layout" v-if="prices && prices.length">

            <md-card class="md-layout-item md-xlarge-size-15 md-large-size-30" v-for="price in prices"
                     :key="price.name">
                <md-card-header>
                    <div class="md-title">{{price.name}}</div>
                </md-card-header>

                <md-card-content>
                    {{price.price}}
                </md-card-content>

                <md-card-actions>
                    <md-button @click="deletePrice(price)">Delete</md-button>
                    <md-button @click="editPrice(price)">Edit</md-button>
                </md-card-actions>
            </md-card>
        </div>
        <md-empty-state
                md-icon="clear"
                md-label=""
                md-description="Kein prise vorhanden"
                v-if="!prices || prices.length === 0">
            <md-button class="md-primary md-raised" @click="addPrice">Preis hinzufügen</md-button>
        </md-empty-state>

        <md-button v-if="prices && prices.length" @click="addPrice" class="md-fab">
            <md-icon>add</md-icon>
        </md-button>


        <md-dialog-confirm
                :md-active.sync="showDeleteDialog"
                :md-title="deleteTitle"
                :md-content="deleteContent"
                md-confirm-text="Löschen"
                md-cancel-text="Abbrechen"
                @md-cancel="cancleDelete"
                @md-confirm="confirmDelete"/>
    </div>
</template>

<script>
    export default {
        name: 'NewPriceList',
        methods: {
            goBack () {
                this.$router.push('/')
            },
            addPrice () {
                console.error('LOG')
            },
            deletePrice (priceToDelete) {
                this.deleteTitle = priceToDelete.name + ' löschen?'
                this.deleteContent = priceToDelete.name + ' wirklich löschen?'
                this.priceToDelete = priceToDelete
                this.showDeleteDialog = true
            },
            editPrice () {
                console.error('EDIT', arguments)
            },
            confirmDelete () {
                let priceToDelete = this.priceToDelete
                this.resettDeleteDialog()
                this.prices.splice(this.prices.findIndex(price => price.name === priceToDelete.name), 1)
            },
            cancleDelete () {
                this.resettDeleteDialog()
            },
            resettDeleteDialog () {
                this.showDeleteDialog = false
                this.deleteTitle = ''
                this.deleteContent = ''
                this.priceToDelete = null
            }
        },
        data () {
            return {
                prices: [
                    {name: 'Pommes', price: 1.25},
                    {name: 'Pommes1', price: 1.25},
                    {name: 'Pommes2', price: 1.25},
                    {name: 'Pommes3', price: 1.25},
                    {name: 'Pommes4', price: 1.25},
                    {name: 'Pommes5', price: 1.25}
                ],
                deleteTitle: '',
                deleteContent: '',
                priceToDelete: null,
                showDeleteDialog: false
            }
        }
    }
</script>

<style lang="less" scoped>
    .md-card {
        margin-bottom: 15px;
    }

    .md-card:first-child {
        margin-left: 0;
    }

    .md-card:last-child {
        margin-right: 0;
    }

    .iconcard {
        .md-card-content, .md-layout {
            height: 100%;
        }
    }

    .md-fab {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }
</style>