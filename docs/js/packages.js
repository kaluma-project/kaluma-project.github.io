var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

function closeAllPopover() {
  popoverList.map((popover) => {
    popover.hide();
  });
}

function copyToClipboard(val) {
  const t = document.createElement('textarea');
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
  setTimeout(() => {
    closeAllPopover();
  }, 1000);
}
