//import { start } from "repl";
//const dayjs = require('dayjs')
import dayjs from 'dayjs' // ES 2015
import 'dayjs/locale/tr' // load on demand

(function () {
  'use strict';
  const START_YEAR = new Date().getFullYear();
  const START_MONTH = 1;

  console.log('Weekly Calendar');
 
  async function Init() {
    //console.log('Init');

    document.getElementById('page-title').innerText = START_YEAR.toString() + ' Weekly Calendar';
    const lstWeek = [];
    let startDate = new Date(START_YEAR, START_MONTH, 1);
let week = [];
    while (startDate.getFullYear() === START_YEAR) {
      //console.log(startDate);

      startDate = dayjs(startDate).add(1, 'day').toDate();

      const _dayOfWeek = dayjs(startDate).day();
      if(_dayOfWeek > 0 && _dayOfWeek < 6){
        if(_dayOfWeek == 1){
          week = [];
          week.push(startDate);
        }
        else{
          week.push(startDate);
        }
        if(_dayOfWeek == 5){
          lstWeek.push(week);
        }
      }
      //console.log(startDate, _dayOfWeek);
      //startDate = addDays(this.startDate, 1);
      //startDate.setDate(newDate.getDate());
    }
    //console.log(lstWeek);

    let html = '';
    let htmlPage = '';
    for (let i = 0; i < lstWeek.length; i++) {
      const e = lstWeek[i];
      html = '';
      if(i % 2 == 0){
        html += `<page size="A4" layout="landscape">`
      }
      html += `<div class="week">
<h1>${dayjs(e[0]).locale('tr-tr').format('D MMMM') + '-'+ dayjs(e[4]).locale('tr-tr').format('D MMMM YYYY')}</h1>
<div class="table">`
      for (let ii = 0; ii < lstWeek[i].length; ii++) {
       const ee:Date= lstWeek[i][ii];
       html += `<div class="day">
            <div class="title-date"><span>${dayjs(ee).format('dddd')}</span><span>${dayjs(ee).format('D')}</span></div> 
            <div class="content"></div>
          </div>`
      }
      html += `</div>
      </div>
    `
      if(i % 2 == 1){
        html += `</page>`
      }
      htmlPage += html;
    }
    document.getElementById('main').innerHTML = htmlPage;

  }

  Init();
})();
