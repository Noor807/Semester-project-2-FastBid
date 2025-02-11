/**
 * Passes data to the createPost function in api/post and handles the response
 */

import { deleteAuction } from "../../api/list/delete";

export async function onDeletePost(event) {
  event.preventDefault();

  const button = event.target;
  const id = button.dataset.id;
  const token = localStorage.getItem('token')
  if (!id) {
    console.error("listID not found.");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete this list?");
  if (!confirmation) return;

  try {
    const result = await deleteAuction(id , token);
    
    
    if (result.success)  {
      window.location.href = "/";
    alert('remove list successfully');
       
    }else{
      console.error("Failed to delete list:", result.error);
    alert("Error: Could not delete the list.");

    }
   
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Error: Could not delete the list.");

  }
}
