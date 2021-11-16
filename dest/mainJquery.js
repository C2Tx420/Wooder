let mobileBtn = $('.mobile-btn')
let mobileNav = $('.mobile__nav')
let header = $('header')
let windowWidth = window.width

let slider = $('.slider')
let sliderHeight = slider.outerHeight();

let backToTopBtn = $('.footer .footer__right .footer__right-text')

let langBtn = $('.lang__current')
let langcurText = $('.lang__current-text')
let langOpt = $('.lang__option')
let langOptItem = $('.lang__option a')

let videoList = $('.video__item')
let videoPopup = $('.modal')
let iframe = $('iframe')

let navItems = $('.header__nav-list li a')
let mobileNavItem = $('.mobile__nav-list li a')
let secs = []

let bHeight
let scrollHeight

function getbHeight(){
    bHeight = document.querySelector('body').offsetHeight - window.innerHeight
}

// Open nav

mobileBtn.on('click', function(){
    mobileBtn.toggleClass('--active')
    mobileNav.toggleClass('--open')
})

// resize

function hideNav(){
    mobileBtn.removeClass('--active')
    mobileNav.removeClass('--open')
}

$(window).resize(function(){
    if(window.innerWidth > 992){
        hideNav()
    }
    getbHeight()
})

// Back to top

backToTopBtn.on('click',function(){
    $('html, body').scrollTop(0,0)
})

// lang

langBtn.on('click',function(e){
    e.stopPropagation()
    langOpt.toggleClass('--active')
})

langOptItem.on('click',function(){
    let tempLang = $(this).text()
    $(this).text(langcurText.text())
    langcurText.text(tempLang)
    langOpt.removeClass('--active')
})
$(document).on('click',function(){
    langOpt.removeClass('--active')
})

// Video Popup
videoList.on('click',function(){
    let videoUrl = $(this).attr('data-src')
    iframe.attr('src',`https://www.youtube.com/embed/${videoUrl}?autoplay=1&enablejsapi=1&mute=1`)
    videoPopup.addClass('--active')
})

videoPopup.on('click',function(){
    iframe.attr('src','')
    videoPopup.removeClass('--active')
})

// click and go

navItems.on('click',function(e){
    e.preventDefault()
    let sec = $(`.${$(this).attr('href').replace('#','')}`)
    navItems.removeClass('--active')
    $(this).addClass('--active')
    $('html, body').animate({scrollTop: sec.offset().top},0)
})

mobileNavItem.on('click',function(e){
    e.preventDefault()
    mobileNav.removeClass('--open')
    mobileBtn.removeClass('--active')
    let mobileSec = $(`.${$(this).attr('href').replace('#','')}`)
    setTimeout(function(){
        $('html, body').animate({scrollTop: mobileSec.offset().top},0)
    }, 1000)
    
})

// scrollbar
function getbHeight(){
    bHeight = $('body').outerHeight() - window.innerHeight
}

function updateScrollBar(){
    let scrollbar = $('.scrollbar')
    getbHeight()
    let percent = scrollHeight / bHeight * 100
    scrollbar.css('width', `${percent}%`)
}
$.each(Array.from(navItems),function(i,item){
    
    secs.push($(`.${item.getAttribute('href').replace('#','')}`)[0])
})
$(document).on('scroll',function(){
    scrollHeight = window.pageYOffset
    if(scrollHeight > (sliderHeight - header.innerHeight())){
        header.addClass('--active')
    }else{
        header.removeClass('--active')
    }
    $.each(secs,function(index,item){
        if(scrollHeight > item.offsetTop - header.innerHeight() && scrollHeight < item.offsetTop + item.offsetHeight){
            $(navItems).removeClass('--active')
            $(navItems[index]).addClass('--active')
        }else{
            $(navItems[index]).removeClass('--active')
        }
    })
    
    updateScrollBar()
})


// accordion
let accordionItem = $('.accordion__item')
let accordionItemText = $('.accordion__item-text')
let accordionTog = false

    accordionItem.on('click',function(){
        if(accordionTog){
            $(this).next().toggleClass('--active')
        }else{
            if($(this).next().hasClass('--active')){                
                accordionItemText.removeClass('--active')
            }else{
                accordionItemText.removeClass('--active')
                $(this).next().addClass('--active')
            }
        }
})

// news tab

let newsList = $('.news__list')
let newsTagItem = $('.taglist .tag__item')
let curNews = 1

function removeClassItem(item){
    item.removeClass('--active')
}


    newsTagItem.on('click',function(e){
        removeClassItem(newsList)
        removeClassItem(newsTagItem)
        e.preventDefault()
        if(curNews === 1){
            newsList.last().addClass('--active')
            curNews = 2
        }else{
            newsList.first().addClass('--active')
            curNews = 1
        }
        $(this).addClass('--active')
})

// slider
let sliderList = $('.slider__item')

let curIndex = 0

let nextBtn = $('.slider__bottom .slider__bottom-right a:nth-child(2)')
let prevBtn = $('.slider__bottom .slider__bottom-right a:nth-child(1)')

let number = $('.slider__bottom .slider__bottom-paging .number')
let dotted = $('.slider__bottom .slider__bottom-paging .dotted__item')

function numchange(){
    $(number).html((curIndex + 1).toString().padStart(2,'0'))
}

function sliderSlide(item, index){
    $(item[curIndex]).removeClass('--active')
    $(item[index]).addClass('--active')
}

dotted.on('click',function(){
    sliderSlide(sliderList, $(this).index())
    sliderSlide(dotted, $(this).index())
    curIndex = $(this).index()
    numchange()
})

$.each(sliderList,function(i,item){
    if(item.classList.contains('--active')){
        curIndex = i
        numchange()
        $(dotted[curIndex]).addClass('--active')
    }
})
nextBtn.on('click',function(e){
    e.preventDefault()
    if(curIndex < 2){
        sliderSlide(sliderList, curIndex + 1)
        sliderSlide(dotted, curIndex + 1)
        curIndex++
        numchange()
        
    }else{
        sliderSlide(sliderList, 0)
        sliderSlide(dotted, 0)
        curIndex = 0
        numchange()
    }
})

prevBtn.on('click',function(e){
    e.preventDefault()
    if(curIndex > 0){
        sliderSlide(sliderList, curIndex - 1)
        sliderSlide(dotted, curIndex - 1)
        curIndex--
        numchange()
    }else{
        sliderSlide(sliderList, 2)
        sliderSlide(dotted, 2)
        curIndex = 2
        numchange()
    }
})

function showSLide(){
    if(curIndex < 2){
        sliderSlide(sliderList, curIndex + 1)
        sliderSlide(dotted, curIndex + 1)
        curIndex++
        numchange()
    }else{
        sliderSlide(sliderList, 0)
        sliderSlide(dotted, 0)
        curIndex = 0
        numchange()
    }
}
setInterval(showSLide,4000)