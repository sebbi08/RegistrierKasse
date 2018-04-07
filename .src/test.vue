<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary">
                <span class="md-title">Registrier Kasse</span>
            </md-app-toolbar>

            <md-app-content>
                <md-empty-state
                        md-icon="euro_symbol"
                        md-label="Erstelle deine erste Preisliste"
                        md-description="Um diese regestrirekasse zu benutzen musst du zuerst eine Preisliste erstellen"
                        v-if="!priceLists || priceLists.length === 0">
                    <md-button class="md-primary md-raised">Prisliste erstellen</md-button>
                </md-empty-state>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import {preferenceStore} from './store';

    export default {
        name: 'test',
        data() {
            return {
                priceLists: preferenceStore.get("priceLists"),
            }
        }
    }
</script>
