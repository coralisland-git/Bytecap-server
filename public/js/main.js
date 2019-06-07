$(document).ready(function() {





//Activate select styler
$('select').styler();





$(".calculator-popup-1-item span").click(function() {
    $(this).parent().toggleClass("calculator-popup-1-item-active");
});



$(".calculator-checkbox").click(function() {
    if($(this).attr("checked") != 'checked') { 
        $(this).parent().parent().toggleClass('calculator-checkbox-active').find('input[type="text"]').prop('disabled', function(i, v) { return !v; });
    }else{
        $(this).parent().parent().toggleClass('calculator-checkbox-active').find('input[type="text"]').prop('disabled', function(i, v) { return !v; });
    }
});






//Calculator selected form
// Dropdown

$(".tag-area").on('touchend click', function() {
    $(".calc-selected-dropdown").toggleClass("open");
});

// Add Tags
$(".calc-selected-dropdown").on("click", ".dropdown-menu > li", function() {
    if ( !$(this).hasClass("added") ) {
        $(this).addClass("added");
        $(".tag-area").append('<div class="tag">' + $(this).text() + '<span></span></div>');
    }
});
// Remove Tags
$(".calc-selected").on("click", ".tag > span", function() {
    $(this).parent().remove();
    var objectText = $(this).parent().text().slice(0,-1);
    $(".dropdown-menu > li:contains('" + objectText + "')").removeClass("added");
});

$('.tag > span').on('touchend click', function() {
    if ( $(".calc-selected-dropdown").hasClass("open") ) {
        $(".calc-selected-dropdown").removeClass("open");
    }
});









/* popup window calculator */
$("a#mining-calculator").on('touchend click', function(){
    $('#fade').fadeIn(300);
    $('.calculator-popup').addClass('calculator-popup-open');
    $('i.calculator-popup-close, #fade').click(function(){
        $('#fade').fadeOut(300);
        $('.calculator-popup').removeClass('calculator-popup-open');
        return false;
    });
    return false;
});
    
    
    
    
/* popup window coinpage */
$(".currencies-popup0").on('touchend click', function(){
    $('#fade').fadeIn(300);
    $('.coinpage-popup').addClass('coinpage-popup-open');
    $('.coinpage-popup em, #fade').click(function(){
        $('#fade').fadeOut(300);
        $('.coinpage-popup').removeClass('coinpage-popup-open');
        return false;
    });
    return false;
});

    
    
    
    
/* popup header nav */
$("i.header-nav-burger").click(function(){
    $('ul.header-nav').addClass('header-nav-open');
    $('ul.header-nav i').click(function(){
        $('ul.header-nav').removeClass('header-nav-open');
        return false;
    });
    return false;
});
    
    
    

/* popup header search */
$(".header-search-btn").click(function(){
    $('.header-search').addClass('header-search-open');
    $('.header-search input').focus();
    $('.header-search i').click(function(){
        $('.header-search').removeClass('header-search-open');
        return false;
    });
    return false;
});
    
    
    
    
    
    
    
    
$('ul.coinpage-tabs').delegate('li:not(.current)', 'click', function() {
    $(this).addClass('current').siblings().removeClass('current').parents('div.section').find('div.box').hide().eq($(this).index()).fadeIn(300);
});


    
    
    
    
/* data calendar */
$(".data-calendar").click(function(e){
    $('.data-calendar span').toggleClass('data-calendar-open');
    return false;
});
$('.data-calendar span').on('touchend click', function(e) {
    e.stopPropagation();
});
$(document).on('touchend click', function(e) {
    $('.data-calendar span').removeClass('data-calendar-open');
});







// For the responsive
$(function() {
    doSomethingUseful();
    $(window).resize(doSomethingUseful);
});
function doSomethingUseful() {
    
    if(document.body.clientWidth < 1300)
    {
        $(init);
        function init() {
            $('a.logo').after($('.header-info-select2'));
            $('ul.header-nav').append($('.header-info-select1'));
        }
    }
    else
    {
        $(init);
        function init() {
            $('.header-info').append($('.header-info-select2'));
            $('.header-info-center').after($('.header-info-select1'));
        }
    }
    
    if(document.body.clientWidth < 970)
    {
        $(init);
        function init() {
            $('.coinpage-title h1').append($('.coinpage-info2-links span'));
        }
    }
    else
    {
        $(init);
        function init() {
            $('.coinpage-info2-links').prepend($('.coinpage-title h1 span'));
        }
    }
    
    if(document.body.clientWidth < 870)
    {
        $(init);
        function init() {
            $('ul.header-nav').append($('.sign-up'));
        }
    }
    else
    {
        $(init);
        function init() {
            $('.sign-in').after($('.sign-up'));
        }
    }
}





















});