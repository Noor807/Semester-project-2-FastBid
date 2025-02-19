export async function populateProfile() {
 const adminUser = JSON.parse(localStorage.getItem('adminUser'));
 const credit  = localStorage.getItem('credit');
 document.getElementById('avatar').src = adminUser.avatar.url
 document.getElementById('profileName').textContent = adminUser.name
 document.getElementById('wallet').textContent = `${credit}$`

}