<!-- Obtain Data -->
<script setup>
import { useRoute, RouterView, useRouter} from 'vue-router'
import {ref, onBeforeMount, watch} from "vue"
import plants from "../plantData.json"
import plantsToday from "../plantTodayData.json"

const route = useRoute();
const router = useRouter();

//Filter the Data (Get the Right Plant)
let plantsFiltered = ref(null);
let plantsOthers = ref(null);
const {id} = route.params;

onBeforeMount(function(){
    plantsFiltered.value = plants.find(plant => plant.plant_id === parseInt(id));
    plantsOthers.value = plantsToday;
});

watch(route, () => {
    const {id} = route.params;

    plantsFiltered.value = plants.find(plant => plant.plant_id === parseInt(id));
    plantsOthers.value = plantsToday;
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
    <div class="generalPage" v-if="plantsFiltered">
        <div class="generalHeader">
            <div class="generalHeaderTitle">
                <h2>{{ plantsFiltered.plant_name }}</h2>
                <p>{{ plantsFiltered.plant_scientific }}</p>
                <p>{{ plantsFiltered.plant_header_description }}</p>
            </div>
            <div class="generalHeaderImage">
                <img v-if="plantsFiltered.plant_image_header"
                    :src="`/vueThreeProject/images/${plantsFiltered.plant_image_header}`"
                    :alt=plantsFiltered.plant_name>
            </div>
        </div>

        <div class="generalContainer" v-if="plantsFiltered.plant_description">
            <div class="generalSideHeader">
                <h3 v-for="plant_chapter in plantsFiltered.plant_description"
                    :key="plantsFiltered.plant_description.plant_chapter">
                    <button @click="scrollTo(plant_chapter.plant_chapter_id);">
                        {{ plant_chapter.plant_chapter }}
                    </button>
                </h3>
            </div>
            <div class="generalContainerContent">
                <div v-for="plant_chapter in plantsFiltered.plant_description"
                    :key="plantsFiltered.plant_description.plant_chapter" class="generalContainerParagraph">
                    <h3 :id=plant_chapter.plant_chapter_id>{{ plant_chapter.plant_chapter }}</h3>
                    <hr>
                    <p>{{ plant_chapter.plant_chapter_description }}</p>
                    <div class="generalContainerImage" v-if="plant_chapter.plant_chapter_image">
                        <img :src="`/vueThreeProject/images/${plant_chapter.plant_chapter_image}`"
                            :alt=plantsFiltered.plant_name>
                        <div class="generalContainerImageCaption">
                            <p>Image of {{ plantsFiltered.plant_name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="generalLinks">
            <h2>Other plants...</h2>
            <div class="generalLinksContainer">
                <button class="generalImageContainer" v-for="plant in plantsOthers" :key="plant.plant_id"
                    @click="router.push(`/plants/${plant.plant_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${plant.plant_image_header}` + ')'}">
                    <div class="generalImageRectangle">
                        <div class="generalLinkDescription">
                            <p class="title">{{plant.plant_name}}</p>
                            <p class="subtitle">{{plant.plant_category }}</p>
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
        <p>Plant not Found</p>
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
