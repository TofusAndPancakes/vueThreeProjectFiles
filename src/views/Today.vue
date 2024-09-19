<script setup>
import { useRoute, RouterView, useRouter} from 'vue-router'
import {ref, onBeforeMount, onMounted} from "vue"
import plantsToday from "../plantTodayData.json"
import landmarksToday from "../landmarkTodayData.json"

const route = useRoute();
const router = useRouter();

//Filter the Data (Get the Right Landmark)
const plantsRef = ref(null);
const landmarksRef = ref(null);

onBeforeMount(function(){
    plantsRef.value = plantsToday;
    landmarksRef.value = landmarksToday;
});

let dataA = 0;

function dataAFunction() {
    if (dataA < 3){
        dataA++;
    } else {
        dataA = 0;
    }

    return dataA;
}

</script>

<template>
    <div class="summaryPage">
        <div class="summaryHeader">
            <div class="summaryHeaderTitle">
                <h1 class="title">Today In The Garden</h1>
                <p>Find out what’s going on in the National Botanical Garden today! Check this page for notices on events or special garden announcements.</p>
            </div>
            <div class="summaryHeaderImage">
                <img src="/images/todayHeader.jpg" alt="">
            </div>
        </div>

        <div class="summaryContainer">
            <div class="summaryContainerHeader">
                <h2>Today's Plants</h2>
                <hr>
            </div>
            <div class="summaryContainerDescription">
                <p>Check out today’s must see plants!</p>
            </div>
            <div class="summaryGrid">
                <button class="summaryGridHorizontal" :class="'gridHorizontal'+dataAFunction()"
                    v-for="plant in plantsRef" :key="plant.plant_id" @click="router.push(`/plants/${plant.plant_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${plant.plant_image_header}` + ')'}">
                    <div class="summaryGridHorizontalRectangle">
                        <div class="gridHorizontalDescription">
                            <h3>{{ plant.plant_name }}</h3>
                            <p>{{ plant.plant_category }}</p>
                        </div>
                        <div class="gridHorizontalArrow">
                            <img src="/images/arrow.svg" alt="arrowLink">
                        </div>
                    </div>
                </button>
            </div>
        </div>

        <div class="summaryContainer">
            <div class="summaryContainerHeader">
                <h2>Today's Landmarks</h2>
                <hr>
            </div>
            <div class="summaryContainerDescription">
                <p>Visit today’s recommended glasshouses during your stay at the garden!</p>
            </div>
            <div class="summaryGridColumn">
                <button class="summaryGridVertical" v-for="landmark in landmarksRef" :key="landmark.landmark_id"
                    @click="router.push(`/landmarks/${landmark.landmark_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${landmark.landmark_image_header}` + ')'}">
                    <div class="summaryGridVerticalRectangle">
                        <div class="gridVerticalDescription">
                            <h3>{{ landmark.landmark_name }}</h3>
                            <p>{{ landmark.landmark_category }}</p>
                        </div>
                        <div class="gridVerticalArrow">
                            <img src="/images/arrow.svg" alt="arrowLink">
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footerContainer">
            <div class="footerEntry">
                <div class="footerLogo">
                    <img src="/images/nbgInverse.png" alt="Website Logo">
                </div>
            </div>
            <div class="footerEntry">
                <p class="title">Location</p>
                <p>Glasnevin<br>Dublin 9<br>IrelandD09<br>VY63</p>
            </div>
            <div class="footerEntry">
                <p class="title">Open Hours</p>
                <p>9am – 4:30pm Weekdays</p>
                <p>10am – 4:30pm Saturday, Sunday</p>
                <p>10am – 4:30pm Public Holidays</p>
            </div>
            <div class="footerEntry">
                <p class="title">Contact</p>
                <p>botanicgardens@opw.ie</p>
                <p>+353 1 804 0300</p>
            </div>
            <div class="footerEntry">
                <p class="title">Follow Us</p>
                <div class="footerFollow">
                    <a href="https://www.instagram.com/nationalbotanicgardens_ireopw?igsh=MWhzaWFlb2kxOWRjaA=="
                        target="_blank">
                        <div class="footerFollowEntry">
                            <img src="/images/instagram.png" alt="Instagram">
                        </div>
                    </a>
                    <a href="https://www.facebook.com/nationalbotanicgardens/" target="_blank">
                        <div class="footerFollowEntry">
                            <img src="/images/facebook.png" alt="Facebook">
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>