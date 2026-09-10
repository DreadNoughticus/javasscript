document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully');
    
    // Function to show the next page
    window.showNextPage = function(pageId) {
        document.getElementById('what-are-mesh-networks').classList.add('hidden');
        document.getElementById(pageId).classList.remove('hidden');
    };
    
    // Function to show the previous page
    window.showPreviousPage = function(pageId) {
        document.getElementById('routing-details').classList.add('hidden');
        document.getElementById(pageId).classList.remove('hidden');
    };
});