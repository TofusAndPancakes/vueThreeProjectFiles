<script setup>
import { useRoute, RouterView, useRouter} from 'vue-router'
import {ref, onBeforeMount, onMounted} from "vue"
import plants from "../plantData.json"

const route = useRoute();
const router = useRouter();

//Filter the Data (Get the Right Plant)
const plantsRefA = ref(null);
const plantsRefB = ref(null);

let plantsContainerA = [];
let plantsContainerB = [];

let aVariable = "Unique";
let aLimit = 0;

let bVariable = "Smell";
let bLimit = 0;

onBeforeMount(function(){
    //Filter A Value
    for(let counter = 0; counter < plants.length; counter++){

        //Case A
        if (aLimit < 6){
            if (plants[counter].plant_category == aVariable){
            let plantsTemporaryA = {
                    "plant_id": plants[counter].plant_id,
                    "plant_name": plants[counter].plant_name,
                    "plant_scientific": plants[counter].plant_scientific,
                    "plant_category": plants[counter].plant_category,
                    "plant_image_header": plants[counter].plant_image_header,
                }
            
            plantsContainerA.push(plantsTemporaryA);
            aLimit++
            }
        } 

        //CaseB
        if (bLimit < 6){
            if (plants[counter].plant_category == bVariable){
            let plantsTemporaryB = {
                    "plant_id": plants[counter].plant_id,
                    "plant_name": plants[counter].plant_name,
                    "plant_scientific": plants[counter].plant_scientific,
                    "plant_category": plants[counter].plant_category,
                    "plant_image_header": plants[counter].plant_image_header,
                }
            
            plantsContainerB.push(plantsTemporaryB);
            bLimit++
            }
        }

        //If Both Case Finish, end Premature!
        if (aLimit > 5 && bLimit > 5){
            break;
        }
    };

    plantsRefA.value = plantsContainerA;
    plantsRefB.value = plantsContainerB;
});

let dataA = 0;
let dataB = 0;

function dataAFunction() {
    if (dataA < 5){
        dataA++;
    } else {
        dataA = 1;
    }

    return dataA;
}

function dataBFunction() {
    if (dataB < 5){
        dataB++;
    } else {
        dataB = 1;
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
            v-bind:style="{ 'background-image': 'url(/vueThreeProject/images/plantHeader.jpg)'}">
            <div class="categoryHeaderShader">
                <h1>Plants</h1>
            </div>
        </div>

        <div class="categoryDescription">
            <p class="larger">
                The National Botanical Gardens house approximately 20,000 living plants. The garden offers free entry and is a centre for horticultural research. The garden is also famous for its breeding of many prized orchids. The National Herbarium of the Garden contains samples of fruits, seeds, woods, and plant extracts collected over the garden’s two-hundred-year history.
            </p>
        </div>

        <div class="categoryList">
            <button class="categoryListButton selected" id="buttonA">
                <p class="larger">Unique</p>
            </button>
            <button class="categoryListButton" id="buttonB">
                <p class="larger">Smell</p>
            </button>
        </div>

        <div class="categoryGrid">
            <!-- Grid A-->
            <div class="grid selectedTab" id="gridA">
                <button class="gridContent" :class="'grid'+dataAFunction()" v-for="plant in plantsRefA"
                    :key="plant.plant_id" @click="router.push(`/plants/${plant.plant_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${plant.plant_image_header}` + ')'}">
                    <div class="gridContentRectangle">
                        <div class="gridContentLink">
                            <h3>{{ plant.plant_name }}<img src="/images/arrow.svg" alt="arrow"></h3>
                        </div>
                    </div>
                </button>
            </div>

            <!-- Grid B-->
            <div class="grid" id="gridB">
                <button class="gridContent" :class="'grid'+dataBFunction()" v-for="plant in plantsRefB"
                    :key="plant.plant_id" @click="router.push(`/plants/${plant.plant_id}`)"
                    v-bind:style="{ 'background-image': 'url(' + `/vueThreeProject/images/${plant.plant_image_header}` + ')'}">
                    <div class="gridContentRectangle">
                        <div class="gridContentLink">
                            <h3>{{ plant.plant_name }}<img src="/images/arrow.svg" alt="arrow"></h3>
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