<script setup>
import { useRoute, RouterView, useRouter} from 'vue-router'
import {ref, onBeforeMount, onMounted} from "vue"
import landmarks from "../landmarkData.json"

const route = useRoute();
const router = useRouter();

//Filter the Data (Get the Right Landmark)
const landmarksRefA = ref(null);
const landmarksRefB = ref(null);

let landmarksContainerA = [];
let landmarksContainerB = [];

let aVariable = "Attractions";
let aLimit = 0;

let bVariable = "Glasshouses";
let bLimit = 0;

onBeforeMount(function(){
    //Filter A Value
    for(let counter = 0; counter < landmarks.length; counter++){

        //Case A
        if (aLimit < 6){
            if (landmarks[counter].landmark_category == aVariable){
            let landmarksTemporaryA = {
                    "landmark_id": landmarks[counter].landmark_id,
                    "landmark_name": landmarks[counter].landmark_name,
                    "landmark_category": landmarks[counter].landmark_category,
                    "landmark_image_header": landmarks[counter].landmark_image_header,
                }
            
            landmarksContainerA.push(landmarksTemporaryA);
            aLimit++
            }
        } 

        //CaseB
        if (bLimit < 6){
            if (landmarks[counter].landmark_category == bVariable){
            let landmarksTemporaryB = {
                    "landmark_id": landmarks[counter].landmark_id,
                    "landmark_name": landmarks[counter].landmark_name,
                    "landmark_category": landmarks[counter].landmark_category,
                    "landmark_image_header": landmarks[counter].landmark_image_header,
                }
            
            landmarksContainerB.push(landmarksTemporaryB);
            bLimit++
            }
        }

        //If Both Case Finish, end Premature!
        if (aLimit > 5 && bLimit > 5){
            break;
        }
    };

    landmarksRefA.value = landmarksContainerA;
    landmarksRefB.value = landmarksContainerB;
});

let dataA = 0;
let dataB = 0;

function dataAFunction() {
    if (dataA < 6){
        dataA++;
    } else {
        dataA = 0;
    }

    return dataA;
}

function dataBFunction() {
    if (dataB < 6){
        dataB++;
    } else {
        dataB = 0;
    }

    return dataB;
}

//After the Page Loads
onMounted(function(){

//Grids
let gridA = document.getElementById("gridA");

let gridB = document.getElementById("gridB");

let buttonA = document.getElementById("buttonA");

let buttonB = document.getElementById("buttonB");

//Sidebar Activity
var gridStatus = 0;

buttonA.addEventListener("click", function () {
        if (gridStatus != 0) {
            buttonB.classList.toggle("selected");
            gridB.classList.toggle("selectedTab");

            buttonA.classList.toggle("selected");
            gridA.classList.toggle("selectedTab");

            gridStatus = 0;
        }
});

buttonB.addEventListener("click", function () {
        if (gridStatus != 1) {
            buttonB.classList.toggle("selected");
            gridB.classList.toggle("selectedTab");

            buttonA.classList.toggle("selected");
            gridA.classList.toggle("selectedTab");

            gridStatus = 1;
        }
});


});

</script>

<template>
    <div class="categoryPage">
        <div class="categoryHeader"
            v-bind:style="{ 'background-image': 'url(/vueThreeProject/images/buildingHeader.jpg)'}">
            <div class="categoryHeaderShader">
                <h1>Landmarks</h1>
            </div>
        </div>

        <div class="categoryDescription">
            <p class="larger">
                The National Botanical Gardens are home to seven exquisitely restored and extensively planted glasshouses dating back to the 1840s. Today, the glasshouses remain free to enter and open every day of the year except for Christmas.
            </p>
        </div>

        <div class="categoryList">
            <button class="categoryListButton selected" id="buttonA">
                <p class="larger">Attractions</p>
            </button>
            <button class="categoryListButton" id="buttonB">
                <p class="larger">Glasshouses</p>
            </button>
        </div>

        <div class="categoryGrid">
            <!-- Grid A-->
            <div class="grid selectedTab" id="gridA">
                <button class="gridContent" :class="'grid'+dataAFunction()" v-for="landmark in landmarksRefA"
                    :key="landmark.landmark_id" @click="router.push(`/landmarks/${landmark.landmark_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${landmark.landmark_image_header}` + ')'}">
                    <div class="gridContentRectangle">
                        <div class="gridContentLink">
                            <h3>{{ landmark.landmark_name }}<img src="/images/arrow.svg" alt="arrow"></h3>
                        </div>
                    </div>
                </button>
            </div>

            <!-- Grid B-->
            <div class="grid" id="gridB">
                <button class="gridContent" :class="'grid'+dataBFunction()" v-for="landmark in landmarksRefB"
                    :key="landmark.landmark_id" @click="router.push(`/landmarks/${landmark.landmark_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${landmark.landmark_image_header}` + ')'}">
                    <div class="gridContentRectangle">
                        <div class="gridContentLink">
                            <h3>{{ landmark.landmark_name }}<img src="/images/arrow.svg" alt="arrow"></h3>
                        </div>
                    </div>
                </button>
            </div>
            <!-- Grid End -->
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