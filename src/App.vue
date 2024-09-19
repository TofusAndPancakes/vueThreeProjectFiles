<script setup>
import {useRoute, RouterView, RouterLink, useRouter} from "vue-router"
import {ref, onMounted, onBeforeMount} from "vue"

import plantsToday from "./plantTodayData.json"
import landmarksToday from "./landmarkTodayData.json"

const route = useRoute();
const router = useRouter();
let plantLink = ref(null);
let landmarkLink = ref(null);

onBeforeMount(function(){
    plantLink.value = plantsToday.find(plant => plant.plant_id === parseInt(1));
    landmarkLink.value = landmarksToday.find(landmark => landmark.landmark_id === parseInt(1));
})

//After the Page Loads
onMounted(function(){
//Sidebar
let sidebar = document.getElementById("sidebarButton");

//SidebarModal
let sidebarModal = document.getElementById("sidebarModal");
let sidebarModalStyle = window.getComputedStyle(sidebarModal);

//Sidebar Back
let sidebarBack = document.getElementById("sidebarBack");

//Sidebar Activity
var sidebarActive = 0;

sidebar.addEventListener("click", function () {
    //console.log(sidebarModalStyle.getPropertyValue("pointer-events"));
        if (sidebarModalStyle.getPropertyValue("visibility") == "hidden") {
            //console.log(sidebarModalStyle.getPropertyValue("pointer-events"));
            sidebarModal.style.visibility = 'visible';
            sidebarModal.style.opacity = 1;
            sidebarModal.style.pointerEvents = 'auto';
            sidebarBack.classList.toggle("sidebarEnable");
            sidebarActive = 1;
        }
});

sidebarModal.addEventListener("mouseleave", function () {
    //console.log(sidebarModalStyle.getPropertyValue("visibility"));
        if (sidebarModalStyle.getPropertyValue("visibility") == "visible") {
        sidebarModal.style.visibility = 'hidden';
        sidebarModal.style.opacity = 0;
        sidebarModal.style.pointerEvents = 'none';
        sidebarBack.classList.toggle("sidebarEnable");
        sidebarActive = 0;
    }
});

sidebarBack.addEventListener("click", function () {
    //console.log(sidebarModalStyle.getPropertyValue("visibility"));
        if (sidebarModalStyle.getPropertyValue("visibility") == "visible") {
        sidebarModal.style.visibility = 'hidden';
        sidebarModal.style.opacity = 0;
        sidebarModal.style.pointerEvents = 'none';
        sidebarBack.classList.toggle("sidebarEnable");
        sidebarActive = 0;
    }
});

//ESC To exit Sidebar
document.body.addEventListener('keydown', function (e) {
    if (e.key == "Escape"){
        if (sidebarModalStyle.getPropertyValue("visibility") == "visible") {
            sidebarModal.style.visibility = 'hidden';
            sidebarModal.style.opacity = 0;
            sidebarModal.style.pointerEvents = 'none';
            sidebarBack.classList.toggle("sidebarEnable");
            sidebarActive = 0;
        }
    }
    
});

});

</script>


<template>
    <main>
        <div class="navbarSpacing">
            <p>&nbsp;</p>
        </div>

        <div class="navbar">
            <div class="navbarLogo">
                <div class="navbarLogoEntry">
                    <button class="sidebarButton" id="sidebarButton">
                        <img class="larger" src="/images/hamburger.svg" alt="sidebarHamger">
                    </button>
                </div>

                <div class="sidebarModal" id="sidebarModal">
                    <div class="sidebarUpper">
                        <!-- Entries -->
                        <button class="sidebarContent" @click="router.push(`/`)">
                            <div class="sidebarHeader">
                                <p class="title">Home</p>
                                <img src="/images/arrow.svg" alt="sidebarArrowPlant">
                            </div>
                            <hr>
                        </button>

                        <div class="sidebarContent">
                            <button class="sidebarHeader" @click="router.push(`/today`)">
                                <p class="title">Today in Glasnevin</p>
                                <img class="rotate" src="/images/arrow.svg" alt="sidebarArrowPlant">
                            </button>
                            <hr>
                            <button class="sidebarEntry" v-if="plantLink" :key="plantLink.plant_id"
                                @click="router.push(`/plants/${plantLink.plant_id}`)">
                                <div class="sidebarEntryImage">
                                    <img :src="`/vueThreeProject/images/${plantLink.plant_image_header}`"
                                        :alt=plantLink.plant_name>
                                </div>
                                <div class="sidebarEntryText">
                                    <p class="title">{{ plantLink.plant_name }}</p>
                                    <p>{{ plantLink.plant_category }}</p>
                                </div>
                            </button>

                            <button class="sidebarEntry" v-if="landmarkLink" :key="landmarkLink.landmark_id"
                                @click="router.push(`/landmarks/${landmarkLink.landmark_id}`)">
                                <div class="sidebarEntryImage">
                                    <img :src="`/vueThreeProject/images/${landmarkLink.landmark_image_header}`"
                                        :alt=landmarkLink.landmark_name>
                                </div>
                                <div class="sidebarEntryText">
                                    <p class="title">{{ landmarkLink.landmark_name }}</p>
                                    <p>{{ landmarkLink.landmark_category }}</p>
                                </div>
                            </button>

                        </div>
                        <button class="sidebarContent" @click="router.push(`/plants`)">
                            <div class="sidebarHeader">
                                <p class="title">Plants</p>
                                <img src="/images/arrow.svg" alt="sidebarArrowPlant">
                            </div>
                            <hr>
                        </button>
                        <button class="sidebarContent" @click="router.push(`/landmarks`)">
                            <div class="sidebarHeader">
                                <p class="title">Landmarks</p>
                                <img src="/images/arrow.svg" alt="sidebarArrowLandmark">
                            </div>
                            <hr>
                        </button>
                        <a href="https://www.eventbrite.ie/o/national-botanic-gardens-of-ireland-12616155192"
                            target="_blank">
                            <div class="sidebarContent">
                                <div class="sidebarHeader">
                                    <p class="title">Tickets</p>
                                    <img src="/images/arrow.svg" alt="sidebarArrowPlant">
                                </div>
                                <hr>
                            </div>
                        </a>
                    </div>

                    <!-- Sidebar Footer -->
                    <div class="sidebarFooter">
                        <p>IDM 2024 Assignment</p>
                    </div>
                </div>

                <div class="sidebarFull" id="sidebarBack">
                    <p>&nbsp;</p>
                </div>

                <div class="navbarLogoEntry">
                    <button @click="router.push(`/`)">
                        <img src="/images/nbg.jpg" alt="Website Logo">
                    </button>
                    <p class="navbarLogoDescription">Not Official</p>
                </div>

            </div>

            <div class="navbarLinks" @click="router.push(`/`)">
                <button class="navbarEntry">
                    <p>Map</p>
                </button>
            </div>
        </div>
        <RouterView />
    </main>
</template>