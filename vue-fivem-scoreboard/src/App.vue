<template>
  
  <div class="w-screen h-screen  flex justify-center  overflow-hidden bg-none" >
    <Transition name="bounce">
    <div v-if="show" class="w-[839px] h-[261px] bg-[#D9D9D9] flex flex-row rounded-[10px] mt-[8%] overflow-hidden">
      <div class="basis-2/4 flex justify-center items-center ">
        <div class=" bg-[#8F8D8D] w-[60%] h-[60%] rounded-[10px] ">
          <img class="w-[100%] h-[100%] rounded-[10px]" :src="img" >
        </div>
        </div>
        <div class="basis-3/4 flex justify-center items-center ">
          <div class="bg-[#9B9B9B] w-[90%] h-[60%] rounded-[10px] mr-[60px] flex">
            <div class="h-full  basis-3/4  mt-[20px] ">
              <h3 class="text-lg ml-[50px] ">Name : {{Playerdata.name}}</h3>
              <h3 class="text-lg ml-[50px] mt-[10px]">Job : {{Playerdata.job.grade_label}}</h3>
              <h3 class="text-lg ml-[50px] mt-[10px]">Id : {{Playerdata.id}}</h3>
            </div>
            <div class="h-full basis-2/4 mt-[20px]">
              <h3 class="text-lg mt-[10px]">Online : {{Online}}</h3>
              <h3  v-for="(value, key, index) in Counter" class="text-lg mt-[10px]">{{key}} : {{value}}</h3>
              
            </div>
          </div>
      </div>
    </div>
  </Transition>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
const show=ref(false);
const Playerdata=ref({});
const Counter=ref({});
const Online=ref(0);
const img=ref(null);

onMounted(()=>{
  window.addEventListener('message', (event) => {
    if(event.data.action=='open'){
      show.value=true;
      Playerdata.value=event.data.data;
      img.value=event.data.img;
    }else if(event.data.action=='update'){
      Counter.value=event.data.counter;
      Online.value=event.data.online;
    }else if(event.data.action=='changejob'){
      Playerdata.value.job=event.data.job
    
    }else if(event.data.action=='close'){
      show.value=false;
    }
});
});
</script>

<style lang="scss" scoped>

</style>