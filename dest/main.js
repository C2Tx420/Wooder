
window.addEventListener("load", function() { 
    let mobileBtn = document.querySelector('.mobile-btn')
    let mobileNav = document.querySelector('.mobile__nav')
    let header = document.querySelector('header')
    let windowWidth = window.innerWidth
    
    let slider = document.querySelector('.slider')
    let sliderHeight = slider.clientHeight;
    
    let backToTopBtn = document.querySelector('.footer .footer__right .footer__right-text')
    
    let langBtn = document.querySelector('.lang__current')
    let langcurText = document.querySelector('.lang__current-text')
    let langOpt = document.querySelector('.lang__option')
    let langOptItem = document.querySelectorAll('.lang__option a')
    
    let videoList = document.querySelectorAll('.video__item')
    let videoPopup = document.querySelector('.modal')
    let iframe = videoPopup.querySelector('iframe')
    
    let navItems = document.querySelectorAll('.header__nav-list li a')
    let mobileNavItem = document.querySelectorAll('.mobile__nav-list li a')
    let secs = []
    
    let bHeight
    let scrollHeight
    // Open nav
    
    mobileBtn.addEventListener('click', function(){
        mobileBtn.classList.toggle('--active')
        mobileNav.classList.toggle('--open')
    })
    
    
    // resize
    
    function hideNav(){
        mobileBtn.classList.remove('--active')
        mobileNav.classList.remove('--open')
    }
    
    window.addEventListener('resize',function(){
        if(windowWidth > 992){
            hideNav()
        }
        getbHeight()
    })
    
    // Back to top
    
    backToTopBtn.addEventListener('click',function(){
        window.scrollTo(0,0)
    })
    
    // lang
    
    langBtn.addEventListener('click',function(e){
        e.stopPropagation()
        langOpt.classList.toggle('--active')
    })
    
    langOptItem.forEach(function(item){
        item.addEventListener('click',function(){
            let tempLang = this.innerText
            this.innerText = langcurText.innerText
            langcurText.innerText = tempLang
    
            langOpt.classList.remove('--active')
        })
    })
    
    document.addEventListener('click',function(){
        langOpt.classList.remove('--active')
    })
    
    // Video Popup
    
    videoList.forEach(function(item){
        let videoUrl = item.getAttribute('data-src')
        item.addEventListener('click',function(){
            iframe.setAttribute('src',`https://www.youtube.com/embed/${videoUrl}?autoplay=1&enablejsapi=1&mute=1`)
            videoPopup.classList.add('--active')
    
        })
    })
    
    videoPopup.addEventListener('click',function(){
        iframe.setAttribute('src','')
        videoPopup.classList.remove('--active')
    
    })
    
    // Click and go
    
    function removeActive(item){
        navItems.forEach(function(item){
            item.classList.remove('--active')
    })
    }
    
    
    navItems.forEach(function(item){
        let sec = document.querySelector(`.${item.getAttribute('href').replace('#','')}`)
        secs.push(sec)
        item.addEventListener('click',function(e){
            e.preventDefault()
            removeActive()
            item.classList.add('--active')
            window.scrollTo(0,sec.offsetTop - header.offsetHeight + 20) 
            // để header height sẽ bị thừa 1 khoảng do active header nhỏ lại
        })
    })
    
    mobileNavItem.forEach(function(item){
        item.addEventListener('click',function(e){
            e.preventDefault()
            mobileNav.classList.remove('--open')
            mobileBtn.classList.remove('--active')
            setTimeout(function(){
                window.scrollTo(0,document.querySelector(`.${item.getAttribute('href').replace('#','')}`).offsetTop - header.offsetHeight + 20) 
                // để header height sẽ bị thừa 1 khoảng do active header nhỏ lại
            },300)
        })
    })
    
    // // Slider
    
    // let sliderList = document.querySelectorAll('.slider__item')
    
    // let curIndex = 0
    
    // let nextBtn = document.querySelector('.slider__bottom .slider__bottom-right a:nth-child(2)')
    // let prevBtn = document.querySelector('.slider__bottom .slider__bottom-right a:nth-child(1)')
    
    // let number = document.querySelector('.slider__bottom .slider__bottom-paging .number')
    // let dotted = document.querySelectorAll('.slider__bottom .slider__bottom-paging .dotted__item')
    
    // function numchange(){
    //     number.innerHTML = (curIndex + 1).toString().padStart(2,'0')
    // }
    
    // function sliderSlide(item, index){
    //     item[curIndex].classList.remove('--active')
    //     item[index].classList.add('--active')
    // }
    
    // dotted.forEach(function(item,index){
    //     item.addEventListener('click',function(){
    //             sliderSlide(sliderList, index)
    //             sliderSlide(dotted, index)
    //             curIndex = index
    //             numchange()
    //     })
    // })
    
    // sliderList.forEach(function(item,i){
    //     if(item.classList.contains('--active')){
    //         curIndex = i
    //         numchange()
    //         dotted[curIndex].classList.add('--active')
    //     }
    // })
    // nextBtn.addEventListener('click',function(e){
    //     e.preventDefault()
    //     if(curIndex < 2){
    //         sliderSlide(sliderList, curIndex + 1)
    //         sliderSlide(dotted, curIndex + 1)
    //         curIndex++
    //         numchange()
            
    //     }else{
    //         sliderSlide(sliderList, 0)
    //         sliderSlide(dotted, 0)
    //         curIndex = 0
    //         numchange()
    //     }
    // })
    
    // prevBtn.addEventListener('click',function(e){
    //     e.preventDefault()
    //     if(curIndex > 0){
    //         sliderSlide(sliderList, curIndex - 1)
    //         sliderSlide(dotted, curIndex - 1)
    //         curIndex--
    //         numchange()
    //     }else{
    //         sliderSlide(sliderList, 2)
    //         sliderSlide(dotted, 2)
    //         curIndex = 2
    //         numchange()
    //     }
    // })
    
    // function showSLide(){
    //     if(curIndex < 2){
    //         sliderSlide(sliderList, curIndex + 1)
    //         sliderSlide(dotted, curIndex + 1)
    //         curIndex++
    //         numchange()
    //     }else{
    //         sliderSlide(sliderList, 0)
    //         sliderSlide(dotted, 0)
    //         curIndex = 0
    //         numchange()
    //     }
    // }
    // setInterval(showSLide,4000)
    
    // news tab
    
    let newsList = document.querySelectorAll('.news__list')
    let newsTagItem = document.querySelectorAll('.taglist .tag__item')
    
    function removeClassItem(item){
        item.forEach(function(item){
            item.classList.remove('--active')
        })
    }
    
    newsTagItem.forEach(function(item,index){
        item.addEventListener('click',function(e){
            removeClassItem(newsList)
            removeClassItem(newsTagItem)
            e.preventDefault()
            newsList[index].classList.add('--active')
            this.classList.add('--active')
        })
    })
    
    // accordion
    let accordionItem = document.querySelectorAll('.accordion__item')
    let accordionItemText = document.querySelectorAll('.accordion__item-text')
    let accordionTog = true
    
    accordionItem.forEach(function(item,index){
        item.addEventListener('click',function(){
            if(accordionTog === true){
                accordionItemText[index].classList.toggle('--active')
            }else{
                if(accordionItemText[index].classList.contains('--active')){
                    accordionItemText.forEach(function(item){
                        console.log(item)
                        item.classList.remove('--active')
                    })
                }else{
                    accordionItemText.forEach(function(item){
                        console.log(item)
                        item.classList.remove('--active')
                    })
                    accordionItemText[index].classList.add('--active')
                }
            }
        })
    })
    
    // scrollbar
    function getbHeight(){
        bHeight = document.querySelector('body').offsetHeight - window.innerHeight
    }
    
    function updateScrollBar(){
        let scrollbar = document.querySelector('.scrollbar')
        getbHeight()
        let percent = scrollHeight / bHeight * 100
        scrollbar.style.width = percent + '%'
    }
    
    document.addEventListener('scroll',function(){
        scrollHeight = window.pageYOffset
        if(scrollHeight > (sliderHeight - header.clientHeight)){
            header.classList.add('--active')
        }else{
            header.classList.remove('--active')
        }
    
        secs.forEach(function(item,i){
                if(scrollHeight > item.offsetTop - header.offsetHeight && scrollHeight < item.offsetTop + item.offsetHeight){
                    removeActive()
                    navItems[i].classList.add('--active')
                }else{
                    navItems[i].classList.remove('--active')
                }
            })
    
        updateScrollBar()
    })
    
    // Photoswipe
    
    var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for(var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                if(figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if(figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML; 
                }
                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                } 
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if(!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) { 
                    continue; 
                }
                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};
            if(hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }
            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 
    
                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },
                showAnimationDuration : 0,
                hideAnimationDuration : 0
            };
            if(fromURL) {
                if(options.galleryPIDs) {
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if( isNaN(options.index) ) {
                return;
            }
            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    }
    initPhotoSwipeFromDOM('.gallery__list');
    
    
    var sliderDrag = document.querySelector('.sliderdrag');
    var flktyDrag = new Flickity( sliderDrag, {
      // options
    cellAlign: 'left',
    contain: true,
    freeScroll: true,
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    groupCells: true
    });
    flktyDrag.on( 'scroll', function( progress ) {
        progress = Math.max( 0, Math.min( 1, progress ) )
        document.querySelector('.timeline').style.width = progress * 100 + '%'
    })
    
    let nextBtn = document.querySelector('.slider__bottom .slider__bottom-right a:nth-child(2)')
    let prevBtn = document.querySelector('.slider__bottom .slider__bottom-right a:nth-child(1)')
    let number = document.querySelector('.slider__bottom .slider__bottom-paging .number')
    let dotted = document.querySelector('.slider__bottom .slider__bottom-paging .dotted')
    var flkty = new Flickity( document.querySelector('.slider-wrap'), {
        // options
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        // pageDots: false,

        on: {
            ready: function() {
              let dottedDefault = document.querySelectorAll('.flickity-page-dots .dot')
              dottedDefault.forEach(function(item){
                  dotted.appendChild(item)
              })
            }},
      });
      flkty.on( 'change', function( index ) {
        number.innerHTML = (index + 1).toString().padStart(2,'0')
        flkty.playPlayer()
      })

      flkty.playPlayer()

      nextBtn.addEventListener('click', function(){
        flkty.next();
      })

      prevBtn.addEventListener('click', function(){
        flkty.previous();
      })
});