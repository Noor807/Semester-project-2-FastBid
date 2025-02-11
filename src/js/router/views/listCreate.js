// routerView.js
import { handleCreateListFormSubmit } from '../../ui/list/create'; // Import UI function to handle form submission
import { authGuard } from '../../utilities/authGuard';
authGuard

  const form = document.getElementById('new-list-form');  // Assuming the form has the id "new-list-form"

    // Bind the form submit event to the handler function
    form.addEventListener('submit', handleCreateListFormSubmit);


