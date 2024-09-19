<!-- Obtain Data -->
<script setup>
import { useRoute, RouterView, useRouter} from 'vue-router'
import {ref, onBeforeMount, watch} from "vue"
import landmarks from "../landmarkData.json"
import landmarksToday from "../landmarkTodayData.json"

const route = useRoute();
const router = useRouter();

//Filter the Data (Get the Right landmark)
let landmarksFiltered = ref(null);
let landmarksOthers = ref(null);
const {id} = route.params;

onBeforeMount(function(){
    landmarksFiltered.value = landmarks.find(landmark => landmark.landmark_id === parseInt(id));
    landmarksOthers.value = landmarksToday;
});

//https://stackoverflow.com/questions/40404787/best-practice-for-reacting-to-params-changes-with-vue-router
watch(route, () => {
    const {id} = route.params;

    landmarksFiltered.value = landmarks.find(landmark => landmark.landmark_id === parseInt(id));
    landmarksOthers.value = landmarksToday;
});

function scrollTo(id){
    const yOffset = -100; 
    const element = document.getElementById(id);
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
        behavior: "smooth",
        top: y,
    });
}

</script>

<template>
    <div class="generalPage" v-if="landmarksFiltered">
        <div class="generalHeader">
            <div class="generalHeaderTitle">
                <h2>{{ landmarksFiltered.landmark_name }}</h2>
                <p>{{ landmarksFiltered.landmark_header_description }}</p>
            </div>
            <div class="generalHeaderImage">
                <img v-if="landmarksFiltered.landmark_image_header"
                    :src="`/vueThreeProject/images/${landmarksFiltered.landmark_image_header}`"
                    :alt=landmarksFiltered.landmark_name>
            </div>
        </div>

        <div class="generalContainer" v-if="landmarksFiltered.landmark_description">
            <div class="generalSideHeader">
                <h3 v-for="landmark_chapter in landmarksFiltered.landmark_description"
                    :key="landmarksFiltered.landmark_description.landmark_chapter">
                    <button @click="scrollTo(landmark_chapter.landmark_chapter_id);">
                        {{ landmark_chapter.landmark_chapter }}</button>
                </h3>
            </div>
            <div class="generalContainerContent">
                <div v-for="landmark_chapter in landmarksFiltered.landmark_description"
                    :key="landmarksFiltered.landmark_description.landmark_chapter" class="generalContainerParagraph">
                    <h3 :id=landmark_chapter.landmark_chapter_id>{{ landmark_chapter.landmark_chapter }}</h3>
                    <hr>
                    <p>{{ landmark_chapter.landmark_chapter_description }}</p>
                    <div class="generalContainerImage" v-if="landmark_chapter.landmark_chapter_image">
                        <img :src="`/vueThreeProject/images/${landmark_chapter.landmark_chapter_image}`"
                            :alt=landmarksFiltered.landmark_name>
                        <div class="generalContainerImageCaption">
                            <p>Image of {{ landmarksFiltered.landmark_name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="generalLinks">
            <h2>Other landmarks...</h2>
            <div class="generalLinksContainer">
                <button class="generalImageContainer" v-for="landmark in landmarksOthers" :key="landmark.landmark_id"
                    @click="router.push(`/landmarks/${landmark.landmark_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${landmark.landmark_image_header}` + ')'}">
                    <div class="generalImageRectangle">
                        <div class="generalLinkDescription">
                            <p class="title">{{ landmark.landmark_name}}</p>
                            <p class="subtitle">{{ landmark.landmark_category}}</p>
                        </div>
                        <div class="generalLinkArrow">
                            <img src="/images/arrow.svg" alt="arrowLink">
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Landmark not Found</p>
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
