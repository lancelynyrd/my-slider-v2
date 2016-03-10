$(function() {

    var attr = {
        intervalPageChange : 2000,
        speedPageChange : 1000,
        direction : 'right-to-left',
        active : 0,
        zIndex : 100,
        mouseIn : false
    };
    var el = {
        slider : function() {
            return $('#my-slider');
        },
        dotPager : function() {
            return $('#pager');
        },
        dotLi : function() {
            return el.dotPager().find('span');
        },
        li : function() {
            return el.slider().find('li');
        },
        imgNumber : function() {
            return el.li().length;
        },
        activePager : function() {
            return el.dotLi().eq(getActiveNo());
        },
        activeSlider : function() {
            return el.li().eq(getActiveNo());
        },
        nav : {
            left : function () {
                return el.slider().find('nav img:eq(0)');
            },
            right : function () {
                return el.slider().find('nav img:eq(1)');
            }
        }
    };

    generatePager(el.imgNumber());

    el.slider()
        .mouseover(pauseAnimation)
        .mouseleave(resumeAnimation);


    el.nav.left().click(function(){
        console.log('left clicked');
        attr.direction = 'left-to-right';
        animate(true);
    });
    el.nav.right().click(function(){
        console.log('right clicked');
        attr.direction = 'right-to-left';
        animate(true);
    });



    putButtonMiddle();
    setInterval(animate, attr.intervalPageChange);

    //console.log( el.li().length );

    function animate( force ) {

        if ( ! force ) if ( attr.mouseIn ) return;

        var w = el.slider().width();
        var left;
        if ( attr.direction == 'right-to-left' ) {
            increaseActiveNo();
            left = w;
        }
        else {
            decreaseActiveNo();
            left = -w;
        }

        var $act = el.activeSlider();// $li.eq(getActiveNo());//getActiveSlider();
        $act.css({
            'display' : 'block'
            , 'z-index': getNextIndex()
            , 'left' : left
            , 'width' : w //+ 1
            , 'opacity' : .1
        } );
        $act.animate({left:0, opacity : 1}, attr.speedPageChange, function(){
            //el.li().css('display', 'none');
            el.activeSlider().css('display', 'block');
            el.dotLi().css('opacity' , '.6');
            el.activePager().css('opacity' , '1');
        });
        function resizeHeight() {
            el.li().height(el.activeSlider().find('img').height());
        }

        resizeHeight();


        putButtonMiddle();
    }

    function increaseActiveNo() {
        ++ attr.active;
    }
    function decreaseActiveNo() {
        -- attr.active;
    }

    function getActiveNo() {
        if ( attr.active >= el.li().length ) attr.active = 0;
        else if ( attr.active < 0 ) attr.active = el.li().length - 1;
        return attr.active;
    }


    function getNextIndex() {
        return ++ attr.zIndex;
    }


    function putButtonMiddle() {
        var h_slider = el.activeSlider().height();
        var h_button = el.nav.left().height();
        var pos_top = ( h_slider / 2 - h_button / 2 );
        el.nav.left().css('top', pos_top);
        el.nav.right().css('top', pos_top);
    }
    // functions
    function pauseAnimation() {
        attr.mouseIn = true;
    }
    function resumeAnimation() {
        attr.mouseIn = false;
    }
    function generatePager(imageNumber){    
    var pageNumber;
    var pagerDiv = document.getElementById('pager');
    for (i = 0; i < imageNumber; i++){
        var li = document.createElement('span');
        //pageNumber = document.createTextNode(parseInt(i + 1));
        //li.appendChild(pageNumber);
        pagerDiv.appendChild(li);
        li.onclick = function(i){
            return function(){
                slideTo(i);
            }
        }(i);
    }   
    function slideTo(imageToGo){
    console.log(imageToGo);
    console.log(attr.active);
    //el.dotLi().css('opacity' , '.6');
    //el.activePager().css('opacity' , '1');
    el.activeSlider().finish();

    if ( attr.direction == 'right-to-left' ) {
    attr.active = imageToGo - 1;
    }
    else {
    attr.active = imageToGo + 1;
    }
    animate(true);
    }
}

});