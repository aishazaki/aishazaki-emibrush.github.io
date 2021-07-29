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
})