
// console.log("Hello Starbucks")
const searchEl = document.querySelector('.search')
const searchInputEl = document.querySelector('input')

searchEl.addEventListener('click', function () {
  searchInputEl.focus()
})

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused')
  searchInputEl.setAttribute('placeholder', '통합검색')
})

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused')
  searchInputEl.setAttribute('placeholder', '')
})


// 화면 스크롤이 일정길이 이상 길어지면 Badge가 Scroll되도록 :GSAP 애니메이션 효과 사용
const badegEl = document.querySelector("header .badges")
const toTopEl = document.querySelector("#to-top")
/* 외부에서 가져오는 함수의 양이 너무 많음 --> 속도에 치명적
window.addEventListener('scroll', function(){
  console.log
})
*/
//외부에서 가져오는 함수량을 제어 ==> lodash 사용
//_.throttle(func, [wait=0], [options={}]) : 스크롤 작업시 함수가 많이 실행될 때 3초 간격으로 실행되도록
window.addEventListener('scroll', _.throttle(function(){
  // console.log(scrollY)
  if(scrollY>500){
    //배지숨기기
    // gsap.to(요소명, 지속시간(초), 옵션)
    gsap.to(badegEl, .6, {      
      opacity: 0,
      display: 'none'
    })  
    //Home버튼 보여지기
    gsap.to(toTopEl, .2, {      
      x:0
    })  
  }
  else{
    //배지보여주기
    // gsap.to(요소명, 지속시간(초), 옵션)
    gsap.to(badegEl, .6, {      
      opacity: 1,
      display: 'block'
    })  
    //Home버튼 숨기기
    gsap.to(toTopEl, .2, {      
      x:100
    })
  }
}, 300)) //300:300밀리세컨드

toTopEl.addEventListener('click', ()=>{
  // gsap.to(요소명, 지속시간(초), 옵션)
  gsap.to(window, .7, {
    scrollTo: 0
  });
})


//GSAP & ScrollToPlugin 사용 
// 커피이미지가 시간차를 두고 화면에 순차적으로 표현되도록 에니메이션 효과를 주도록
const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소명, 지속시간(초), 옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //지연시간 0.7 1.4 2.1 2.7
    opacity: 1
  })
})

// 슬라이더 요소관리
// 공지사항 슬라이더 -->Swiper Slide 사용
// ==> 사용법 : new  Swiper(요소, 옵션)
new Swiper('.notice-line .swiper-container', {
  // Optional parameters
  direction: 'vertical', //수직배열
  autoplay: true,
  loop: true
});
// promotion 슬라이더 작업 --> Swiper Slide 사용
//=> 사용법 : new  Swiper(요소, 옵션)
new Swiper('.promotion .swiper-container', {
  // Optional parameters 
  // direction: 'horizental',  //수평배열
  autoplay: {
    delay: 5000 //5초마다 슬라이더가 바뀌도록
  },
  loop: true, //반복재생
  slidesPerView: 3, //한번에 보여질 슬라이더 수
  spaceBetween: 10, //슬라이더 사이 여백
  centeredSlides: true, //1번 슬라이더가 가운데 배치
  // If we need pagination
  pagination: { //페이지 사용여부
    el: '.promotion .swiper-pagination', //페이지번호 요소지정
    clickable: true //제어가능여부
  },

  // Navigation arrows
  navigation: { //슬라이더 이전/이후 버튼 사용여부
    prevEl: '.promotion .swiper-prev', //이전버튼 요소지정
    nextEl: '.promotion .swiper-next' //이후버튼 요소지정
  }
});

// toggle-promotion 선택처리
const promotionEl = document.querySelector(".promotion")
const promotionToggleBtn = document.querySelector(".toggle-promotion")
let isHidePromotion = false
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    //숨김처리
    promotionEl.classList.add('hide')
  } else {
    //보임처리
    promotionEl.classList.remove('hide')
  }
})


function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소명, 지속시간(초), 옵션)
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay)
  });
}

floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1, 15)


// ScrollMagic
// https://cdnjs.com/libraries/ScrollMagic
// https://github.com/janpaepke/ScrollMagic

// const spyEls = document.querySelectorAll("section.scroll-spy")
// spyEls.forEach(function (spyEl) {
//   new ScrollMagic.Scene({ // 감시하게될 장면을 추가
//       triggerElement: spyEl, // 감시할 요소
//       triggerHook: .8 // 화면의 80%지점에서 보여짐 여부 감시
//     })
//     .setClassToggle(spyEl,'show') // 요소가 화면에 보이면 show class 추가
//     .addTo(new ScrollMagic.controller()); // 컨트롤러 장면 할당
// })
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
  .Scene({                      //감시할 장면(Scene)을 추가
    triggerElement: spyEl,      //감시할 요소 지정
    triggerHook: .8             //화면의 80% 지점에서 보여짐 여부 감시
  })
  .setClassToggle(spyEl, 'show')            // 요소가 화면에 보이면 show 클래스 추가
  .addTo(new ScrollMagic.Controller());                     // 컨트롤러에 장면을 할당(필수!)
});

// const toTopEl = document.querySelector('#to-top')
// toTopEl.addEventListener('click', ()=>{
//   gsap.to(window, .7, {
//     scrollTo:0
//   }) ;
// })

new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드 : 기본값
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

// 당해년도 가져오기
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
