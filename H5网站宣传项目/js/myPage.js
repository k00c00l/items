$(function () {
    var k = $(window).height();//获取当前计算机屏幕的高度，用于第二屏的沙发动画
    $('.next').click(function () {//点击继续向下
        $.fn.fullpage.moveSectionDown();
    });
    $('#fullpage').fullpage({
        navigation: true,//页面导航
        scrollingSpeed:500,//滚动速度
        //回调函数,anchorlink是锚链接名称，index序号
        afterLoad: function (anchorLink, index) {//滚动完成后触发
            //一屏到二屏
            $('.next').fadeOut();
            if (index === 2) {//falag设置为false防止第三屏回滚第二屏时，再次执行动画
                //当滚动到第二屏时，出现search向左平移，且淡入沙发字样
                $('.search').show().animate({'right': 370}, 1500, 'easeOutBack', function () {
                    //淡入沙发字样
                    $('.search-words').animate({'opacity': 1}, 500, function () {
                        //隐藏当前图片，用另一张代替
                        $('.search').hide();
                        //搜索图片向右上角移动且运动途中大小改变
                        $('.search-hide').show().animate({'height': 30, 'right': 250, 'bottom': 452}, 800);
                        //搜素图片运动的同时，右下角隐藏沙发图片变大
                        $('.sofas').show().animate({'height': 218},800);
                        //同时头部白色文字显示
                        $('.headerwords2').animate({'opacity': 1}, 800, function () {
                            $('.next').fadeIn();
                        });
                    });
                });
            } 
        },
        onLeave:function (index, nextIndex, direction) {//一开始滚动就触发
            //二屏到三屏
            $('.next').fadeOut();
            if (index === 2 && nextIndex === 3) {
                /* 沙发进入结算页面动画 */
                $('.sofa2').show().animate({'bottom': -(k - 250), 'width': 207, 'left': 260}, 1500, function () {
                    $('.img-01-a').animate({'opacity': 1}, 100, function () {
                        $('.btn-01-a').animate({'opacity': 1}, 100, function () {
                            $('.next').fadeIn();
                        });   
                    });
                });
                $('.cover').show();//唤醒遮盖层
            }
            //三屏到四屏
            $('.next').fadeOut();
            if (index === 3 && nextIndex === 4) {
                $('.sofa2').hide();
                /* 沙发进入购物车动画 */
                $('.t1f').show().animate({'bottom': -((k - 250) + 50), 'left': 250}, 2000, function () {
                    $(this).hide();
                    $('.car-img').show();
                    /* 购物车动画 */
                    $('.shoppingcar').animate({'left': 2000}, 4000, 'easeInElastic', function () {
                        $('.note').animate({'opacity': 1},500);
                        $('.note-img , .words-04-a').animate({'opacity': 1}, 1000, function () {
                            $('.next').fadeIn();
                        });
                    });
                });
            }
            //四屏到五屏
            $('.next').fadeOut();
            if (index === 4 && nextIndex === 5) {
                /*手部伸出*/
                $('.hand-05').animate({'bottom': 0}, 2000, function () {
                    /*鼠标高亮切换*/
                    $('.mouse-05-a').animate({'opacity': 1});
                    /*沙发掉落显示*/
                    $('.t1f-05').show().animate({'bottom': 70}, 1000, function () {
                        /*银行卡上浮*/
                        $('.order-05').animate({'bottom':390}, function () {
                            $('.words-05').addClass('words-05-a');
                            $('.next').fadeIn();
                        });
                    });
                });
            }
            //五屏到六屏
            $('.next').fadeOut();
            if (index === 5 && nextIndex === 6) {
                //沙发掉入box中
                $('.t1f-05').animate({'bottom': -(k - 500), 'left': '40%', 'width': 65}, 1500, function () {
                    $(this).hide();
                });
                //box向有移动接住掉落的沙发
                $('.box-06').animate({'left': '38%'}, 1500, function () {
                    //box向下移动进入car内并隐藏
                    $(this).animate({'bottom': 40}, 500, function () {
                        $(this).hide();
                        //移动背景形成小车动画之后，显现送货人员以及顾客
                        $('.section6').animate({'backgroundPositionX': '100%'}, 4000, function () {
                            //送货员出现
                            $('.man-06').animate({'height': 305, 'bottom': 116,}, 1000, function () {
                                //送货员到达指定地点
                                $(this).animate({'right': 500}, 1000, function () {
                                    //家门打开
                                    $('.door-06').animate({'opacity': 1}, 200, function () {
                                        //顾客出现
                                        $('.women-06').show().animate({'height': 305, 'right': 350}, 500, function () {
                                            //请签收
                                            $('.pop-07').animate({'opacity': 1}, 200, function () {
                                                $('.next').fadeIn();
                                            });
                                        });
                                    })
                                });
                            });
                        });
                        //头部宣传语出现
                        $('.words-06-a').animate({'opacity': 1,'left': '30%'}, 2000, 'easeOutElastic');
                        //送货地址显现
                        $('.pop-06').animate({'opacity': 1}, 2000);
                    });
                });
            }
            //六屏到七屏
            $('.next').fadeOut();
            if (index === 6 && nextIndex === 7) {
                //滚动到第七屏一秒后出现五星以及好评
                setTimeout(function () {
                    //出现五星动画
                    $('.star').animate({'width': 120}, 1000, function () {
                        //出现好评字样
                        $('.good-07').animate({'opacity': 1}, 500, function () {
                            $('.next').fadeIn();
                        });
                    });
                },1000);
            }
            //第八屏
            /* $('.beginShopping').mouseenter(function () {
                $('.btn-08-a').show();//鼠标进入显示动图
            }).mouseleave(function () {
                $('.btn-08-a').hide();//鼠标离开显示静态图
            }); */
            $('.beginShopping').hover(function () {
                $('.btn-08-a').toggle();//采用toggle切换更为简洁
            })
            //跟随移动
            $(document).mousemove(function (e) {
                var x = e.pageX;
                var y =e.pageY + 10;//让鼠标比手略高一点，可解决切换bug
                //控制手的最大高度
                var minY = k - 449;
                if (y < minY) {
                    $('.hand-08').css({ 'left': x, 'top': minY});
                } else {
                    $('.hand-08').css({'left': x, 'top': y});
                }
            })
            //返回顶部
            $('.again').click(function () {
                $.fn.fullpage.moveTo(1);
                //重新装载动画(原理为清空所有的动画元素行内样式)
                $('img, .move').attr('style', '');
            });  
        }
    });
});