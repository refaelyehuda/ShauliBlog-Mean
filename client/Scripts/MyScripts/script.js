//when mouse over the table the coler will be yellow 
$(document).ready(function () {
    $("table").mouseover(function () {
        $("table").css("background-color", "#339900");
    });
    $("table").mouseout(function () {
        $("table").css("background-color", "white");
    });


    //navigate tabs blog

    $('.tabs .tab-links a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');
        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).fadeIn(1000).show().siblings().hide();
        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });

    $('.search').on('click', function (e) {

    });

    $('[data-tooltip]').addClass('tooltip');
    $('.tooltip').each(function () {
        $(this).append('<span class="tooltip-content">' + $(this).attr('data-tooltip') + '</span>');
    });

    $('.tooltip').mouseover(function () {
        $(this).children('.tooltip-content').css('visibility', 'visible');
    }).mouseout(function () {
        $(this).children('.tooltip-content').css('visibility', 'hidden');
    })

    //check the type of file 
    $('#image').change(function () {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                $('#uploadButton').attr('disabled', false);
                break;
            default:
                alert('This is not an allowed file type.');
                this.value = '';
        }
    });


    //check the type of file 
    $('#video').change(function () {
        var ext = this.value.match(/\.(.+)$/)[1];
        switch (ext) {
            case 'mp4':
            case 'mp3':
            case 'wmv':
            case 'avi':
            case 'gifv':
            case 'mkv':
                $('#uploadButton').attr('disabled', false);
                break;
            default:
                alert('This is not an allowed file type.');
                this.value = '';
        }
    });

    //Fade Out the blog - cause loading
    $(window).load(function () {
        // Animate loader off screen
        $(".se-pre-con").fadeOut(1000);

    })

    $('#passwordInput, #confirmPasswordInput').on('keyup', function (e) {

        if ($('#passwordInput').val() == '' && $('#confirmPasswordInput').val() == '') {
            $('#passwordStrength').removeClass().html('');

            return false;
        }

        if ($('#passwordInput').val() != '' && $('#confirmPasswordInput').val() != '' && $('#passwordInput').val() != $('#confirmPasswordInput').val()) {
            $('#passwordStrength').removeClass().addClass('alert alert-error').html('Passwords do not match!');
            return false;
        }

        // Must have capital letter, numbers and lowercase letters
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");

        // Must have either capitals and lowercase letters or lowercase and numbers
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");

        // Must be at least 6 characters long
        var okRegex = new RegExp("(?=.{6,}).*", "g");

        if (okRegex.test($(this).val()) === false) {
            // If ok regex doesn't match the password
            $('#passwordStrength').removeClass().addClass('alert alert-error').html('Password must be 6 characters long.');

        } else if (strongRegex.test($(this).val())) {
            // If reg ex matches strong password
            $('#passwordStrength').removeClass().addClass('alert alert-success').html('Good Password!');
        } else if (mediumRegex.test($(this).val())) {
            // If medium password matches the reg ex
            $('#passwordStrength').removeClass().addClass('alert alert-info').html('Make your password stronger with more capital letters, more numbers and special characters!');
        } else {
            // If password is ok
            $('#passwordStrength').removeClass().addClass('alert alert-error').html('Weak Password, try using numbers and capital letters.');
        }

        return true;
    });
});

function searchCallback() {
    var currentAttrValue = "#resultTarget";
    // Show/Hide Tabs
    $('.tabs ' + currentAttrValue).show().siblings().hide();

    // Change/remove current tab to active
    $(this).parent('li').addClass('active').siblings().removeClass('active');

    //e.preventDefault();
}

