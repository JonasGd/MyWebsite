(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity()) {
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            var toastList = toastElList.map(function (toastEl) {
                // Creates an array of toasts (it only initializes them)
                return new bootstrap.Toast(toastEl) // No need for options; use the default options
            });
            toastList.forEach(toast => toast.show()); // This show them
            setTimeout(function() {
              toastList.forEach(toast => toast.hide());
            }, 3000)
            setTimeout(function() {form.submit()}, 3200)
          }
          event.preventDefault()
          event.stopPropagation()

          form.classList.add('was-validated')
        }, false)
      })
  })()