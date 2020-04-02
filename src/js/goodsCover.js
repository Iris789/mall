require('../css/goodsCover.less');

var state = {
    isChoose: false
},
goodsInfo={}
function bindEvent() {
    $('.buy_spect_wrap ul').on('click','.buy_spect_li', function () {
        state.isChoose = true;
        goodsInfo.price = $(this).attr('data-price');
        goodsInfo.quantity = $(this).attr('data-quantity');
        goodsInfo.num = 1;//起卖数 暂均为1 各类商品有不同
        $('.buy_spect_li').removeClass('active');
        $(this).addClass('active');
        $('.price_value').html('¥' + goodsInfo.price);
        $('.price_quantity').html('库存 ' + goodsInfo.quantity);
        $('.buy_number_value').html(goodsInfo.num);
    });

    $('.buy_number_decrease').on('click', function () { 
        if (state.isChoose && goodsInfo.num > 1) {
            $('.buy_number_value').html(--goodsInfo.num);
        }
    });

    $('.buy_number_add').on('click', function () { 
        if (state.isChoose) {
            var num = goodsInfo.num < goodsInfo.quantity ? ++goodsInfo.num : goodsInfo.quantity;
            $('.buy_number_value').html(num);
        }
    });

    $('.buy_ok').on('click', function () { 
        if (state.isChoose) {
            window.open('http://localhost:8080/index.html');
        } else {
            alert('请选择规格');
        }
    });
}
bindEvent();