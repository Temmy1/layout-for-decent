var btn = document.querySelector('.search-btn'),
  searchField = document.querySelector('.search-field');
 

btn.addEventListener('click', function(e) {
  e.preventDefault();
  searchField.classList.toggle('active');
})

