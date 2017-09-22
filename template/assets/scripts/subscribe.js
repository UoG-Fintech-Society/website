$("#email-form").submit(function (e){
    e.preventDefault();
    var obj = {};
    obj['email'] = $("#email").val();
    console.log(obj)
    $.ajax({
        method: 'post',
        url: '/subscribe',
        data: obj,
        success: function(res){
            if(res == "SENT_CONFIRMATION"){
                $("#success").removeClass("hide");
                $("#form").addClass("hide");
                $("#subscribe-status").html("You will shortly receive a confirmation email. Please use the link to confirm your subscription.")
            } else if (res == "ALREADY_EXISTS") {
                $("#success").removeClass("hide");
                $("#form").addClass("hide");
                $("#subscribe-status").html("You are already a member of our subscribers list")
            } else {
                $("#form").addClass("hide");
                $("#subscribe-status").html("Something went wrong while subscribing you. Please try again.")
            }
            
        }
    });
});