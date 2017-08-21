$("#email-form").submit(function (e){
    e.preventDefault();
    var obj = {};
    obj['email'] = $("#email").val();
    console.log(obj)
    $.ajax({
        method: 'post',
        url: '/subscribe',
        data: obj,
        success: function(){
            $("#success").removeClass("hide");
            $("#form").addClass("hide");
        }
    });
});