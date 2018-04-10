<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <span class="md-title">Registrier Kasse</span>
            </md-app-toolbar>
            <md-app-content>
                <transition :name="transitionName">
                    <router-view></router-view>
                </transition>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    export default {
        name: 'registrierkasse',
        data () {
            return {
                transitionName: ''
            }
        },
        // then, in the parent component,
        // watch the `$route` to determine the transition to use
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>

<style scoped>
    .md-app {
        min-height: 100vh;
        max-height: 100vh;
    }
</style>
