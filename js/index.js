$(document).ready(function(){

    //لحساب السعر الاجمالي للمنتج
    $('[data-product-quantity]').change(function(){
        //جلب كمية المنتج الجديدة بواسطة التابع val الذي يجلب قيمة العنصر المحدد
        var newQuantity = $(this).val();
        //trنبحث عن السطر الذي يحتوى معلومات هذا المنتج 
        var parent = $(this).parents('[data-product-info]');
        //من  معلومات  المنتج بالسطر نجلب سعر المنتج الواحد عبر التابع attr
        var pricePerUnit = parent.attr('data-product-price');
        //السعر الاجمالي للمنتج
        var totalPriceForProduct= newQuantity * pricePerUnit;
        console.log (totalPriceForProduct)
        //تعيين السعر الاجمالي ضمن خلية السعر الاجمالي بالسطر
        parent.find('.total-price-for-product').text( totalPriceForProduct + 'ريال')
    
    });

    //عند حذف المنتج من نافذة الطلب
    $('[data-remove-order]').on('click', function() {
        $(this).parents('.the-order').find('.your-order').after("<p>لم تطلب شيئا</p>"); 
        $(this).parents('.custom-table').remove();
       
    });

    $("#confirm-order-form").validate();

    //لاخفاء واظهار تفاصيل مزايا المنتج
    $(".seeMore-btn").on("click", function () {
        $(".second-row").slideToggle("slow");
        
        $(".seeMore-btn ").toggleClass('seeMore');
        if ($(".seeMore-btn").hasClass('seeMore')) {
            $(".seeMore-btn").text('تفاصيل اكثر');
        }
        else{
            $(".seeMore-btn").text('اخفاء')
        }
    });

    //قسم التعليقات
    var x = 0,
    container = $('#comments'),
    items = container.find('li'),
    containerHeight = 0,
    numberVisible = 3,
    intervalSec = 2000;

    if(!container.find('li:first').hasClass("first")){
        container.find('li:first').addClass("first");
    }

    items.each(function(){
        if(x < numberVisible){
         containerHeight = containerHeight + $(this).outerHeight();
         x++;
        }
    });

    container.css({ height: containerHeight, overflow: "hidden" });
    
    function vertCycle() {
        var firstItem = container.find('li.first').html();
            
        container.append('<li>'+firstItem+'</li>');
        firstItem = '';
        container.find('li.first').animate({ "margin-top": "-50px" }, 700, function(){  $(this).remove(); container.find('li:first').addClass("first"); });
    }

    if(intervalSec < 700){
    intervalSec = 700;
    }

    var init = setInterval( vertCycle,intervalSec);

    container.hover(function(){
            clearInterval(init);
        }, function(){
            init = setInterval( vertCycle ,intervalSec)
    })
});