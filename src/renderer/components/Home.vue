<template>
    <div>
        <md-empty-state
                md-icon="euro_symbol"
                md-label="Erstelle deine erste Preisliste"
                md-description="Um diese regestrirekasse zu benutzen musst du zuerst eine Preisliste erstellen"
                v-if="!priceLists || !Object.keys(priceLists) || Object.keys(priceLists).length === 0">
            <md-button class="md-primary md-raised" @click="addNewList">Prisliste erstellen</md-button>
        </md-empty-state>


        <div class="md-layout" v-if="priceLists && Object.keys(priceLists).length">

            <md-card class="md-layout-item md-xlarge-size-15 md-large-size-30"
                     v-for="(priceList,priceListId) in priceLists" :key="priceListId">
                <md-card-header>
                    <div class="md-title">{{priceList.name}}</div>
                </md-card-header>

                <md-card-content>
                    {{priceList.priceList.length}} Einträge
                </md-card-content>

                <md-card-actions>
                    <md-button class="md-icon-button" @click="deleteList(priceListId)">
                        <md-icon>delete</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" @click="editList(priceListId)">
                        <md-icon>mode_edit</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" @click="startSession(priceListId)">
                        <md-icon>play_arrow</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card>
        </div>


        <md-dialog-confirm
                :md-active.sync="showDeleteDialog"
                md-title="Liste Löschen"
                md-content="Wollen sie die Liste wirklich löschen"
                md-confirm-text="Löschen"
                md-cancel-text="Abbrechen"
                @md-cancel="cancelDelete"
                @md-confirm="confirmDelete"/>

        <md-button v-if="priceLists && Object.keys(priceLists) && Object.keys(priceLists).length" @click="addNewList"
                   class="md-fab">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<script>
    import {preferenceStore} from '../../store'

    export default {
        name: 'Home',
        data () {
            return {
                priceLists: preferenceStore.get('priceLists'),
                showDeleteDialog: false
            }
        },
        created () {
            this.priceLists = preferenceStore.get('priceLists')
        },
        methods: {
            addNewList () {
                this.$router.push({name: 'new-price-list'})
            },
            cancelDelete () {
                this.resetDeleteDialog()
            },
            confirmDelete () {
                delete this.priceLists[this.priceListIdToDelete]
                preferenceStore.set('priceLists', this.priceLists)
                this.resetDeleteDialog()
            },
            resetDeleteDialog () {
                this.showDeleteDialog = false
                this.priceListIdToDelete = null
            },
            deleteList (priceListId) {
                this.showDeleteDialog = true
                this.priceListIdToDelete = priceListId
            },
            editList (priceListId) {
                this.$router.push({name: 'edit-price-list', params: {id: priceListId}})
            },
            startSession (priceListId) {
                this.$router.push({name: 'cash-register', params: {id: priceListId}})
            }
        }
    }
</script>

<style scoped>

    .md-fab {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

</style>
