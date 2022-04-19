<template>
    <section>
        <div id="introMainArea">
            <div id="titleArea">
                <h6 class="pageTitle">Calendar</h6>
                <div class="pointLine"></div>
            </div>

            <div id="introMaincontent">
                <div id="introCalendarMove">
                    <img src="http://www.haro.kr/staticImage/image/useful/leftArrow.png" @click="calendarPreviousMonth()">
                    <div>
                        <input @keyup.enter="calendarYearMove()" @blur="calendarYearCheck()" type="number" id="choiceYear" v-model="state.selYear">
                        <h6>년</h6>
                        <input @keyup.enter="calendarMonthMove()" @blur="calendarMonthCheck()" type="number" id="choiceMonth" v-model="state.selMonth">
                        <h6>월</h6>
                    </div>
                    <img src="http://www.haro.kr/staticImage/image/useful/rightArrow.png" @click="calendarNextMonth()">
                </div>

                <div id="daysTitle" v-for="(item, i) in state.days" :key="`A-${i}`">
                    <h6 v-if="item=='토' || item=='일'" style="color:red">{{ item }}</h6>
                    <h6 v-else>{{ item }}</h6>
                </div>

                <div id="daysContent" v-for="n in state.startDatePosition" :key="n"></div>
            
                <div id="daysContent" v-for="(calendarData, i) in state.calendarData" :key="`B-${i}`" @click="test(calendarData.days)">
                    <div>
                        <div v-if="calendarData.isWeekend == true && calendarData.isToday == false" class="weekend">
                            <h4>{{ calendarData.days }}</h4>
                        </div>
                        <div v-if="calendarData.isWeekend == false && calendarData.isToday == false" class="weekdays">
                            <h4>{{ calndarData.days }}</h4>
                        </div>
                        <div v-if="calendarData.isToday == true" class="today">
                            <h4>{{ calendarData.days }}{오늘)</h4>
                            <div class="mobilePart"><h6>1</h6></div>
                            <h6 class="pcPart">최고기온 : 40</h6>
                            <h6 class="pcPart">최저기온 : 20</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    setup() {
        const state = reactive ({
            year : ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
            days : ['일', '월', '화', '수', '목', '금', '토'],
            selYear : '', // 현재 입력된 값
            oriYear : '', // 처음 페이지 로딩시 값
            selMonth : '', // 현재 입력된 값
            oriMonth : '', // 처음 페이지 로딩시 값
            lastDate : '',
            startDatePosition : '',
            calendarData : ''
        })

        // 캘린더에서 움직일 수 있는 날짜
        const minYear = 2000;
        const maxYear = 2030;
    }
}

</script>