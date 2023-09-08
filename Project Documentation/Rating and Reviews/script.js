let selectedRating = 0;

function rate(rating) {
  selectedRating = rating;
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.textContent = index < rating ? '★' : '☆';
  });
}

function submitReview() {
  const reviewText = document.getElementById('reviewText').value;
  if (selectedRating === 0 || reviewText === '') {
    alert('Please rate and provide a review before submitting.');
    return;
  }

  const reviewsList = document.getElementById('reviewsList');
  const reviewElement = document.createElement('div');
  reviewElement.className = 'review-item';
  reviewElement.innerHTML = `<p class="rating-stars">${'★'.repeat(selectedRating)}</p>
                              <p class="review-text">${reviewText}</p>`;
  reviewsList.appendChild(reviewElement);

  // Clear the input fields
  document.getElementById('reviewText').value = '';
  rate(0);

  // Display the thank you message
 showThankYouMessage();
}


 


function showThankYouMessage() {
  const thankYouMessage = document.getElementById('thankYouMessage');
  thankYouMessage.style.display = 'block';

  // Optionally, you can hide the message after a few seconds (e.g., 5 seconds)
  setTimeout(() => {
    thankYouMessage.style.display = 'none';
  }, 5000); // 5000 milliseconds (5 seconds)
}








  
  
  
  
  
  
  
  
  
  
  