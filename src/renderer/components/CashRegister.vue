<template>
    <div>
        <span class="md-display-3">{{listName}}</span>
        <div class="md-layout md-gutter nopadding">
            <div class="md-layout-item md-layout md-size-70">
                <div class="height-auto md-card md-with-hover md-layout-item md-xlarge-size-20 md-large-size-40"
                     v-for="price in prices"
                     :key="price.name" @click="addToCart(price)">

                    <md-ripple>
                        <div class="flex">
                            <div>
                                <md-card-header>
                                    <div class="md-title">{{price.name}}</div>
                                </md-card-header>

                                <md-card-content>
                                    {{price.price.toFixed(2).toString().replace(".",",")}}€
                                </md-card-content>
                            </div>
                            <div>
                                <md-icon class="md-size-3x">add</md-icon>
                            </div>
                        </div>
                    </md-ripple>
                </div>
            </div>
            <div class="md-layout-item md-layout md-size-30" v-if="currentCard.length">
                <div class="md-layout-item md-size-100 horizontal-line">
                    <table>
                        <tr v-for="(cardItem,index) in currentCard">
                            <td>{{index !== 0 ? '+' : ''}}</td>
                            <td>{{cardItem.name}}</td>
                            <td>{{cardItem.price.toFixed(2).toString().replace(".",",")}}€</td>
                            <td class="md-clickable" @click="removeFromCard(index)">
                                <md-icon>delete</md-icon>
                            </td>
                        </tr>
                    </table>
                    <div>


                    </div>
                </div>
                <div class="md-display-1">All : {{currentCard.reduce((a,b)=> {return a + b.price},0).toFixed(2).toString().replace(".",",")}}€</div>
            </div>
        </div>

        <div class="phone-viewport">
            <md-button class="md-primary" @click="clear()">Clear</md-button>
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
                prices: [],
                currentCard: []
            }
        },
        created () {
            let id = this.$route.params.id
            let priceLists = preferenceStore.get('priceLists')
            let priceList = priceLists[id]
            this.listName = priceList.name
            this.prices = priceList.priceList
        },
        methods: {
            addToCart (price) {
                this.currentCard.push(price)
            },
            removeFromCard (index) {
                this.currentCard.splice(index, 1)
            },
            clear () {
                let actions = preferenceStore.get('actions')
                //TODO LOCAL AND SERVER SAVE
            }
        }
    }
</script>

<style scoped>
    .md-clickable{
        cursor: pointer;
    }

    .height-auto{
        height: fit-content;
    }

    .horizontal-line {
        border-bottom: 1px solid rgba(0, 0, 0, 0.54);
    }

    .flex {
        display: flex;
    }

    .flex > :last-child {
        margin-left: 32px;
        align-self: center;
    }

    .md-card {
        margin-bottom: 15px;
        margin-left: 0;
        margin-right: 30px;
    }

    .nopadding {
        margin-right: -16px;
        margin-left: -16px;
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
