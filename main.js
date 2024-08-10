$(document).ready(function() {
    var options = {
        prefetch: true,
        cacheLength: 2,
        onStart: {
            duration: 2000, // Adjust duration to match CSS transition
            render: function ($container) {
                console.log('Transition start');
                $container.addClass('is-exiting');
                $('.transition-logo').addClass('is-exiting').css('z-index', 100).animate({ opacity: 1 }, 500); // Animate opacity to 1
                $('html, body').animate({ scrollTop: 0 }, 200);
                $('#main, #mainn, #mainnn').css({
                    'overflow-y': 'hidden',
                    'overflow-x': 'hidden'
                }); // Hide overflow-x and overflow-y for both elements
            }
        },
        onReady: {
            duration: 0,
            render: function ($container, $newContent) {
                console.log('Transition ready');
                $container.removeClass('is-exiting');
                $container.addClass('is-entering');
                $('.transition-logo').removeClass('is-exiting').addClass('is-entering');
                $container.html($newContent);
                $newContent.addClass('is-loaded'); // Ensure new content is loaded
            }
        },
        onAfter: function($container, $newContent) {
            console.log('Transition after');
            $container.removeClass('is-entering');
            $('.transition-logo').removeClass('is-entering').animate({ opacity: 0 }, 500); // Animate opacity to 0
            setTimeout(function() {
                $('.transition-logo').css('z-index', -1); // Reset z-index after transition
            }, 500); // Delay to match the opacity transition duration
            $newContent.removeClass('is-loaded'); // Clean up the class after transition
            $('#main, #mainn, #mainnn').css({
                'overflow-y': 'visible',
                'overflow-x': 'visible'
            }); // Reset overflow-x and overflow-y for both elements
            
            // Refresh the barrier code
            initializeBarrierCode();
        }
    };
    
    $('#main').smoothState(options).data('smoothState');
    $('#mainn').smoothState(options).data('smoothState');
    $('#mainnn').smoothState(options).data('smoothState');

    // Function to initialize the barrier code
    function initializeBarrierCode() {
        var navbarToggler = document.querySelector('.navbar-toggler');
        var barrier = document.getElementById('barrier');
        var navbarCollapse = document.getElementById('thebar');
        var menushadow = document.getElementById('menushadow');
        barrier.style.display = 'none';

        // Listen for the navbar to show
        navbarCollapse.addEventListener('show.bs.collapse', function () {
            barrier.style.opacity = '1';
            barrier.style.display = 'block';
            menushadow.style.opacity = '0';
            menushadow.style.display = 'none';
        });

        // Listen for the navbar to hide
        navbarCollapse.addEventListener('hide.bs.collapse', function () {
            barrier.style.opacity = '0';
            barrier.style.display = 'none';
            menushadow.style.opacity = '1';
            menushadow.style.display = 'block';
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navbarCollapse.classList.remove('show');
                barrier.style.opacity = '0';
                barrier.style.display = 'none';
                menushadow.style.display = 'block';
                document.getElementById('menushadow').style.opacity = '1';
            }
        });
    }

    // Initialize the barrier code on page load
    initializeBarrierCode();
});