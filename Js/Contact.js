document.addEventListener('DOMContentLoaded', function() {
    emailjs.init('ytAUKEVO75bJ519h5');
    const sendButton = document.querySelector('.Send_Message');
    const nameInput = document.querySelector('input[placeholder="YOUR NAME"]');
    const emailInput = document.querySelector('input[placeholder="YOUR EMAIL"]');
    const messageInput = document.querySelector('textarea');

    sendButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validate inputs
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Change button state while sending
        sendButton.disabled = true;
        sendButton.innerHTML = '<span>Sending...</span>';

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Haiver Velasco'
        };

        // Send email using EmailJS
        emailjs.send('default_service', 'template_73rfgzu', templateParams)
            .then(function() {
                alert('Message sent successfully!');
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                alert('Failed to send message. Please try again.');
            })
            .finally(function() {
                // Restore button state
                sendButton.disabled = false;
                sendButton.innerHTML = '<span>SEND MESSAGE</span><img src="../img/Send.png" alt="Img_Send">';
            });
    });
});