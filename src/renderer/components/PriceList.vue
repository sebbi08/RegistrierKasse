<template>
    <div class="bottombar-padding">
        <div class="md-layout" v-if="prices.length">

            <md-card class="md-layout-item md-xlarge-size-15 md-large-size-30" v-for="price in prices"
                     :key="price.name">
                <md-card-header>
                    <div class="md-title">{{price.name}}</div>
                </md-card-header>

                <md-card-content>
                    {{Number.parseFloat(price.price).toFixed(2).toString().replace(".",",")}}€
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-icon-button" @click="deletePrice(price)">
                        <md-icon>delete</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" @click="editPrice(price)">
                        <md-icon>mode_edit</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card>
        </div>
        <md-empty-state
                md-icon="clear"
                md-label=""
                md-description="Kein prise vorhanden"
                v-if="prices.length === 0">
            <md-button class="md-primary md-raised" @click="addPrice">Preis hinzufügen</md-button>
        </md-empty-state>

        <md-button v-if="prices.length" @click="addPrice" class="md-fab">
            <md-icon>add</md-icon>
        </md-button>


        <md-dialog-confirm
                :md-active.sync="showDeleteDialog"
                :md-title="deleteTitle"
                :md-content="deleteContent"
                md-confirm-text="Löschen"
                md-cancel-text="Abbrechen"
                @md-cancel="cancelDelete"
                @md-confirm="confirmDelete"/>

        <md-dialog :md-active.sync="showPriceDialog">

            <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input @keyup.enter="validatePrice" name="name" id="name" v-model="priceToEdit.name"/>
                <span class="md-error" v-if="!$v.priceToEdit.name.required">Ein Name muss angegeben werden</span>
            </md-field>

            <md-field :class="getValidationClass('price')">
                <label for="price">Preis</label>
                <md-input @keyup.enter="validatePrice" type="number" name="price" id="price"
                          v-model="priceToEdit.price"/>
                <span class="md-error" v-if="!$v.priceToEdit.price.required">Ein Preis muss angegeben werden</span>
            </md-field>

            <md-dialog-actions>
                <md-button class="" @click="resetPriceDialog(false)">Close</md-button>
                <md-button class="md-primary" @click="validatePrice">Save</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-dialog-prompt
                :md-active.sync="showListNameDialog"
                v-model="listName"
                md-title="Name der Liste"
                md-cancel-text="Abbrechen"
                md-confirm-text="Speichern"
                @md-confirm="saveList"
                @md-cancel="showListNameDialog = false"/>

        <div class="phone-viewport">
            <md-button @click="cancelList">Abbrechen</md-button>
            <md-button @click="openListNameDialog" class="md-primary">Speichern</md-button>
        </div>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'
    import {preferenceStore} from '../../store'

    export default {
        name: 'PriceList',
        mixins: [validationMixin],
        data: function () {
            return {
                prices: [],
                deleteTitle: '',
                deleteContent: '',
                priceToDelete: null,
                showDeleteDialog: false,
                showPriceDialog: false,
                addNewPrice: null,
                priceToEdit: this.generateNewPrice(),
                listName: '',
                showListNameDialog: false
            }
        },
        created () {
            let id = this.$route.params.id
            if (id) {
                let priceLists = preferenceStore.get('priceLists')
                let priceList = priceLists[id]
                this.listName = priceList.name
                this.prices = priceList.priceList
                this.oldPriceLists = JSON.parse(JSON.stringify(priceLists))
            } else {
                this.listName = ''
                this.prices = []
            }
        },
        methods: {
            goBack () {
                this.$router.push('/')
            },
            addPrice () {
                this.editPrice(null)
            },
            deletePrice (priceToDelete) {
                this.deleteTitle = priceToDelete.name + ' löschen?'
                this.deleteContent = priceToDelete.name + ' wirklich löschen?'
                this.priceToDelete = priceToDelete
                this.showDeleteDialog = true
            },
            editPrice (priceToEdit) {
                this.addNewPrice = !priceToEdit
                this.oldPriceToEdit = JSON.parse(JSON.stringify(priceToEdit))
                this.priceToEdit = priceToEdit || this.generateNewPrice()
                this.showPriceDialog = true
            },
            savePrice () {
                if (this.addNewPrice) {
                    for (let i = 0; i < 10; i++) {
                        this.prices.push({
                            name: this.priceToEdit.name + i,
                            price: Number.parseFloat(this.priceToEdit.price++)
                        })
                    }
                }
                this.resetPriceDialog(true)
            },
            resetPriceDialog (dontReset) {
                if (!this.addNewPrice && !dontReset) {
                    this.priceToEdit.name = this.oldPriceToEdit.name
                    this.priceToEdit.price = Number.parseFloat(this.oldPriceToEdit.price)
                }
                this.showPriceDialog = false
                this.addNewPrice = null
                this.oldPriceToEdit = null
                this.priceToEdit = this.generateNewPrice()
                this.$v.$reset()
            },
            generateNewPrice () {
                return {
                    name: '',
                    price: null
                }
            },
            confirmDelete () {
                let priceToDelete = this.priceToDelete
                this.resetDeleteDialog()
                this.prices.splice(this.prices.findIndex(price => price.name === priceToDelete.name), 1)
            },
            cancelDelete () {
                this.resetDeleteDialog()
            },
            resetDeleteDialog () {
                this.showDeleteDialog = false
                this.deleteTitle = ''
                this.deleteContent = ''
                this.priceToDelete = null
            },
            validatePrice () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.savePrice()
                }
            },
            getValidationClass (fieldName) {
                const field = this.$v.priceToEdit[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            cancelList () {
                if (this.$route.params.id) {
                    preferenceStore.set('priceLists', this.oldPriceLists)
                }
                this.goBack()
            },
            openListNameDialog () {
                this.showListNameDialog = true
            },
            saveList () {
                let priceLists = preferenceStore.get('priceLists') || {}
                priceLists[new Date().getTime()] = {
                    name: this.listName,
                    priceList: this.prices
                }
                if (this.$route.params.id) {
                    delete priceLists[this.$route.params.id]
                }
                preferenceStore.set('priceLists', priceLists)
                this.goBack()
            }
        },
        validations: {
            priceToEdit: {
                name: {
                    required
                },
                price: {
                    required
                }
            }
        },
        watch: {
            $route: function (to, from) {
                // react to route changes...
            }
        }
    }
</script>

<style lang="less" scoped>
    .md-card {
        margin-bottom: 15px;
        margin-left: 0;
        margin-right: 30px;
    }

    .iconcard {
        .md-card-content, .md-layout {
            height: 100%;
        }
    }

    .md-fab {
        position: fixed;
        right: 20px;
        bottom: 80px;
    }

    .bottombar-padding {
        margin-bottom: 60px;
    }

    .md-field {
        &:first-child {
            margin-top: 30px;
        }
        margin-left: 20px;
        margin-right: 20px;
        width: auto;
    }

    .phone-viewport {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 60px;
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        z-index: 1;
        background: white;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
    }
</style>
