// Function to show a toast/notification message

// Parameters:

//   - message: The message to display in the toast

//   - duration: Duration in milliseconds (default: 3000ms)

function showToast(message, duration = 3000) {

    // Create toast container if it doesn't exist

    let toastContainer = document.getElementById('toast-container');

    if (!toastContainer) {

        toastContainer = document.createElement('div');

        toastContainer.id = 'toast-container';

        toastContainer.style.position = 'fixed';

        toastContainer.style.right = '1vh';

        toastContainer.style.bottom = '1vh';

        toastContainer.style.zIndex = '1000';

        document.body.appendChild(toastContainer);

    }



    // Create toast element

    const toast = document.createElement('div');

    toast.className = 'toast';

    toast.textContent = message;

    toast.style.padding = 'var(--spacing-md) var(--spacing-xl)';

    toast.style.backgroundColor = 'var(--color-tertiary)';

    toast.style.color = 'var(--color-text-primary)';

    toast.style.border = 'var(--border-width) solid var(--color-danger)';

    toast.style.boxShadow = '0 4px 8px rgba(238, 83, 150, 0.3)';

    toast.style.marginBottom = '10px';

    toast.style.opacity = '0';

    toast.style.transition = 'opacity 0.3s';



    // Add toast to container

    toastContainer.appendChild(toast);



    // Trigger reflow to enable transition

    void toast.offsetHeight;



    // Show toast

    toast.style.opacity = '1';



    // Remove toast after specified duration

    setTimeout(() => {

        toast.style.opacity = '0';

        setTimeout(() => {

            toastContainer.removeChild(toast);

            // Remove container if it's empty

            if (toastContainer.children.length === 0) {

                document.body.removeChild(toastContainer);

            }

        }, 300); // Match transition duration

    }, duration);

}



// Export the function

export default showToast;