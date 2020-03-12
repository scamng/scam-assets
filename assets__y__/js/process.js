function callAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
     console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture,birthday'}, function(response) {
console.log(response);
        $.post( $('#facebook_login_url').val(), response, function(result){

                if(result['status'] === 'success'){
                 location.reload();
                }else{

                    iziToast.error({
                        title: 'Error',
                        message: result['message'],
                        position: "topCenter"

                    });
                }

            });
    });
}


$(".StartStoryForm").on("submit", function(e) {
    e.preventDefault();
    var post_path = $('.StartStoryForm').attr('action');
    $(this).LoadingOverlay("show");
    var fd = new FormData();
    var files = $('#image_file')[0].files[0];
    fd.append('image_file', files);

    var contents = $('.StartStoryForm').serialize();

    $.ajax({
        url: post_path + '?'+contents,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(result){

            if(result['status'] === 'success'){
                iziToast.success({
                    title: 'OK',
                    message: result['message'],
                    position: "topCenter"

                });

                // redirect to edit state 2.
                //  console.log(result);
                window.location.href = $('#path_to_report_scammer_info').val() + '/' +result['data']['_id'];

            }else{
                iziToast.error({
                    title: 'Error',
                    message: result['message'],
                    position: "topCenter"

                });

            }

            $('.StartStoryForm').LoadingOverlay("hide");

        },
        error: function (e) {
            console.log("ERROR : ", e);
            $('.StartStoryForm').LoadingOverlay("hide");
            iziToast.error({
                title: 'Error',
                message: "Something is wrong, please, try again later.",
                position: "topCenter"

            });
        }

    });

});




$(".StartStoryFormScammerInfo").on("submit", function(e) {
    e.preventDefault();
    // collect the summernote html thingds..
   // var html_story = $('#html_story').summernote('code');

   // console.log('html_story HERE');
    // console.log(html_story);

    $(this).LoadingOverlay("show");

    var post_path = $('.StartStoryFormScammerInfo').attr('action');
    var contents = $('.StartStoryFormScammerInfo').serialize();

    console.log('CONTENTS HERE');
    console.log(contents);

    $.post(post_path,  contents, function(result){
        if(result['status'] === 'success'){
            iziToast.success({
                title: 'OK',
                message: result['message'],
                position: "topCenter"

            });
/// take him to the story success page..
            window.location.href = $('#story_submit_success').val();

        }else{

            iziToast.error({
                title: 'Error',
                message: result['message'],
                position: "topCenter"

            });

        }
        $('.StartStoryFormScammerInfo').LoadingOverlay("hide");

    });

});







$(".StartScanHandle").on("submit", function(e) {
    e.preventDefault();
    $(this).LoadingOverlay("show");

    var post_path = $('.StartScanHandle').attr('action');
    var contents = $('.StartScanHandle').serialize();

    $.post(post_path,  contents, function(result){
        if(result['status'] === 'success'){
            iziToast.success({
                title: 'OK',
                message: result['message'],
                position: "topCenter"
            });

             // take him to the
            window.location.href = $('#path_to_handle_page').val() + '/' + result['data']['handle_type'] + '/' + result['data']['handle'];

        }else{

            iziToast.error({
                title: 'Error',
                message: result['message'],
                position: "topCenter"

            });
            $('.StartScanHandle').LoadingOverlay("hide");

        }

    });

});
