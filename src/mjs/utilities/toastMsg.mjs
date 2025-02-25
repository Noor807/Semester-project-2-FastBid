export function toastMessage(message, type = "success") {
  const main = document.querySelector("main");

  if (!main) return;
  if (document.querySelector(".toast-message")) return;

  const duration = 5000;

  const toast = document.createElement("div");
  toast.className =
    "toast-message flex fixed top-28 md:top-52  p-3  right-4 w-full max-w-fit transform transition-all duration-500 ease-in-out ";
  const iconWrapper = document.createElement("div");

  const text = document.createElement("div");
  text.className = "w-full max-w-50 mr-12 md:max-w-58 font-body text-wrap";
  text.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add(
    "absolute",
    "top-1/2",
    "-translate-y-1/2",
    "right-2",
    "z-10"
  );
  closeButton.innerHTML = `
        <span class="inline">
            <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
        </span>`;

  closeButton.onclick = () => removeToast();
  closeButton.setAttribute("aria-label", "Close notification");

  if (type === "success") {
    toast.classList.add("bg-green-100", "border-1", "border-green-400");
    text.classList.add("text-green-700");
    closeButton.classList.add("text-green-700");
    iconWrapper.innerHTML = ` 
            <svg viewBox="0 0 24 24" class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-1">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>`;
  } else if (type === "error") {
    toast.classList.add("bg-red-100", "border-1", "border-red-400");
    text.classList.add("text-red-700");
    closeButton.classList.add("text-red-700");
    iconWrapper.innerHTML = ` 
            <svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-1">
                <path fill="currentColor"
                    d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                </path>
            </svg>`;
  } else if (type === "alert") {
    toast.classList.add("bg-yellow-100", "border-1", "border-yellow-400");
    text.classList.add("text-yellow-700");
    closeButton.classList.add("text-yellow-700");
    iconWrapper.innerHTML = ` 
            <svg viewBox="0 0 24 24" class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-1">
                <path fill="currentColor"
                    d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z">
                </path>
            </svg>`;
  }

  function removeToast() {
    setTimeout(() => toast.remove(), 500);
  }

  document.addEventListener("keydown", function handleKeydown(event) {
    if (event.key === "Escape") {
      removeToast();
      document.removeEventListener("keydown", handleKeydown);
    }
  });

  toast.appendChild(iconWrapper);
  toast.appendChild(text);
  toast.appendChild(closeButton);
  main.appendChild(toast);

  setTimeout(() => {
    closeButton.focus();
  }, 50);

  setTimeout(() => {
    removeToast();
  }, duration);
}
