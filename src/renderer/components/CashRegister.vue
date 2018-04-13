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
            <div class="md-layout-item md-layout md-size-30 fit-content" v-if="currentCard.length">
                <div class="md-layout-item md-size-100 horizontal-line fit-content">
                    <table>
                        <tr v-for="(cardItem,index) in currentCard">
                            <td>{{index !== 0 ? '+' : ''}}</td>
                            <td>{{cardItem.name}}</td>
                            <td>{{(cardItem.count * cardItem.price).toFixed(2).toString().replace(".",",")}}€</td>
                            <td>x{{cardItem.count}}</td>
                            <td class="md-clickable" @click="removeFromCard(index)">
                                <md-icon>delete</md-icon>
                            </td>
                        </tr>
                    </table>
                    <div>


                    </div>
                </div>
                <div class="md-display-1">All : {{currentSum}}€
                </div>
            </div>
        </div>

        <div class="phone-viewport">
            <md-button class="" @click="goBack()">Abbrechen</md-button>
            <md-button class="md-primary" @click="clear()">Clear</md-button>
        </div>
    </div>
</template>

<script>
    import {preferenceStore} from '../../store'
    import isOnline from 'is-online'

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
        computed: {
            currentSum: function () {
                return this.currentCard.reduce((a, b) => {
                    return a + (b.price * b.count)
                }, 0).toFixed(2).toString().replace('.', ',')
            }
        },
        methods: {
            goBack () {
                this.$router.push('/')
            },
            addToCart (itemToAdd) {
                let foundItem = this.currentCard.find(function (item) {
                    return item.name === itemToAdd.name && item.price === itemToAdd.price
                })
                if (foundItem) {
                    foundItem.count++
                } else {
                    this.currentCard.push(Object.assign({count: 1}, JSON.parse(JSON.stringify(itemToAdd))))
                }
            },
            removeFromCard (index) {
                let itemToRemove = this.currentCard[index]
                itemToRemove.count--
                if (itemToRemove.count === 0) {
                    this.currentCard.splice(index, 1)
                }
            },
            clear () {
                let data = {
                    date: new Date(),
                    card: this.currentCard
                }
                isOnline().then((online) => {
                    if (online) {
                        this.$http.push()
                    } else {
                        let actions = preferenceStore.get('actions')
                        if (!actions) {
                            actions = []
                        }
                        actions.push(data)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .fit-content{
        height: fit-content;
    }
    .md-clickable {
        cursor: pointer;
    }

    .height-auto {
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
