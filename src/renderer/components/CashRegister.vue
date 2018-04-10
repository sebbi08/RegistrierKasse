<template>
    <div>
        <span class="md-display-3">{{listName}}</span>
        <div class="md-layout md-gutter nopadding">
            <div class="md-layout-item md-layout md-size-70">
                HALLO
            </div>
            <div class="md-layout-item md-layout md-size-30">
                WELT
            </div>
        </div>
    </div>
</template>

<script>
    import {preferenceStore} from '../../store'

export default {
        name: 'CashRegister',
        data () {
            return {
                listName: '',
                prices: []
            }
        },
        created () {
            let id = this.$route.params.id
            let priceLists = preferenceStore.get('priceLists')
            let priceList = priceLists[id]
            this.listName = priceList.name
            this.prices = priceList.priceList
        }
    }
</script>

<style scoped>
    .nopadding{
        margin-right: -16px;
        margin-left: -16px;
    }
</style>