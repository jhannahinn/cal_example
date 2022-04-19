<template lang="html">
  <section>
    <div id="introMainArea">

      <div id="titleArea">
        <h6 class="pageTitle">Calender</h6>
        <div class="pointLine"></div>
      </div>


      <div id="introMainContent">
        <div id="introCalenderMove">
          <img src="http://www.haro.kr/staticImage/image/useful/leftArrow.png" @click="calenderPreviousMonth()">
          <div>
            <input v-on:keyup.enter="calenderYearMove()" v-on:blur="calenderYearCheck()" type="number"  id="choiceYear" v-model="state.selYear">
            <h6>년</h6>
            <input v-on:keyup.enter="calenderMonthMove()" v-on:blur="calenderMonthCheck()" type="number" id="choiceMonth" v-model="state.selMonth">
            <h6>월</h6>
          </div>
          <img src="http://www.haro.kr/staticImage/image/useful/rightArrow.png" @click="calenderNextMonth()">
        </div>

        <div id="daysTitle" v-for="(item, i) in state.days" :key="`A-${i}`">
          <h6 v-if="item=='토'||item=='일'" style="color:red">{{item}}</h6>
          <h6 v-else>{{item}}</h6>
        </div>

        <div id="daysContent" v-for="n in state.startDatePosition" v-bind:key="n">
        </div>

        <div id="daysContent" v-for="(calenderData, i) in state.calenderData" :key="`B-${i}`" v-on:click="test(calenderData.days)">
          <div>
            <div v-if="calenderData.isWeekend==true && calenderData.isToday==false" class="weekend">
              <h4>{{calenderData.days}}</h4>
            </div>
            <div v-if="calenderData.isWeekend==false && calenderData.isToday==false" class="weekdays">
              <h4>{{calenderData.days}}</h4>
            </div>
            <div v-if="calenderData.isToday==true" class="today">
              <h4>{{calenderData.days}}(오늘)</h4>
              <div class="mobilePart"><h6>1</h6></div>
              <h6 class="pcPart">최고기온 : 40℃</h6>
              <h6 class="pcPart">최저기온 : 20℃</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import router from "@/routes/routes.js"
import {reactive} from 'vue'
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'

export default {
  router,
  setup(){
    const state = reactive({
      year : ['2016','2017','2018','2019','2020','2021','2022'],
      days : ['일','월','화','수','목','금','토'],
      selYear : '', // 현재 입력된 값
      oriYear : '', // 처음 페이지 로딩시 값
      selMonth : '', // 현재 입력된 값
      oriMonth : '', // 처음 페이지 로딩시 값
      lastDate : '',
      startDatePosition : '',
      calenderData : ''
    })

    //캘린더에서 움직일 수 있는 날짜
    const minYear = 2000;
    const maxYear = 2030;

    const test = (a) => {
      alert(a);
    }
    const calenderTodayMove = () => {
      router.push('/mainpage/homecalender');
    }

    //엔터 입력시 input값 검사 후 router 시킴
    const calenderYearMove = () => {
      if(Number(state.selYear) >= minYear && Number(state.selYear) <= maxYear){
        router.push('/mainPage/homecalender/'+state.selYear+'/'+state.selMonth);
      }else{
        state.selYear = state.oriYear;
      }
    }
    const calenderMonthMove = () => {
      if(Number(state.selMonth) > 0 && Number(state.selMonth) < 13){
        router.push('/mainPage/homecalender/'+state.selYear+'/'+state.selMonth);
      }else{
        state.selMonth = state.oriMonth;
      }
    }

    //포커스가 떠났을때 input값 검사 // router 시키지는 않음
    const calenderYearCheck = () => {
      if(!(Number(state.selYear) >= minYear && Number(state.selYear) <= maxYear)){
        state.selYear = state.oriYear;
      }
    }
    const calenderMonthCheck = () => {
      if(!(Number(state.selMonth) > 0 && Number(state.selMonth) < 13)){
        state.selMonth = state.oriMonth;
      }
    }

    //화살표 클릭으로 캘린더 이동한 경우
    const calenderPreviousMonth = () => {
      if(state.selMonth > 1){
        router.push('/mainPage/homecalender/'+state.selYear+'/'+(Number(state.selMonth)-1));
      }else{
        if(Number(state.selYear) > minYear){
          router.push('/mainPage/homecalender/'+(Number(state.selYear)-1)+'/12');
        }else{
          alert("더 이상 이전으로 갈 수 없습니다.")
        }
      }
    }
    const calenderNextMonth = () => {
      if(state.selMonth < 12){
        router.push('/mainPage/homecalender/'+state.selYear+'/'+(Number(state.selMonth)+1));
      }else{
        if(Number(state.selYear) < maxYear){
          router.push('/mainPage/homecalender/'+(Number(state.selYear)+1)+'/1');
        }else{
          alert("더 이상 다음으로 갈 수 없습니다.");
        }
      }
    }

    onMounted(() => {
      const {
        params : {year},
        params : {month}
      } = useRoute()


      if(year == undefined || year == "" || isNaN(year) || Number(year) < minYear || Number(year) > maxYear){
        state.selYear = new Date().getFullYear();
      }else{
        state.selYear = year;
      }
      state.oriYear = state.selYear;

      if(month == undefined || month == "" || isNaN(month) || Number(month) <= 0 || Number(month) >= 13){
        state.selMonth = new Date().getMonth()+1;
      }else{
        state.selMonth = month;
      }
      state.oriMonth = state.selMonth;


      state.lastDate = new Date(state.selYear, state.selMonth, 0).getDate();
      state.startDatePosition = new Date(state.selYear ,state.selMonth-1).getDay();


      //today
      let today = new Date();
      let todayYear = today.getFullYear();
      let todayMonth = today.getMonth()+1;
      let todayDay = today.getDate();
      //한자리일 경우 한개 붙여줌
      if(todayDay+"".length < 2){
        todayDay = "0"+todayDay;
      }
      let getToday = todayYear+""+todayMonth+""+todayDay;


      state.calenderData = new Array();
      for(let i = 0; i < state.lastDate ; i++){
        let dateData = {};
        dateData.days = i+1;

        //주말 체크
        let temporaryDays = new Date(state.selYear,state.selMonth-1,i+1).getDay();
        if(temporaryDays==0 || temporaryDays==6){
          dateData.isWeekend = true;
        }else{
          dateData.isWeekend = false;
        }


        //today 체크
        temporaryDays = new Date(state.selYear,state.selMonth-1,i+1);
        let temporaryYear = temporaryDays.getFullYear();
        let temporaryMonth = temporaryDays.getMonth()+1;
        let temporaryDay = temporaryDays.getDate();

        //한자리일 경우 한개 붙여줌
        if(temporaryDay+"".length < 2){
          temporaryDay = "0"+temporaryDay;
        }

        let getTemporaryToday = temporaryYear+""+temporaryMonth+""+temporaryDay;

        if(getTemporaryToday==getToday){
          dateData.isToday = true;
        }else{
          dateData.isToday = false;
        }


        state.calenderData[i] = dateData;
      }


    })


    return{
      test,
      calenderYearCheck,
      calenderMonthCheck,
      calenderTodayMove,
      calenderYearMove,
      calenderMonthMove,
      calenderPreviousMonth,
      calenderNextMonth,
      state
    }


  }
}
</script>
<style lang="scss" scoped>

  @import "@/styles/_mixins.scss";
  @import "@/styles/_variables.scss";

  //input type number안에 화살표 제거
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

    #introMainArea{
      width: calc(100%);
      margin-bottom: 20px;
    }

    #titleArea{
      min-width: 350px;
      .pointLine{
        @include length(80px, 5px);
        background: #000;
        margin: 0 auto;
        margin-bottom: 10px;
      }
      .pageTitle{
        font-size: 19px;
        margin: 0 auto;
        padding-top: 20px;
        padding-bottom: 5px;
        text-align: center;
      }
    }

    #introCalenderMove{
      min-width: 350px;
      max-width: 900px;
      margin: 0 auto;
      @include length(100%, 50px);
      overflow: hidden;
      position: relative;
      >*{
        cursor: pointer;
      }
      >img:nth-child(1){
        @include length(22px, 22px);
        float: left;
        margin: 13.5px;
      }
      >div{
        width: 140px;
        text-align: center;
        position: absolute;
        left: 50%;
        margin-top: 10px;
        margin-left:-70px;
        >h6{
          float: left;
          margin-top: 7px;
          font-size: 19px;
        }
        >#choiceYear{
          float: left;
          @include length(45px, 30px);
          border: none;
          border-bottom: 1px solid #999;
          font-size: 20px;
          font-weight: bold;
          text-align-last:right;
          margin-right : 5px;
          //화살표 제거
          background: none;
          padding-right: 0px;
        }
        >#choiceMonth{
          @extend #choiceYear;
          width: 30px;
          margin-left: 10px;
        }
      }
      >img:nth-child(3){
        @include length(22px, 22px);
        float: right;
        margin: 13.5px;
      }
    }

    #introMainContent{

      min-width: 350px;
      max-width: 900px;
      margin: 0 auto;

      width: 100%;
      margin: 0px auto;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-bottom: 3px;
      z-index: 0;
      >#daysTitle{
        height: 40px;
        width: 14.2%;
        box-shadow: $table-border-1px;
        text-align: center;
        line-height: 40px;
        background: #00000033;
      }
      >#daysContent{
        position: relative;
        height: 0px;
        overflow: hidden;
        padding-bottom: 20.26%;

        width: 14.2%;
        box-shadow: $table-border-1px;
        text-align: center;
        line-height: 50px;
        >div{
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          font-size: 15px;
          h4{
            cursor: default;
          }
          h6{
            cursor: pointer;
          }
          >.weekend{
            position: relative;
            height: 100%;
            background: #00000011;
            >h4{
              color: red;
              line-height: 45px;
            }
          }
          >.weekdays{
            position: relative;
            height: 100%;
            >h4{
              line-height: 45px;
            }
          }
          >.today{
            position: relative;
            height: 100%;
            background: #ffff0033;
            >h4{
              line-height: 45px;
              color: #008800;
            }
          }
        }
      }
    }

    .pcPart{
      display: block;
      line-height: 20px;
      font-size: 12.5px;
    }
    .mobilePart{
      display: none;
    }


    //content안에 글자 크기 변경
    @media ( max-width: 800px ) {
      #introMainContent{
        >#daysContent{
          >div{
            >.weekend{
              >h4{
                line-height: 35px;
              }
            }
            >.weekdays{
              >h4{
                line-height: 35px;
              }
            }
            >.today{
              >h4{
                line-height: 35px;
              }
            }
          }
        }
      }

      .pcPart{
        font-size: 11.5px;
        line-height: 18px;
      }
    }

    // 캘린더 안에 content 가 모바일 버전으로 변경
    @media ( max-width: 600px ) {
      .pcPart{
        display: none;
      }

      .mobilePart{
        display: block;
        padding: 0px;
        margin: 0 auto;
        margin-top: calc(40% - 18px);
        width: 40%;
        height: 27%;
        @include border-radius(100px);
        line-height: 0px;
        vertical-align: middle;
        border: 1px solid #000;
        background: #ddd;
        >h6{
            text-align : center;
            vertical-align: middle;
            margin: 0px;
            padding: 0px;
            font-size: 3vw;
            line-height: 200%;
        }
      }



    }

</style>
