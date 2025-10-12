// Sendinblue form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form[data-sendinblue="true"]');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('input[type="submit"]');
      const successMsg = form.parentElement.querySelector('.w-form-done');
      const errorMsg = form.parentElement.querySelector('.w-form-fail');
      const originalBtnValue = submitBtn.value;
      
      // Hide previous messages
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';
      
      // Show loading state
      submitBtn.value = submitBtn.getAttribute('data-wait') || 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(form);
      
      // Submit to Sendinblue
      fetch('https://7f9e7916.sibforms.com/serve/MUIFAAnOqrSPZAHj-INvYFsc6-y-ChcvfnlhyVHZPHiEFht1MSzoBIt6RHxg4CO4_XfOPq1w5xjBDh4Syf7bv3bk28A0ougvgIrWI9knusfVoq0SImajG8NcD64LUe-Cgn5agQikuBK7keXq3cuNrysVX8Rdi_b-tg8nhpVWBOFuCB8nrhJH9myiOxsxxRPEWE9-ad_IBkramCSROQ==', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Sendinblue doesn't support CORS, but form still works
      })
      .then(function() {
        // Show success message
        successMsg.style.display = 'block';
        form.reset();
        
        // Reset button
        submitBtn.value = originalBtnValue;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(function() {
          successMsg.style.display = 'none';
        }, 5000);
      })
      .catch(function(error) {
        // Show error message
        errorMsg.style.display = 'block';
        
        // Reset button
        submitBtn.value = originalBtnValue;
        submitBtn.disabled = false;
      });
    });
  });
});

