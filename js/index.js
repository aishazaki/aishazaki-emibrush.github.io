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
        //تعيين السعر الاجمالي ضمن خلية السعر الاجمالي بالسطر
        parent.find('.total-price-for-product').text( totalPriceForProduct + 'ريال')
    
    });

    //عند حذف المنتج من نافذة الطلب
    $('[data-remove-order]').on('click', function() {
        $(this).parents('.the-order').find('.your-order').after("<p class='noOrder'>لم تطلب شيئا</p>"); 
        $(this).parents('.custom-table').hide();
        $('[data-product-quantity]').val('0');
    });
    //عند الضغط على زر الشراء
    var ordersTable = $(".custom-table");
    $('[data-toggle="modal"]').on('click', function () {
        ordersTable.show();
        $('.noOrder').remove();
        $('[data-product-quantity]').val('1');
    });

    //للتحقق من مدخلات النموذج
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    jQuery.validator.addMethod("orders", function (value, element) {
       var numberOfOrders= $('[data-product-quantity]').val();
       return this.optional(element) || numberOfOrders !=="0";

    },'لطفا اختيار العدد المطلوب من فرشاة ايمي')
    $("#confirm-order-form").validate({
        rules:{
            name:{
                required: true,
                minlength:3
            },
            phone:{
                required: true,
                number:true,
                minlength: 10
            },
            address:{
                required: true,
            },
            quantity:{
                required: true,
                orders: true
            }

        },
        messages:{
            name:{
                required: " لطفا اكتب اسمك هنا",
                minlength:" يجب ان يتكون الاسم من 3 احرف على الاقل"
            },
            phone:{
                required: "لطفا ادخل رقم هاتفك",
                number:"يجب ادخال ارقام فقط",
                minlength:" يجب ان يتكون رقم الهاتف من 10 ارقام على الاقل"
            },
            address:{
                required: "لطفا ادخل عنوانك",
            }
        },
        validClass:'success'
    }); 
   

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